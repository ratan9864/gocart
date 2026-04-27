'use client'
import React, { useEffect, useState } from 'react'
import Title from './Title'
import ProductCard from './ProductCard'

const LatestProducts = () => {

    const displayQuantity = 4
    const [products, setProducts] = useState([])

    const fetchProducts = async () => {
        try {
            const res = await fetch("/api/get-products")
            const data = await res.json()

            if (data.success) {
                setProducts(data.products)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div className='px-6 my-30 max-w-6xl mx-auto'>

            <Title
                title='Latest Products'
                description={`Showing ${products.length < displayQuantity ? products.length : displayQuantity} of ${products.length} products`}
                href='/shop'
            />

            <div className='mt-12 grid grid-cols-2 sm:flex flex-wrap gap-6 justify-between'>

                {products
                    .slice()
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, displayQuantity)
                    .map((product, index) => (
                        <ProductCard
                            key={index}
                            product={product}
                        />
                    ))}

            </div>
        </div>
    )
}

export default LatestProducts