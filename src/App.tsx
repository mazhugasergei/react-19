import React from "react"
import { ActionForm } from "./components/action-form.tsx"
import { EventForm } from "./components/event-form.tsx"
import { UserProfile } from "./components/user-profile.tsx"

export default function App() {
	return (
		<main className="mx-auto max-w-xl space-y-4 p-2">
			<UserProfile />
			<EventForm />
			<ActionForm />
		</main>
	)
}
