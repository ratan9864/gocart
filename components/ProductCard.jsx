'use client'

import { StarIcon, HeartIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProductCard = ({ product }) => {

    const currency =
        process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    const handleAddToCart = (e, product) => {
        e.preventDefault()

        let cart =
            JSON.parse(localStorage.getItem("cart")) || []

        cart.push(product)

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        )

        alert("Product added to cart 🛒")
    }

    const handleAddToWishlist = (e, product) => {
        e.preventDefault()

        let wishlist =
            JSON.parse(localStorage.getItem("wishlist")) || []

        const alreadyExists = wishlist.find(
            (item) => item.id === product.id
        )

        if (alreadyExists) {
            alert("Product already in wishlist ❤️")
            return
        }

        wishlist.push(product)

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        )

        alert("Added to Wishlist ❤️")
    }

    // Safe rating calculation
    const rating = product.rating?.length > 0
        ? Math.round(
            product.rating.reduce(
                (acc, curr) => acc + curr.rating,
                0
            ) / product.rating.length
        )
        : 0

    return (
        <div className='group max-xl:mx-auto'>

            <Link href={`/product/${product.id}`}>
                <div className='relative bg-[#F5F5F5] h-40 sm:w-60 sm:h-68 rounded-lg flex items-center justify-center'>

                    {/* Wishlist Button */}
                    <button
                        onClick={(e) =>
                            handleAddToWishlist(e, product)
                        }
                        className='absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:scale-110 transition z-10'
                    >
                        <HeartIcon
                            size={18}
                            className='text-red-500'
                        />
                    </button>

                    <Image
                        width={500}
                        height={500}
                        className='max-h-30 sm:max-h-40 w-auto group-hover:scale-115 transition duration-300'
                        src={product.images[0]}
                        alt=""
                    />
                </div>

                <div className='flex justify-between gap-3 text-sm text-slate-800 pt-2 max-w-60'>
                    <div>
                        <p>{product.name}</p>

                        <div className='flex'>
                            {Array(5)
                                .fill('')
                                .map((_, index) => (
                                    <StarIcon
                                        key={index}
                                        size={14}
                                        className='text-transparent mt-0.5'
                                        fill={
                                            rating >= index + 1
                                                ? "#00C950"
                                                : "#D1D5DB"
                                        }
                                    />
                                ))}
                        </div>
                    </div>

                    <p>
                        {currency}
                        {product.price}
                    </p>
                </div>
            </Link>

            <button
                onClick={(e) =>
                    handleAddToCart(e, product)
                }
                className="mt-3 w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg"
            >
                Add to Cart 🛒
            </button>
        </div>
    )
}

export default ProductCard