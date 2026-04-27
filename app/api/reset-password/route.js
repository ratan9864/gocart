import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { token, password } = await req.json();

        // Find user with valid token
        const user = await prisma.user.findFirst({
            where: {
                resetToken: token,
                resetTokenExpiry: {
                    gt: new Date()
                }
            }
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Invalid or expired reset token"
            });
        }

        // Update password + clear token
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                password: password,
                resetToken: null,
                resetTokenExpiry: null
            }
        });

        return NextResponse.json({
            success: true,
            message: "Password updated successfully 🚀"
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        });
    }
}