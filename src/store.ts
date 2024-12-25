import { create } from "zustand"

export const useStore = create<StoreState>((set) => ({
  user: {
    name: "",
  },
  setUser: (user) => set({ user }),
}))
