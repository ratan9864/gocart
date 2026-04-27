'use client'

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts'

export default function OrdersAreaChart({ allOrders }) {

    // Safe Group orders by date
    const ordersPerDay = (allOrders || []).reduce((acc, order) => {
        // Skip if createdAt missing
        if (!order.createdAt) return acc

        const parsedDate = new Date(order.createdAt)

        // Skip invalid dates
        if (isNaN(parsedDate.getTime())) return acc

        const date = parsedDate
            .toISOString()
            .split('T')[0]

        acc[date] = (acc[date] || 0) + 1

        return acc
    }, {})

    // Convert to array for chart
    const chartData = Object.entries(ordersPerDay).map(
        ([date, count]) => ({
            date,
            orders: count
        })
    )

    return (
        <div className="w-full max-w-4xl h-[300px] text-xs">
            <h3 className="text-lg font-medium text-slate-800 mb-4 pt-2 text-right">
                <span className="text-slate-500">
                    Orders /
                </span>{" "}
                Day
            </h3>

            {chartData.length === 0 ? (
                <div className="h-full flex items-center justify-center text-slate-400 text-lg">
                    No valid order data available 📦
                </div>
            ) : (
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <AreaChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="date" />

                        <YAxis
                            allowDecimals={false}
                            label={{
                                value: 'Orders',
                                angle: -90,
                                position: 'insideLeft'
                            }}
                        />

                        <Tooltip />

                        <Area
                            type="monotone"
                            dataKey="orders"
                            stroke="#4f46e5"
                            fill="#8884d8"
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </div>
    )
}