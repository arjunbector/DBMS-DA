import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE( { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const product = await prisma.product.findUnique({
            where: {
                productId: id
            }
        })
        if (!product) return NextResponse.json({ message: "Product not found" }, { status: 404 });
        const deletedProduct = await prisma.product.delete({
            where: {
                productId: id
            }
        })

        return NextResponse.json({ message: "success", deletedProduct }, { status: 200 });
    }
    catch (err: any) {
        console.log(err);
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}