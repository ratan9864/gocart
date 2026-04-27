import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();

        const {
            id,
            name,
            description,
            price
        } = body;

        const updatedProduct = await prisma.product.update({
            where: {
                id: id
            },
            data: {
                name,
                description,
                price: Number(price)
            }
        });

        return NextResponse.json({
            success: true,
            product: updatedProduct
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        });
    }
}