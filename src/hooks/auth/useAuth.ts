import authStore from "@/stores/authStore";
import useApiRequest from "../request/useApiRequest";

interface LoginParams {
  email: string;
  password: string;
}

interface RegisterParams extends LoginParams {
  full_name: string;
}

const useAuth = () => {
  const { clearAuthInfo, setAuthInfo } = authStore();

  const request = useApiRequest();

  const login = async ({ email, password }: LoginParams) => {
    const result = await request({
      path: "/auth/login",
      method: "POST",
      body: {
        email,
        password,
      },
    });
    if (result) {
      if (result.success) {
        setAuthInfo(result.data.current_user);
      } else {
        console.error(result.error);
      }
    }
  };
  const register = async ({ email, password, full_name }: RegisterParams) => {
    const result = await request({
      path: "/auth/create",
      method: "POST",
      body: {
        email,
        password,
        full_name,
      },
    });

    if (result) {
      if (result.success) {
        setAuthInfo(result.data.current_user);
      } else {
        console.error(result.error);
      }
    }
  };
  const logout = async () => {
    const result = await request({
      path: "/auth/logout",
      method: "GET",
      auth: true,
    });

    if (result) {
      if (result.success) {
        setAuthInfo(result.data.current_user);
      } else {
        console.error(result.error);
      }
    }

    clearAuthInfo();
  };

  return { login, register, logout };
};
export default useAuth;
