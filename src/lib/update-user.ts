// fake api

import { User } from "@/app/store"

export async function updateUser(data: User) {
	return await new Promise<string | null>((resolve) => {
		setTimeout(() => {
			if (!data.name.length) return resolve("Name cannot be empty")
			resolve(null)
		}, 1000)
	})
}
