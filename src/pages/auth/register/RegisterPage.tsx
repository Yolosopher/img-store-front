import AuthInput from "@/components/auth/AuthInput";
import AuthLayout from "@/components/auth/AuthLayout";
import useAuth from "@/hooks/auth/useAuth";
import authStore from "@/stores/authStore";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const authInfo = authStore((state) => state.authInfo);

  const { register } = useAuth();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.target as HTMLFormElement;
    const email_input = form.email;
    const password_input = form.password;
    const full_name_input = form.full_name;

    const email = email_input.value;
    const password = password_input.value;
    const full_name = full_name_input.value;

    await register({ email, password, full_name });
  };

  if (authInfo) {
    return <Navigate to="/" />;
  }

  return (
    <AuthLayout
      pageTitle="Create an Account"
      buttonText="Register"
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
      <AuthInput
        isLoading={isLoading}
        labelText="Full name"
        name="full_name"
        placeholder="John Smith"
      />
    </AuthLayout>
  );
};
export default RegisterPage;
