import { CircleAlert, CircleCheck } from "lucide-react"
import React from "react"
import { updateUser } from "../lib/update-user.ts"
import { cn } from "../lib/utils.ts"
import { User, useStore } from "../store.ts"
import { DisplayJSON } from "./display-json.tsx"

interface Error {
	message: string
	type: string
}

export function EventForm() {
	const user = useStore((state) => state.user)
	const setUser = useStore((state) => state.setUser)

	const [data, setData] = React.useState<User>({ ...user })
	const [isPending, startTransition] = React.useTransition()
	const [alert, setAlert] = React.useState<Error | null>(null)

	React.useEffect(() => {
		if (alert) {
			const timer = setTimeout(() => setAlert(null), 3000)
			return () => clearTimeout(timer)
		}
	}, [alert])

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		startTransition(async () => {
			const error = await updateUser(data)
			setUser(error ? { ...user } : { ...user, ...data })
			setAlert({
				message: error || "Success",
				type: error ? "error" : "success",
			})
		})
	}

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-2 rounded-lg border p-4">
			<div>
				<h2 className="text-2xl font-bold">Event Form</h2>
				<p className="text-muted-foreground text-sm">This form uses React.useTransition()</p>
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
