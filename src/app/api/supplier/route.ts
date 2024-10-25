import { prisma } from "@/lib/prisma";
import { createSupplierSchema } from "@/lib/validation";
import { NextResponse } from "next/server";
import { ZodError } from "zod";


export async function POST(req: Request) {
    try {
        const data = await req.json();
        const parsedData = createSupplierSchema.parse(data);
        const supplier = await prisma.supplier.create({
            data: {
                name: parsedData.name,
                contactInformation: parsedData.contactInformation,
                address: parsedData.address
            }
        })
        return NextResponse.json({
            message: "success", data: {
                supplier
            }
        }, { status: 200 })
    }
    catch (err: any) {
        console.log(err);
        if (err instanceof ZodError) {
            return NextResponse.json({ message: err.errors }, { status: 400 })
        }
        return NextResponse.json({ message: err.message }, { status: 500 })
    }
}

export async function GET(req: Request) {
    try {
        const suppliers = await prisma.supplier.findMany();
        return NextResponse.json({ data: suppliers }, { status: 200 })
    }
    catch (err: any) {
        console.log(err);
        return NextResponse.json({ message: err.message }, { status: 500 })
    }

}