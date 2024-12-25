interface User {
  name: string
}

interface StoreState {
  user: User
  setUser: (user: User) => void
}
