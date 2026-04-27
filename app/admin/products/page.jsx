'use client'

import { useEffect, useState } from "react";

const AdminProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const res = await fetch("/api/get-products");
        const data = await res.json();

        if (data.success) {
            setProducts(data.products);
        }
    };

    // DB Based Delete Product
    const handleDelete = async (id) => {
        const confirmDelete = confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        const res = await fetch("/api/delete-product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id
            })
        });

        const data = await res.json();

        if (data.success) {
            alert("Product deleted successfully ❌");
            fetchProducts();
        } else {
            alert("Delete failed");
        }
    };

    // Open Edit Form
    const handleEdit = (product) => {
        setEditingProduct({ ...product });
    };

    // DB Based Update Product
    const handleUpdate = async () => {
        const res = await fetch("/api/update-product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: editingProduct.id,
                name: editingProduct.name,
                description: editingProduct.description,
                price: editingProduct.price
            })
        });

        const data = await res.json();

        if (data.success) {
            alert("Product updated successfully ✏️");
            setEditingProduct(null);
            fetchProducts();
        } else {
            alert("Update failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-8">
                Admin Products Panel 👑
            </h1>

            {/* Edit Product Section */}
            {editingProduct && (
                <div className="bg-white p-6 rounded-xl shadow-md mb-8 max-w-xl">
                    <h2 className="text-2xl font-bold mb-4">
                        Edit Product ✏️
                    </h2>

                    <input
                        type="text"
                        value={editingProduct.name}
                        onChange={(e) =>
                            setEditingProduct({
                                ...editingProduct,
                                name: e.target.value
                            })
                        }
                        placeholder="Product Name"
                        className="w-full border p-3 rounded-lg mb-3"
                    />

                    <textarea
                        value={editingProduct.description}
                        onChange={(e) =>
                            setEditingProduct({
                                ...editingProduct,
                                description: e.target.value
                            })
                        }
                        placeholder="Description"
                        className="w-full border p-3 rounded-lg mb-3"
                    />

                    <input
                        type="number"
                        value={editingProduct.price}
                        onChange={(e) =>
                            setEditingProduct({
                                ...editingProduct,
                                price: Number(e.target.value)
                            })
                        }
                        placeholder="Price"
                        className="w-full border p-3 rounded-lg mb-4"
                    />

                    <div className="flex gap-3">
                        <button
                            onClick={handleUpdate}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
                        >
                            Save Changes
                        </button>

                        <button
                            onClick={() => setEditingProduct(null)}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Products List */}
            {products.length === 0 ? (
                <p>No products found</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products.map((product) => (
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

                            <p className="text-lg font-bold text-green-600 mt-3">
                                ${product.price}
                            </p>

                            <div className="flex gap-3 mt-4">
                                <button
                                    onClick={() => handleEdit(product)}
                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
                                >
                                    Edit ✏️
                                </button>

                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                                >
                                    Delete ❌
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminProductsPage;