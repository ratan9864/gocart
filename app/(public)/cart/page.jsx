'use client'

import { useEffect, useState } from "react";

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [couponCode, setCouponCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [finalTotal, setFinalTotal] = useState(0);

    useEffect(() => {
        const cart =
            JSON.parse(localStorage.getItem("cart")) || [];

        setCartItems(cart);
    }, []);

    const handleRemove = (index) => {
        let updatedCart = [...cartItems];
        updatedCart.splice(index, 1);

        localStorage.setItem(
            "cart",
            JSON.stringify(updatedCart)
        );

        setCartItems(updatedCart);
    };

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price,
        0
    );

    useEffect(() => {
        setFinalTotal(totalPrice - discount);
    }, [totalPrice, discount]);

    const handleApplyCoupon = () => {
        const code = couponCode.trim().toUpperCase();

        if (code === "SAVE10") {
            const discountAmount = totalPrice * 0.10;
            setDiscount(discountAmount);
            alert("Coupon Applied: 10% OFF 🎉");
        }
        else if (code === "SAVE20") {
            const discountAmount = totalPrice * 0.20;
            setDiscount(discountAmount);
            alert("Coupon Applied: 20% OFF 🎉");
        }
        else if (code === "WELCOME50") {
            const discountAmount = totalPrice * 0.50;
            setDiscount(discountAmount);
            alert("Coupon Applied: 50% OFF 🎉");
        }
        else {
            setDiscount(0);
            alert("Invalid Coupon Code ❌");
        }
    };

    const handleCheckout = () => {
        localStorage.setItem(
            "finalTotal",
            JSON.stringify(finalTotal)
        );

        window.location.href = "/checkout";
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-8">
                My Cart 🛒
            </h1>

            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div className="space-y-6">

                    {cartItems.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-5 rounded-xl shadow-md flex gap-6 items-center"
                        >
                            <img
                                src={item.images[0]}
                                alt={item.name}
                                className="w-32 h-32 object-cover rounded-lg"
                            />

                            <div className="flex-1">
                                <h2 className="text-xl font-semibold">
                                    {item.name}
                                </h2>

                                <p className="text-gray-500">
                                    {item.description}
                                </p>

                                <p className="text-green-600 font-bold mt-2">
                                    ₹{item.price}
                                </p>
                            </div>

                            <button
                                onClick={() =>
                                    handleRemove(index)
                                }
                                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    {/* Coupon Section */}
                    <div className="bg-white p-5 rounded-xl shadow-md">
                        <h2 className="text-xl font-bold mb-4">
                            Apply Coupon 🎟️
                        </h2>

                        <div className="flex gap-3">
                            <input
                                type="text"
                                placeholder="Enter Coupon Code"
                                value={couponCode}
                                onChange={(e) =>
                                    setCouponCode(
                                        e.target.value
                                    )
                                }
                                className="flex-1 border p-3 rounded-lg"
                            />

                            <button
                                onClick={handleApplyCoupon}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 rounded-lg"
                            >
                                Apply
                            </button>
                        </div>

                        <p className="mt-4 text-gray-600">
                            Available Coupons:
                            SAVE10 / SAVE20 / WELCOME50
                        </p>
                    </div>

                    {/* Total Section */}
                    <div className="bg-white p-5 rounded-xl shadow-md">
                        <h2 className="text-lg font-medium">
                            Original Total: ₹{totalPrice}
                        </h2>

                        <h2 className="text-lg font-medium text-green-600 mt-2">
                            Discount: ₹{discount}
                        </h2>

                        <h2 className="text-2xl font-bold mt-3">
                            Final Total: ₹{finalTotal}
                        </h2>

                        <button
                            onClick={handleCheckout}
                            className="mt-5 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg"
                        >
                            Proceed to Checkout
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
};

export default CartPage;