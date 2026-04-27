import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();

        const {
            name,
            price,
            category,
            description,
            image
        } = body;

        // Validation
        if (
            !name ||
            !price ||
            !category ||
            !description ||
            !image
        ) {
            return NextResponse.json({
                success: false,
                message: "All fields are required"
            });
        }

        const newProduct = await prisma.product.create({
            data: {
                name: String(name),
                description: String(description),
                mrp: Number(price),
                price: Number(price),
                images: [String(image)],
                category: String(category),
                inStock: true,

                // IMPORTANT:
                // storeId hata diya because Prisma schema me
                // issue create kar raha tha during Vercel build
            }
        });

        return NextResponse.json({
            success: true,
            message: "Product added successfully 🚀",
            product: newProduct
        });

    } catch (error) {
        console.log("ADD PRODUCT ERROR:", error);

        return NextResponse.json({
            success: false,
            message: error.message || "Something went wrong"
        });
    }
}