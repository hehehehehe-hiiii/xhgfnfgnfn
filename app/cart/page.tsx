"use client"

import { useCartStore } from "@/store/useCartStore"
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCartStore()

    const handleCheckout = () => {
        toast.success("สั่งซื้อสำเร็จ!", {
            description: "ขอบคุณที่ใช้บริการ สินค้าจะถูกส่งไปยังอีเมลของคุณ",
        })
        clearCart()
    }

    if (items.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 text-center px-4">
                <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 mb-4 animation-pulse">
                    <ShoppingBag size={48} />
                </div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">ตะกร้าสินค้าว่างเปล่า</h1>
                <p className="text-slate-500 dark:text-slate-400">คุณยังไม่ได้เลือกสินค้าใดๆ เข้ามาในตะกร้า</p>
                <Link
                    href="/products"
                    className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors"
                >
                    เลือกซื้อสินค้า
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">ตะกร้าสินค้า</h1>

            <div className="lg:grid lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-8">
                    <div className="space-y-4">
                        <AnimatePresence>
                            {items.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm"
                                >
                                    {/* Product Info */}
                                    <div className="w-full sm:w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-lg flex-shrink-0 flex items-center justify-center text-slate-400">
                                        {item.image ? <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" /> : <ShoppingBag size={24} />}
                                    </div>

                                    <div className="flex-1 text-center sm:text-left">
                                        <h3 className="font-semibold text-slate-900 dark:text-white">{item.name}</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">฿{item.price.toLocaleString()}</p>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="w-8 text-center font-medium bg-slate-50 dark:bg-slate-800 py-1 rounded">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>

                                    {/* Remove */}
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="lg:col-span-4 mt-8 lg:mt-0">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm sticky top-24">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">สรุปคำสั่งซื้อ</h2>

                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-slate-500 dark:text-slate-400">
                                <span>ยอดรวม ({items.reduce((s, i) => s + i.quantity, 0)} ชิ้น)</span>
                                <span>฿{totalPrice().toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 mb-6">
                            <div className="flex justify-between font-bold text-lg text-slate-900 dark:text-white">
                                <span>ยอดสุทธิ</span>
                                <span className="text-blue-600 dark:text-blue-400">฿{totalPrice().toLocaleString()}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleCheckout}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/30"
                        >
                            ชำระเงิน <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
