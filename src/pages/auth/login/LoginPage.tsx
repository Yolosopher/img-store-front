import AuthInput from "@/components/auth/AuthInput";
import AuthLayout from "@/components/auth/AuthLayout";
import useAuth from "@/hooks/auth/useAuth";
import authStore from "@/stores/authStore";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const authInfo = authStore((state) => state.authInfo);

  const { login } = useAuth();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.target as HTMLFormElement;
    const email_input = form.email;
    const password_input = form.password;

    const email = email_input.value;
    const password = password_input.value;

    await login({ email, password });
  };

  if (authInfo) {
    return <Navigate to="/" />;
  }

  return (
    <AuthLayout
      pageTitle="Sign in to your account"
      buttonText="Login"
      submitHandler={submitHandler}
      setIsLoading={setIsLoading}
      isLoading={isLoading}
    >
      <AuthInput
        isLoading={isLoading}
        type="email"
        name="email"
        labelText="Email"
        placeholder="name@example.com"
      />
      <AuthInput
        isLoading={isLoading}
        type="password"
        labelText="Password"
        name="password"
        placeholder="********"
      />
    </AuthLayout>
  );
};
export default LoginPage;
