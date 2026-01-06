"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "@/components/ProductCard"
import { Loader2 } from "lucide-react"

export default function ProductsPage() {
    const [products, setProducts] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products')
                if (res.ok) {
                    setProducts(await res.json())
                }
            } catch (error) {
                console.error("Failed to fetch products")
            } finally {
                setIsLoading(false)
            }
        }
        fetchProducts()
    }, [])

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 min-h-[80vh]">
            <div className="text-center space-y-4 mb-12">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
                    สินค้าทั้งหมด
                </h1>
                <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                    เลือกซื้อสินค้าดิจิทัล พรีเมียมไอดี และบริการเติมเกมราคาสุดคุ้ม พร้อมจัดส่งทันทีตลอด 24 ชั่วโมง
                </p>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center p-24 gap-4">
                    <Loader2 className="animate-spin text-blue-600" size={48} />
                    <p className="text-slate-500 font-medium">กำลังโหลดสินค้า...</p>
                </div>
            ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center p-24 bg-slate-100 dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800">
                    <p className="text-slate-500 font-bold">ยังไม่มีสินค้าในขณะนี้</p>
                </div>
            )}
        </div>
    )
}
