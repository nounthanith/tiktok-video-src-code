'use server'

import { revalidatePath } from "next/cache";
import connectDb from "@/src/lib/connectDb";
import Category from "@/src/models/category.model";

export async function getCategory() {
    await connectDb();
    return Category.find({}).sort({ createdAt: -1 }).lean();
}

export async function createCategory(_prevState: unknown, formData: FormData) {
    const name = formData.get('name')?.toString().trim()
    const description = formData.get('description')?.toString().trim()

    if (!name) return { success: false, message: "Name is required" }

    try {
        await connectDb();
        await Category.create({ name, description })
        revalidatePath('/')
        return { success: true }
    } catch (error: unknown) {
        if (error && typeof error === "object" && "code" in error && error.code === 11000) {
            return { success: false, message: "Category name already exists" }
        }

        return { success: false, message: "Something went wrong" }
    }
}