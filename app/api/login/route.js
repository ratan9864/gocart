import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            });
        }

        if (user.password !== password) {
            return NextResponse.json({
                success: false,
                message: "Invalid password"
            });
        }

        return NextResponse.json({
            success: true,
            message: "Login successful",
            user
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        });
    }
}