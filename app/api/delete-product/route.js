import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        const { id } = body;

        await prisma.product.delete({
            where: {
                id: id
            }
        });

        return NextResponse.json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        });
    }
}