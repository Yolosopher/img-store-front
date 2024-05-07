import { create } from "zustand";
export type ThumbSize = "default" | "medium" | "high";

type AuthInfoType = {
  username: string;
  email: string;
  auth_token: string;
};

interface AuthState {
  authInfo: AuthInfoType | null;
  setAuthInfo: (info: AuthInfoType) => void;
  clearAuthInfo: () => void;
}

const AUTH_INFO_KEY = "auth-info-state";

const defaultValue = (): AuthInfoType | null => {
  try {
    const lsResult = localStorage.getItem(AUTH_INFO_KEY);

    if (!lsResult) {
      throw new Error("No auth info in local storage");
    }
    return JSON.parse(lsResult) as AuthInfoType;
  } catch (error) {
    return null;
  }
};
const authStore = create<AuthState>((set) => ({
  authInfo: defaultValue(),
  setAuthInfo: (authInfo) =>
    set(() => {
      localStorage.setItem(AUTH_INFO_KEY, JSON.stringify(authInfo));
      return { authInfo };
    }),
  clearAuthInfo: () => {
    localStorage.removeItem(AUTH_INFO_KEY);
    set({ authInfo: null });
  },
}));

export default authStore;
