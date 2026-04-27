'use client'

import { useEffect, useState } from "react";

const AdminOrdersPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const savedOrders =
            JSON.parse(localStorage.getItem("orders")) || [];

        setOrders(savedOrders);
    }, []);

    const updateStatus = (index, newStatus) => {
        let updatedOrders = [...orders];

        updatedOrders[index].status = newStatus;
        updatedOrders[index].updatedAt =
            new Date().toISOString();

        localStorage.setItem(
            "orders",
            JSON.stringify(updatedOrders)
        );

        setOrders(updatedOrders);

        alert("Order status updated successfully 🚚");
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "ORDER_PLACED":
                return "text-blue-600";
            case "PROCESSING":
                return "text-yellow-600";
            case "SHIPPED":
                return "text-purple-600";
            case "OUT_FOR_DELIVERY":
                return "text-orange-600";
            case "DELIVERED":
                return "text-green-600";
            default:
                return "text-gray-600";
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-8">
                Admin Orders Panel 👑
            </h1>

            {orders.length === 0 ? (
                <p>No orders found</p>
            ) : (
                <div className="space-y-6">

                    {orders.map((order, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-xl shadow-md"
                        >
                            <h2 className="text-xl font-semibold mb-2">
                                Order #{index + 1}
                            </h2>

                            <p>Name: {order.name}</p>
                            <p>Phone: {order.phone}</p>
                            <p>Address: {order.address}</p>
                            <p>City: {order.city}</p>
                            <p>Pincode: {order.pincode}</p>
                            <p>Payment: {order.payment}</p>

                            <p className="mt-3 font-semibold">
                                Total Amount: ₹
                                {order.totalAmount || 0}
                            </p>

                            <div className="mt-4">
                                <label className="font-medium">
                                    Order Status:
                                </label>

                                <select
                                    value={
                                        order.status ||
                                        "ORDER_PLACED"
                                    }
                                    onChange={(e) =>
                                        updateStatus(
                                            index,
                                            e.target.value
                                        )
                                    }
                                    className="ml-3 border px-4 py-2 rounded-lg"
                                >
                                    <option value="ORDER_PLACED">
                                        ORDER_PLACED
                                    </option>

                                    <option value="PROCESSING">
                                        PROCESSING
                                    </option>

                                    <option value="SHIPPED">
                                        SHIPPED
                                    </option>

                                    <option value="OUT_FOR_DELIVERY">
                                        OUT_FOR_DELIVERY
                                    </option>

                                    <option value="DELIVERED">
                                        DELIVERED
                                    </option>
                                </select>
                            </div>

                            <p
                                className={`mt-4 font-bold ${getStatusColor(
                                    order.status || "ORDER_PLACED"
                                )}`}
                            >
                                Current Status:{" "}
                                {order.status || "ORDER_PLACED"}
                            </p>

                            {order.updatedAt && (
                                <p className="text-sm text-gray-500 mt-2">
                                    Last Updated:{" "}
                                    {new Date(
                                        order.updatedAt
                                    ).toLocaleString()}
                                </p>
                            )}
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
};

export default AdminOrdersPage;