'use client'

import { useEffect, useState } from "react";
import jsPDF from "jspdf";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const savedOrders =
            JSON.parse(localStorage.getItem("orders")) || [];

        setOrders(savedOrders);
    }, []);

    const handleDownloadInvoice = (order, index) => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("GoCart Invoice", 20, 20);

        doc.setFontSize(12);

        doc.text(`Order ID: #${index + 1}`, 20, 40);
        doc.text(`Customer Name: ${order.name}`, 20, 50);
        doc.text(`Phone: ${order.phone}`, 20, 60);
        doc.text(`Address: ${order.address}`, 20, 70);
        doc.text(`City: ${order.city}`, 20, 80);
        doc.text(`Pincode: ${order.pincode}`, 20, 90);
        doc.text(`Payment Method: ${order.payment}`, 20, 100);

        doc.text(
            `Status: ${order.status || "ORDER_PLACED"}`,
            20,
            110
        );

        doc.text(
            `Total Amount: ₹${order.totalAmount || 0}`,
            20,
            120
        );

        doc.text(
            `Order Date: ${
                order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : "N/A"
            }`,
            20,
            130
        );

        doc.text(
            "Thank you for shopping with GoCart ❤️",
            20,
            160
        );

        doc.save(`invoice-order-${index + 1}.pdf`);
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
                My Orders 📦
            </h1>

            {orders.length === 0 ? (
                <p>No orders found</p>
            ) : (
                <div className="space-y-6">

                    {orders.map((order, index) => (
                        <div
                            key={index}
                            className="bg-white p-5 rounded-xl shadow-md"
                        >
                            <h2 className="text-xl font-semibold">
                                Order #{index + 1}
                            </h2>

                            <p className="mt-2">
                                Name: {order.name}
                            </p>

                            <p>Phone: {order.phone}</p>

                            <p>Address: {order.address}</p>

                            <p>City: {order.city}</p>

                            <p>Pincode: {order.pincode}</p>

                            <p>
                                Payment Method: {order.payment}
                            </p>

                            <p className="font-semibold mt-2">
                                Total Amount: ₹
                                {order.totalAmount || 0}
                            </p>

                            {/* Live Status */}
                            <p
                                className={`font-bold mt-4 ${getStatusColor(
                                    order.status || "ORDER_PLACED"
                                )}`}
                            >
                                Current Status:{" "}
                                {order.status || "ORDER_PLACED"} 🚚
                            </p>

                            {order.updatedAt && (
                                <p className="text-sm text-gray-500 mt-2">
                                    Last Updated:{" "}
                                    {new Date(
                                        order.updatedAt
                                    ).toLocaleString()}
                                </p>
                            )}

                            <button
                                onClick={() =>
                                    handleDownloadInvoice(
                                        order,
                                        index
                                    )
                                }
                                className="mt-5 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg"
                            >
                                Download Invoice PDF 🧾
                            </button>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
};

export default OrdersPage;