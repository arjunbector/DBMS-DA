import { prisma } from "@/lib/prisma";
import { createOrderSchema } from "@/lib/validation";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const parsedData = createOrderSchema.parse(data);
        const order = await prisma.order.create({
            data: {
                orderDate: parsedData.orderDate,
                totalAmount: parsedData.totalAmount,
                status: parsedData.status
            }
        })
        return NextResponse.json({
            message: "success", data: {
                order
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
        const orders = await prisma.order.findMany();
        return NextResponse.json({ data: orders }, { status: 200 })
    }
    catch (err: any) {
        console.log(err);
        return NextResponse.json({ message: err.message }, { status: 500 })
    }

}