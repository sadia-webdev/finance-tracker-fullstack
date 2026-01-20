import {create} from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      //   set users data and token after login
      setAuth: (token, userData) =>
        set({
          token,
          user: userData,
          isAuthenticated: true,
        }),

        

      clearAuth: () =>
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        }),

      // get token outside of react components
      getToken: () => get().token,
    }),

    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
