import AuthInput from "@/components/auth/AuthInput";
import { Button } from "@/components/ui/button";
import { H1, H3 } from "@/components/ui/typography/Heading";
import { toast } from "@/components/ui/use-toast";
import useParseError from "@/hooks/parse-error/useParseError";
import useApiRequest from "@/hooks/request/useApiRequest";
import authStore from "@/stores/authStore";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const ProfilePage = () => {
  const parseError = useParseError();
  const [isLoadingPassword, setIsLoadingPassword] = useState<boolean>(false);
  const [isLoadingFullName, setIsLoadingFullName] = useState<boolean>(false);
  const authInfo = authStore((state) => state.authInfo);
  const setAuthInfo = authStore((state) => state.setAuthInfo);
  const request = useApiRequest();

  const { data, isLoading, error, refetch } = useQuery("profile", async () => {
    // Call API to get user profile

    const result = await request({
      path: "/auth/self",
      method: "GET",
      auth: true,
    });
    if (result) {
      if (!result.success) {
        throw new Error(result.error?.message || result.error);
      } else {
        return result.data.user;
      }
    }
  });

  const [fullName, setFullName] = useState<string>("");

  useEffect(() => {
    if (data) {
      setFullName(data.full_name);
    }
  }, [data]);
  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoadingPassword(true);
    try {
      const form = e.target as HTMLFormElement;
      const password_input = form.password;
      const new_password_input = form.new_password;

      const password = password_input.value;
      const new_password = new_password_input.value;

      // Call API to update password
      const result = await request({
        path: "/user/update/password",
        method: "PUT",
        auth: true,
        body: {
          password,
          new_password,
        },
      });

      if (result) {
        if (!result.success) {
          parseError(result.error);
          throw new Error(result.error?.message || result.error);
        } else {
          const auth_token = result.data?.auth_token;
          const message =
            result.data?.message || "Password updated successfully";
          toast({
            title: "Success",
            description: message,
          });

          setAuthInfo({
            ...authInfo!,
            auth_token,
          });
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingPassword(false);
    }
  };
  const handleFullNameSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoadingFullName(true);
    try {
      // Call API to update full name
      const result = await request({
        path: "/user/update/full_name",
        method: "PUT",
        auth: true,
        body: {
          full_name: fullName,
        },
      });

      if (result) {
        if (!result.success) {
          parseError(result.error);
        } else {
          const message =
            result.data?.message || "Full name updated successfully";
          toast({
            title: "Success",
            description: message,
          });

          setAuthInfo({
            ...authInfo!,
            full_name: fullName,
          });
        }
      }

      // Call refetch
      refetch();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingFullName(false);
    }
  };

  return isLoading ? (
    <Loader className="mr-2 h-4 w-4 animate-spin" />
  ) : error ? (
    <>{error}</>
  ) : (
    <div className="container py-12">
      <div className="text-center mb-12">
        <H1>
          Hello, <span className="capitalize">{authInfo?.full_name}</span>
        </H1>
      </div>
      <div className="grid gap-6 md:gap-2 grid-cols-1 md:grid-cols-2 content-start">
        <div className="flex flex-col gap-4 bg-card">
          <form
            onSubmit={handlePasswordSubmit}
            className="grid gap-2 max-w-screen-sm mx-auto"
          >
            <H3 className="mb-2 text-primary">Change Password</H3>
            <AuthInput
              isLoading={isLoadingPassword}
              labelText="Old Password"
              type="password"
              name="password"
              placeholder="********"
            />
            <AuthInput
              isLoading={isLoadingPassword}
              labelText="New Password"
              type="password"
              name="new_password"
              placeholder="********"
            />
            <Button type="submit">Update</Button>
          </form>
        </div>
        <div className="flex flex-col gap-4 bg-card">
          <form
            onSubmit={handleFullNameSubmit}
            className="grid gap-2 max-w-screen-sm mx-auto"
          >
            <H3 className="mb-2 text-primary">Change Username</H3>
            <AuthInput
              isLoading={isLoadingFullName}
              labelText="Full Name"
              type="text"
              name="full_name"
              placeholder="John Smith"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <Button type="submit">Update</Button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
