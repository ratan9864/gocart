'use client'

import { useState, useEffect } from "react";

const CheckoutPage = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
        payment: "COD"
    });

    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const savedCart =
            JSON.parse(localStorage.getItem("cart")) || [];

        const savedFinalTotal =
            JSON.parse(localStorage.getItem("finalTotal"));

        setCartItems(savedCart);

        if (savedFinalTotal !== null) {
            setTotalPrice(savedFinalTotal);
        } else {
            const total = savedCart.reduce(
                (sum, item) => sum + (item.price || 0),
                0
            );

            setTotalPrice(total);
        }
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const sendConfirmationEmail = async () => {
        try {
            await fetch("/api/send-order-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    totalAmount: totalPrice,
                    payment: form.payment,
                    status: "ORDER_PLACED"
                })
            });
        } catch (error) {
            console.log(error);
        }
    };

    const saveOrder = async () => {
        let existingOrders =
            JSON.parse(localStorage.getItem("orders")) || [];

        const newOrder = {
            ...form,
            items: cartItems,
            totalAmount: totalPrice,
            status: "ORDER_PLACED",
            createdAt: new Date().toISOString()
        };

        existingOrders.push(newOrder);

        localStorage.setItem(
            "orders",
            JSON.stringify(existingOrders)
        );

        await sendConfirmationEmail();

        localStorage.removeItem("cart");
        localStorage.removeItem("finalTotal");

        window.location.href = "/orders";
    };

    const handlePlaceOrder = () => {
        if (
            !form.name ||
            !form.email ||
            !form.phone ||
            !form.address ||
            !form.city ||
            !form.pincode
        ) {
            alert("Please fill all fields");
            return;
        }

        if (form.payment === "COD") {
            alert("Order Placed Successfully 🎉");
            saveOrder();
            return;
        }

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: totalPrice * 100,
            currency: "INR",
            name: "GoCart",
            description: "Order Payment",
            handler: function (response) {
                alert(
                    "Payment Successful 🎉\nPayment ID: " +
                    response.razorpay_payment_id
                );

                saveOrder();
            },
            prefill: {
                name: form.name,
                email: form.email,
                contact: form.phone
            },
            theme: {
                color: "#4F46E5"
            }
        };

        const razor = new window.Razorpay(options);
        razor.open();
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-md">
                <h1 className="text-3xl font-bold mb-6">
                    Checkout
                </h1>

                <div className="space-y-4">

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <textarea
                        name="address"
                        placeholder="Full Address"
                        value={form.address}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={form.city}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <input
                        type="text"
                        name="pincode"
                        placeholder="Pincode"
                        value={form.pincode}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    />

                    <select
                        name="payment"
                        value={form.payment}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-lg"
                    >
                        <option value="COD">
                            Cash on Delivery
                        </option>

                        <option value="Online">
                            Online Payment (Razorpay)
                        </option>
                    </select>

                    <div className="bg-gray-100 p-4 rounded-lg">
                        <h2 className="text-lg font-semibold">
                            Final Payable Amount: ₹{totalPrice}
                        </h2>
                    </div>

                    <button
                        onClick={handlePlaceOrder}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg"
                    >
                        Place Order
                    </button>

                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;