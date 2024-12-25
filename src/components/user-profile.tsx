import React from "react"
import { fetchUser } from "../api.ts"
import { cn } from "../lib/utils.ts"
import { useStore } from "../store.ts"
import { ActionForm } from "./action-form.tsx"
import { EventForm } from "./event-form.tsx"

function User() {
  const user = React.use(fetchUser)
  const setUser = useStore((state) => state.setUser)
  React.useEffect(() => {
    setUser(user)
  }, [user, setUser])

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold">Profile</h2>
        <p className="text-muted-foreground text-sm">Your profile information</p>
        <ul className="mt-2 overflow-hidden rounded border">
          {Object.entries(user).map(([key, value], index) => (
            <li key={key} className={cn("grid grid-cols-[1fr_3fr] gap-2 px-2", index && "border-t")}>
              <span className="border-r py-1 font-bold">{key}</span>
              <span className="py-1">{String(value)}</span>
            </li>
          ))}
        </ul>
      </div>

      <EventForm />
      <ActionForm />
    </>
  )
}

export function UserProfile() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <User />
    </React.Suspense>
  )
}
