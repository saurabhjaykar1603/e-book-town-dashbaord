import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface TokenStore {
  token: string;
  setToken: (token: string) => void;
}

const useTokenStore = create<TokenStore>()(
  devtools(
    persist(
      (set) => ({
        token: "",
        setToken: (token: string) => set(() => ({ token })),
      }),
      {
        name: "e-book",
      }
    )
  )
);

export default useTokenStore;
