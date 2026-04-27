import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
    try {
        const { email } = await req.json();

        // Check user exists
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

        // Generate reset token
        const resetToken = Math.random().toString(36).substring(2, 15);

        // Save token in DB
        await prisma.user.update({
            where: {
                email: email
            },
            data: {
                resetToken: resetToken,
                resetTokenExpiry: new Date(Date.now() + 3600000) // 1 hour
            }
        });

        const resetLink = `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password?token=${resetToken}`;

        // Mail transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Send email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset Link",
            html: `
                <h2>Password Reset</h2>
                <p>Click below link to reset your password:</p>
                <a href="${resetLink}">${resetLink}</a>
            `
        });

        return NextResponse.json({
            success: true,
            message: "Reset link sent successfully 🚀"
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        });
    }
}