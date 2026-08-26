import connectDb from "@/src/lib/connectDb";
import Category from "@/src/models/category.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    await connectDb();
    const data = await Category.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(data, { status: 200 })
}

export async function POST(req: NextRequest) {
    try {
        await connectDb();
        const body = await req.json();

        const data = await Category.create(body);
        return NextResponse.json(data, { status: 201 })
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create category" },
            { status: 500 }
        );
    }

}