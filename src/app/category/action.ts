'use server'

import { revalidatePath } from "next/cache";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!

export async function getCategory() {
    const response = await fetch(baseUrl + "/api/categories")
    const data = await response.json();
    // console.log(data)
    return data
}

export async function createCategory(prevState: any, formData: FormData) {
    const name = formData.get('name')?.toString().trim()
    const description = formData.get('description')?.toString().trim()

    if (!name) return { success: false, message: "Name is required" }
    
    try {
        const res = await fetch(baseUrl + "/api/categories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description })
        })

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            return { success: false, message: errorData.message || `Failed to create category: ${res.statusText}` }
        }

        revalidatePath('/')
        const data = await res.json();
        return { success: true, data }
    } catch (error: any) {
        return { success: false, message: error.message || "Something went wrong" }
    }
}