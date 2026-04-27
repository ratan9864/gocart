import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();

        const {
            id,
            name,
            email,
            password,
            image,
            cart
        } = body;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (existingUser) {
            return NextResponse.json({
                success: false,
                message: "User already exists"
            });
        }

        // Create new user
        const newUser = await prisma.user.create({
            data: {
                id,
                name,
                email,
                password,
                image,
                cart
            }
        });

        return NextResponse.json({
            success: true,
            message: "Signup successful",
            user: newUser
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        });
    }
}