import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const product = await prisma.inventory.findUnique({
            where: {
                inventoryId: id
            }
        })
        if (!product) return NextResponse.json({ message: "Product not found" }, { status: 404 });
        const deletedProduct = await prisma.inventory.delete({
            where: {
                inventoryId: id
            }
        })

        return NextResponse.json({ message: "success", deletedProduct }, { status: 200 });
    }
    catch (err: any) {
        console.log(err);
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const inventoryItem = await prisma.inventory.findUnique({
            where: {
                inventoryId: id
            },
            include: {
                product: true
            }
        })
        if (!inventoryItem) return NextResponse.json({ message: "Inventory Item not found" }, { status: 404 });
        return NextResponse.json({ data: inventoryItem }, { status: 200 });
    }
    catch (err: any) {
        console.log(err);
        return NextResponse.json({ message: err.message }, { status: 500 })
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const data = await req.json();
        const inventoryItem = await prisma.inventory.update({
            where: {
                inventoryId: id
            },
            data: {
                quantity: data.quantity
            }
        })
        return NextResponse.json({ message: "success", data: inventoryItem }, { status: 200 });
    }
    catch (err: any) {
        console.log(err);
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}