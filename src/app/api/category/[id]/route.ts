import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const category = await prisma.category.findUnique({
            where: {
                categoryId: id
            }
        })
        if (!category) return NextResponse.json({ message: "Product not found" }, { status: 404 });
        const deletedCategory = await prisma.category.delete({
            where: {
                categoryId: id
            }
        })

        return NextResponse.json({ message: "success", deletedCategory }, { status: 200 });
    }
    catch (err: any) {
        console.log(err);
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}