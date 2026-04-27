'use client'

import { useState } from "react";

const AddProductPage = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    const handleAddProduct = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/add-product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                price: Number(price),
                category,
                description,
                image
            }),
        });

        const data = await res.json();

        alert(data.message);

        if (data.success) {
            setName("");
            setPrice("");
            setCategory("");
            setDescription("");
            setImage("");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-[500px]">
                <h1 className="text-2xl font-bold text-center mb-6">
                    Add Product
                </h1>

                <form onSubmit={handleAddProduct} className="space-y-4">

                    <input
                        type="text"
                        placeholder="Product Name"
                        className="w-full border p-3 rounded-lg outline-none"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <input
                        type="number"
                        placeholder="Price"
                        className="w-full border p-3 rounded-lg outline-none"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Category"
                        className="w-full border p-3 rounded-lg outline-none"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />

                    <textarea
                        placeholder="Description"
                        className="w-full border p-3 rounded-lg outline-none"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Image URL"
                        className="w-full border p-3 rounded-lg outline-none"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg"
                    >
                        Add Product
                    </button>

                </form>
            </div>
        </div>
    );
};

export default AddProductPage;