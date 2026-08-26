"use client"

import { useActionState } from "react";
import { createCategory } from "../app/category/action";

export default function CategoryForm() {
    const [state, formAction, isPending] = useActionState(createCategory, null)

    return (
        <form action={formAction} className="mb-2">
            <input type="text" name="name" placeholder="Name" required className="border p-1.5" />
            <input type="text" name="description" placeholder="Description" className="border p-1.5" />
            <button
                className="border p-1.5 px-4 active:scale-95 duration-300 transition-all disabled:opacity-50"
                type="submit"
                disabled={isPending}
            >
                {isPending ? "Submitting..." : "Submit"}
            </button>
            {state && !state.success && <p className="text-red-500">{state.message}</p>}
        </form>
    )
}