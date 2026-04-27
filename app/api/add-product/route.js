import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const {
            name,
            price,
            category,
            description,
            image
        } = await req.json();

        const newProduct = await prisma.product.create({
            data: {
                name,
                description,
                mrp: price,
                price,
                images: [image],
                category,
                inStock: true,
                storeId: "store123"
            }
        });

        return NextResponse.json({
            success: true,
            message: "Product added successfully 🚀",
            product: newProduct
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        });
    }
}