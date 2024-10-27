import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const supplier = await prisma.supplier.findUnique({
            where: {
                supplierId: id
            }
        })
        if (!supplier) return NextResponse.json({ message: "Product not found" }, { status: 404 });
        const deletedSupplier = await prisma.supplier.delete({
            where: {
                supplierId: id
            }
        })

        return NextResponse.json({ message: "success", deletedSupplier }, { status: 200 });
    }
    catch (err: any) {
        console.log(err);
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}