'use client'

import { useEffect, useState } from "react";

const WishlistPage = () => {
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        const savedWishlist =
            JSON.parse(localStorage.getItem("wishlist")) || [];

        setWishlistItems(savedWishlist);
    }, []);

    const handleRemove = (id) => {
        const updatedWishlist = wishlistItems.filter(
            (item) => item.id !== id
        );

        localStorage.setItem(
            "wishlist",
            JSON.stringify(updatedWishlist)
        );

        setWishlistItems(updatedWishlist);

        alert("Removed from Wishlist ❌");
    };

    const handleAddToCart = (product) => {
        let cart =
            JSON.parse(localStorage.getItem("cart")) || [];

        cart.push(product);

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        alert("Added to Cart 🛒");
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-8">
                My Wishlist ❤️
            </h1>

            {wishlistItems.length === 0 ? (
                <p>Your wishlist is empty</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {wishlistItems.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white p-5 rounded-xl shadow-md"
                        >
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-52 object-cover rounded-lg mb-4"
                            />

                            <h2 className="text-xl font-semibold">
                                {product.name}
                            </h2>

                            <p className="text-gray-500 mt-2">
                                {product.description}
                            </p>

                            <p className="text-lg font-bold text-green-600 mt-4">
                                ${product.price}
                            </p>

                            <div className="flex gap-3 mt-4">
                                <button
                                    onClick={() =>
                                        handleAddToCart(product)
                                    }
                                    className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg"
                                >
                                    Add to Cart 🛒
                                </button>

                                <button
                                    onClick={() =>
                                        handleRemove(product.id)
                                    }
                                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                                >
                                    Remove ❌
                                </button>
                            </div>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
};

export default WishlistPage;