import { prisma } from "@/lib/prisma";
import { createProductSchema } from "@/lib/validation";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const parsedData = createProductSchema.parse(data);
        const product = await prisma.product.create({
            data: {
                categoryId: parsedData.categoryId,
                supplierId: parsedData.supplierId,
                name: parsedData.name,
                price: parsedData.price,
                description: parsedData.description,
            }
        })
        return NextResponse.json({
            message: "success", data: {
                product
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
        const products = await prisma.product.findMany({
            include: {
                category: true,
                supplier: true
            }
        });
        return NextResponse.json({ data: products }, { status: 200 })
    }
    catch (err: any) {
        console.log(err);
        return NextResponse.json({ message: err.message }, { status: 500 })
    }

}