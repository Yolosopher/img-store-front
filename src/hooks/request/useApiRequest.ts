import CONFIG from "@/config";
import authStore from "@/stores/authStore";

type ApiRequestParams = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  body?: any;
  auth?: boolean;
  apiAuth?: boolean;
};

const useApiRequest = () => {
  const auth_token = authStore((state) => state.authInfo?.auth_token);
  const auth_api_token = authStore((state) => state.authInfo?.auth_api_token);
  const clearAuthInfo = authStore((state) => state.clearAuthInfo);

  const request = async ({
    body,
    method,
    path,
    auth,
    apiAuth,
  }: ApiRequestParams): Promise<
    { success: true; data: any } | { success: false; error: any } | void
  > => {
    try {
      if (auth && !auth_token) {
        throw new Error("Unauthorized");
      }
      const payload: any = {
        method: method || "GET",
        headers: {},
      } as RequestInit;

      if (body) {
        if (body instanceof FormData) {
          payload.body = body;
        } else {
          payload.headers["Content-Type"] = "application/json";
          payload.body = JSON.stringify(body);
        }
      }
      if (auth) {
        payload.headers["Authorization"] = `Bearer ${auth_token}`;
      } else if (apiAuth) {
        payload.headers["Authorization"] = `Bearer ${auth_api_token}`;
      }

      const res = await fetch(`${CONFIG.backend_url}${path}`, payload);

      if (res.status === 204) {
        return {
          success: true,
          data: null,
        };
      }

      const data = res.headers
        .get("Content-Type")
        ?.startsWith("application/json")
        ? await res.json()
        : await res.blob();

      if (res.status === 401) {
        throw new Error("Unauthorized");
      }

      if (res.status >= 400) {
        return {
          success: false,
          error: data,
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error: any) {
      if (error.message === "Unauthorized" && auth) {
        clearAuthInfo();
      } else {
        return { success: false, error: error.message };
      }
    }
  };

  return request;
};

export default useApiRequest;
