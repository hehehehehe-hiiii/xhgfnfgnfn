"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cookie } from "lucide-react"

export function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent")
        if (!consent) {
            // Delay showing slightly for better UX
            const timer = setTimeout(() => setIsVisible(true), 1000)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleAction = (accepted: boolean) => {
        localStorage.setItem("cookie-consent", accepted ? "accepted" : "declined")
        setIsVisible(false)
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 z-[100] md:max-w-md w-full"
                >
                    <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 ring-1 ring-black/5 dark:ring-white/5">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
                                <Cookie size={24} />
                            </div>
                            <div className="flex-1 space-y-3">
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">นโยบายคุกกี้</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                                        เราใช้คุกกี้เพื่อเพิ่มประสบการณ์การใช้งานของคุณ การกด "ยอมรับ" ถือว่าคุณตกลงตามนโยบายความเป็นส่วนตัวของเรา
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleAction(true)}
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                                    >
                                        ยอมรับ
                                    </button>
                                    <button
                                        onClick={() => handleAction(false)}
                                        className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-slate-200 dark:border-slate-700 active:scale-95"
                                    >
                                        ปฏิเสธ
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
