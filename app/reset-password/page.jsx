'use client'

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const ResetPasswordPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const searchParams = useSearchParams();
    const router = useRouter();

    const token = searchParams.get("token");

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const res = await fetch("/api/reset-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token,
                password,
            }),
        });

        const data = await res.json();

        alert(data.message);

        if (data.success) {
            router.push("/login");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-[400px]">
                <h1 className="text-2xl font-bold text-center mb-6">
                    Reset Password
                </h1>

                <form onSubmit={handleResetPassword} className="space-y-4">

                    <input
                        type="password"
                        placeholder="New Password"
                        className="w-full border p-3 rounded-lg outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full border p-3 rounded-lg outline-none"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg"
                    >
                        Update Password
                    </button>

                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;