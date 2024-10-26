import { prisma } from "@/lib/prisma";
import { createInventorySchema } from "@/lib/validation";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const parsedData = createInventorySchema.parse(data);
        const inventoryItem = await prisma.inventory.create({
            data: {
                productId: parsedData.productId,
                quantity: parsedData.quantity,
            }
        })
        return NextResponse.json({
            message: "success", data: {
                inventoryItem
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


export async function GET() {
    try {
        const inventoryItems = await prisma.inventory.findMany({
            include: {
                product: true
            }
        });
        return NextResponse.json({ data: inventoryItems }, { status: 200 })
    }
    catch (err: any) {
        console.log(err);
        return NextResponse.json({ message: err.message }, { status: 500 })
    }

}