import { storageKeys } from "@/types/enums";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthStore {
  currentUser: IUser | null;
  setCurrentUser: (user: IUser | null) => void;
  setCredentials: (data: ILoginResponseData) => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      currentUser: null,
      setCurrentUser: (user) => set({ currentUser: user }),
      setCredentials: (data: ILoginResponseData) => {
        set({ currentUser: data.user });
        localStorage.setItem(storageKeys.AUTH_TOKEN, data.accessToken);
        localStorage.setItem(storageKeys.REFRESH_TOKEN, data.refreshToken);
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
export default useAuthStore;
