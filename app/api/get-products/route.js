import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });

        return NextResponse.json({
            success: true,
            products
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        });
    }
}