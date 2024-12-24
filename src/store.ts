import { create } from "zustand"

export interface User {
	name: string
}

export interface StoreState {
	user: User
	setUser: (user: User) => void
}

export const useStore = create<StoreState>((set) => ({
	user: {
		name: "John Doe",
	},
	setUser: (user) => set({ user }),
}))
