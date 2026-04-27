import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();

        const {
            name,
            email,
            totalAmount,
            payment,
            status
        } = body;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Order Confirmed - GoCart",
            html: `
                <h2>Order Confirmed 🎉</h2>
                <p>Hello <b>${name}</b>,</p>

                <p>Your order has been placed successfully.</p>

                <p><b>Total Amount:</b> ₹${totalAmount}</p>
                <p><b>Payment Method:</b> ${payment}</p>
                <p><b>Status:</b> ${status}</p>

                <br/>

                <p>Thank you for shopping with GoCart ❤️</p>
            `
        });

        return NextResponse.json({
            success: true,
            message: "Email sent successfully"
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        });
    }
}