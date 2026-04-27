'use client'

import { useState } from "react";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/forgot-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        const data = await res.json();

        alert(data.message);
        setEmail("");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-[400px]">
                <h1 className="text-2xl font-bold text-center mb-6">
                    Forgot Password
                </h1>

                <form onSubmit={handleForgotPassword} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full border p-3 rounded-lg outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg"
                    >
                        Send Reset Link
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;