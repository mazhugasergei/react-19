import { CircleAlert, CircleCheck } from "lucide-react"
import React from "react"
import { updateUser } from "../lib/update-user.ts"
import { cn } from "../lib/utils.ts"
import { useStore } from "../store.ts"
import { DisplayJSON } from "./display-json.tsx"

interface Error {
  message: string
  type: string
}

export function ActionForm() {
  const user = useStore((state) => state.user)
  const setUser = useStore((state) => state.setUser)

  const [data, setData] = React.useState<User>({ ...user })
  const [alert, setAlert] = React.useState<Error | null>()
  const [error, action, isPending] = React.useActionState(() => updateUser(data), undefined)

  // update form data when user changes
  React.useEffect(() => {
    setData({ ...user })
  }, [user])

  React.useEffect(() => {
    if (error === undefined) return
    else if (error === null) {
      setAlert({
        message: "Success",
        type: "success",
      })
      setUser(error ? { ...user } : { ...user, ...data })
    } else if (error)
      setAlert({
        message: error,
        type: "error",
      })
  }, [error])

  React.useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [alert])

  return (
    <form action={action} className="flex flex-col gap-2 rounded-lg border p-4">
      <div>
        <h2 className="text-2xl font-bold">Action Form</h2>
        <p className="text-muted-foreground text-sm">This form uses React.useActionState()</p>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="font-bold">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          className="rounded border px-2 py-1"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-black p-1 font-semibold text-white disabled:opacity-50"
      >
        {isPending ? "Submitting..." : "Submit"}
      </button>

      {alert && (
        <div
          className={cn(
            "flex items-center gap-2 rounded-lg px-4 py-2 text-background",
            alert.type === "success" && "bg-green-400",
            alert.type === "error" && "bg-red-400"
          )}
        >
          {alert.type === "success" ? <CircleCheck size={16} /> : <CircleAlert size={16} />}
          <p>{alert.message}</p>
        </div>
      )}

      <hr />

      <DisplayJSON data={data} />
    </form>
  )
}
