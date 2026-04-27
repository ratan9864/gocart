'use client'

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Heart } from "lucide-react";

const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("");

    const searchParams = useSearchParams();
    const selectedCategory = searchParams.get("category");

    // Add To Cart
    const handleAddToCart = (product) => {
        let cart =
            JSON.parse(localStorage.getItem("cart")) || [];

        cart.push(product);

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        alert("Product added to cart 🛒");
    };

    // Add To Wishlist
    const handleAddToWishlist = (product) => {
        let wishlist =
            JSON.parse(localStorage.getItem("wishlist")) || [];

        const alreadyExists = wishlist.find(
            (item) => item.id === product.id
        );

        if (alreadyExists) {
            alert("Product already in wishlist ❤️");
            return;
        }

        wishlist.push(product);

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

        alert("Added to Wishlist ❤️");
    };

    // Fetch Products
    const fetchProducts = async () => {
        const res = await fetch("/api/get-products");
        const data = await res.json();

        if (data.success) {
            setProducts(data.products);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Category Filter
    let filteredProducts = selectedCategory
        ? products.filter(
              (product) =>
                  product.category?.toLowerCase() ===
                  selectedCategory.toLowerCase()
          )
        : products;

    // Search Filter
    filteredProducts = filteredProducts.filter((product) =>
        product.name?.toLowerCase().includes(
            search.toLowerCase()
        )
    );

    // Sort Logic
    if (sortBy === "lowToHigh") {
        filteredProducts = [...filteredProducts].sort(
            (a, b) => a.price - b.price
        );
    }

    if (sortBy === "highToLow") {
        filteredProducts = [...filteredProducts].sort(
            (a, b) => b.price - a.price
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <h1 className="text-3xl font-bold mb-8">
                {selectedCategory
                    ? `${selectedCategory} Products`
                    : "Shop Products"}
            </h1>

            {/* Search + Sort */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">

                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="flex-1 border p-3 rounded-lg"
                />

                <select
                    value={sortBy}
                    onChange={(e) =>
                        setSortBy(e.target.value)
                    }
                    className="border p-3 rounded-lg"
                >
                    <option value="">
                        Sort By
                    </option>

                    <option value="lowToHigh">
                        Price: Low to High
                    </option>

                    <option value="highToLow">
                        Price: High to Low
                    </option>
                </select>

            </div>

            {/* Products */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white p-5 rounded-xl shadow-md relative"
                        >

                            {/* Wishlist Button */}
                            <button
                                onClick={() =>
                                    handleAddToWishlist(product)
                                }
                                className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:scale-110 transition"
                            >
                                <Heart
                                    size={20}
                                    className="text-red-500"
                                />
                            </button>

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

                            <button
                                onClick={() =>
                                    handleAddToCart(product)
                                }
                                className="mt-4 w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg"
                            >
                                Add to Cart 🛒
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-lg text-gray-500">
                        No products found 😔
                    </p>
                )}

            </div>
        </div>
    );
};

export default ShopPage;