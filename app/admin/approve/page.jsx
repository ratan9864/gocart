'use client'

import { storesDummyData } from "@/assets/assets"
import StoreInfo from "@/components/admin/StoreInfo"
import Loading from "@/components/Loading"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function AdminApprove() {

    const [stores, setStores] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchStores = async () => {
        const savedStores =
            JSON.parse(localStorage.getItem("stores"))

        if (savedStores && savedStores.length > 0) {
            // sirf pending stores dikhane ke liye
            const pendingStores = savedStores.filter(
                (store) =>
                    store.status !== "approved" &&
                    store.status !== "rejected"
            )

            setStores(pendingStores)
        } else {
            // first time dummy data load
            const defaultStores = storesDummyData.map((store) => ({
                ...store,
                status: "pending"
            }))

            localStorage.setItem(
                "stores",
                JSON.stringify(defaultStores)
            )

            setStores(defaultStores)
        }

        setLoading(false)
    }

    const handleApprove = async ({ storeId, status }) => {
        let allStores =
            JSON.parse(localStorage.getItem("stores")) || []

        const updatedStores = allStores.map((store) =>
            store.id === storeId
                ? {
                    ...store,
                    status: status
                }
                : store
        )

        localStorage.setItem(
            "stores",
            JSON.stringify(updatedStores)
        )

        // current page se remove ho jayega
        setStores((prev) =>
            prev.filter((store) => store.id !== storeId)
        )

        toast.success(
            `Store ${status === "approved"
                ? "approved"
                : "rejected"
            } successfully`
        )
    }

    useEffect(() => {
        fetchStores()
    }, [])

    return !loading ? (
        <div className="text-slate-500 mb-28">
            <h1 className="text-2xl">
                Approve <span className="text-slate-800 font-medium">Stores</span>
            </h1>

            {stores.length ? (
                <div className="flex flex-col gap-4 mt-4">

                    {stores.map((store) => (
                        <div
                            key={store.id}
                            className="bg-white border rounded-lg shadow-sm p-6 flex max-md:flex-col gap-4 md:items-end max-w-4xl"
                        >
                            {/* Store Info */}
                            <StoreInfo store={store} />

                            {/* Actions */}
                            <div className="flex gap-3 pt-2 flex-wrap">

                                <button
                                    onClick={() =>
                                        handleApprove({
                                            storeId: store.id,
                                            status: "approved"
                                        })
                                    }
                                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                                >
                                    Approve
                                </button>

                                <button
                                    onClick={() =>
                                        handleApprove({
                                            storeId: store.id,
                                            status: "rejected"
                                        })
                                    }
                                    className="px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-600 text-sm"
                                >
                                    Reject
                                </button>

                            </div>
                        </div>
                    ))}

                </div>
            ) : (
                <div className="flex items-center justify-center h-80">
                    <h1 className="text-3xl text-slate-400 font-medium">
                        No Application Pending
                    </h1>
                </div>
            )}
        </div>
    ) : <Loading />
}