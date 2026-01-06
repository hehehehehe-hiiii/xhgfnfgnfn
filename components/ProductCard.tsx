"use client"

import { Product } from "@/store/useCartStore"
import { useCartStore } from "@/store/useCartStore"
import { motion } from "framer-motion"
import { ShoppingCart } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const addToCart = useCartStore((state) => state.addToCart)

    const handleAddToCart = () => {
        addToCart(product)
        toast.success(`เพิ่ม ${product.name} ลงในตะกร้าแล้ว`, {
            description: "คุณสามารถตรวจสอบสินค้าได้ในตะกร้า",
            action: {
                label: "ดูตะกร้า",
                onClick: () => console.log("Navigate to cart"), // In real app, use router.push
            },
        })
    }

    return (
        <motion.div
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300"
        >
            {/* Image Area */}
            <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                {product.image ? (
                    <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400">
                        {/* Fallback as I don't have real images yet */}
                        <span>No Image</span>
                    </div>
                ) : (
                    <div className="w-full h-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
                )}

                {/* Overlay Action */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <button
                        onClick={handleAddToCart}
                        className="transform scale-90 group-hover:scale-100 transition-transform duration-300 bg-white text-slate-900 px-6 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-blue-50"
                    >
                        <ShoppingCart size={18} />
                        ใส่ตะกร้า
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
                <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100 line-clamp-1" title={product.name}>
                    {product.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                    {product.description || "รายละเอียดสินค้าคุณภาพเยี่ยม เหมาะสำหรับการใช้งาน..."}
                </p>
                <div className="pt-2 flex items-center justify-between">
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                        ฿{product.price.toLocaleString()}
                    </span>
                    <button
                        onClick={handleAddToCart}
                        className="md:hidden p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg"
                    >
                        <ShoppingCart size={20} />
                    </button>
                </div>
            </div>
        </motion.div>
    )
}
