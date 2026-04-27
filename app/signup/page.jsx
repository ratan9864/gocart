'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

const SignupPage = () => {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: Date.now().toString(),
                name,
                email,
                password,
                image: "default.jpg",
                cart: {}
            }),
        });

        const data = await res.json();

        if (data.success) {
            alert("Signup Successful 🚀");
            router.push("/login");
        } else {
            alert(data.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-[400px]">
                <h1 className="text-2xl font-bold text-center mb-6">
                    Signup
                </h1>

                <form onSubmit={handleSignup} className="space-y-4">

                    <input
                        type="text"
                        placeholder="Enter your name"
                        className="w-full border p-3 rounded-lg outline-none"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full border p-3 rounded-lg outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full border p-3 rounded-lg outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg"
                    >
                        Signup
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;