'use client'

import { useState } from "react";

const ApplyStorePage = () => {
    const [form, setForm] = useState({
        name: "",
        description: "",
        username: "",
        address: "",
        image: "",
        email: "",
        contact: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        if (
            !form.name ||
            !form.description ||
            !form.username ||
            !form.address ||
            !form.image ||
            !form.email ||
            !form.contact
        ) {
            alert("Please fill all fields");
            return;
        }

        let existingStores =
            JSON.parse(localStorage.getItem("stores")) || [];

        const newStore = {
            id: Date.now().toString(),
            ...form,
            status: "pending",
            isActive: false
        };

        existingStores.push(newStore);

        localStorage.setItem(
            "stores",
            JSON.stringify(existingStores)
        );

        alert("Store application submitted successfully 🎉");

        window.location.href = "/";
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
                <h1 className="text-3xl font-bold mb-6">
                    Apply for Store 🏪
                </h1>

                <div className="space-y-4">

                    <input
                        type="text"
                        name="name"
                        placeholder="Store Name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <textarea
                        name="description"
                        placeholder="Store Description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <input
                        type="text"
                        name="username"
                        placeholder="Store Username"
                        value={form.username}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <input
                        type="text"
                        name="address"
                        placeholder="Store Address"
                        value={form.address}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <input
                        type="text"
                        name="image"
                        placeholder="Store Image URL"
                        value={form.image}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Business Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <input
                        type="text"
                        name="contact"
                        placeholder="Contact Number"
                        value={form.contact}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <button
                        onClick={handleSubmit}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg"
                    >
                        Submit Store Application
                    </button>

                </div>
            </div>
        </div>
    );
};

export default ApplyStorePage;