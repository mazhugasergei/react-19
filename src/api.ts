import { User } from "store.ts"

export const fetchUser = new Promise<User>((resolve) => {
  setTimeout(() => {
    resolve({ name: "John Doe" })
  }, 1000)
})
