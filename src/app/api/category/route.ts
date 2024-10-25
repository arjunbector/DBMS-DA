import { prisma } from "@/lib/prisma";
import { createCategorySchema } from "@/lib/validation";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const parsedData = createCategorySchema.parse(data);
        const category = await prisma.category.create({
            data: {
                name: parsedData.name,
                description: parsedData.description
            }
        })
        return NextResponse.json({
            message: "success", data: {
                category
            }
        }, { status: 200 })
    }
    catch (err) {
        console.log(err);
        if (err instanceof ZodError) {
            return NextResponse.json({ message: err.errors }, { status: 400 })
        }
        if (err instanceof Error)
            return NextResponse.json({ message: err.message }, { status: 500 })
        return NextResponse.json({ message: "An error occurred" }, { status: 500 })
    }
}


export async function GET(req: Request) {
    try {
        const categories = await prisma.category.findMany();
        return NextResponse.json({ data: categories }, { status: 200 })
    }
    catch (err: any) {
        console.log(err);
        return NextResponse.json({ message: err.message }, { status: 500 })
    }

}