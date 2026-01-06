"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronRight, User, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useAuthStore } from "@/store/useAuthStore"

interface LoginModalProps {
    isOpen: boolean
    onClose: () => void
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const [step, setStep] = useState(1) // 1: Username, 2: Password
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isRegistering, setIsRegistering] = useState(false)

    const { login } = useAuthStore()

    const reset = () => {
        setUsername("")
        setPassword("")
        setStep(1)
        setIsLoading(false)
        setIsRegistering(false)
        onClose()
    }

    const handleNextStep = async (e?: React.FormEvent) => {
        e?.preventDefault()
        if (!username) return toast.error("กรุณาระบุชื่อผู้ใช้")
        setStep(2)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (isRegistering && password.length < 6) {
            return toast.error("รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร")
        }

        setIsLoading(true)

        try {
            const endpoint = isRegistering ? "/api/auth/register" : "/api/auth/login"
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || "เกิดข้อผิดพลาด")
            }

            login(data.user)
            toast.success(isRegistering ? "สมัครสมาชิกสำเร็จ" : "เข้าสู่ระบบสำเร็จ")
            reset()

        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={reset}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative z-[70] w-full max-w-[400px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden p-8 border border-slate-200 dark:border-white/10"
                    >
                        <button
                            onClick={reset}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="mb-6">
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                {isRegistering ? "สมัครสมาชิก" : "เข้าสู่ระบบ"}
                            </h2>
                            <div className="h-1 w-12 bg-blue-600 rounded-full mt-1 mb-2"></div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">ยินดีต้อนรับสู่ 64SHOP</p>
                        </div>

                        <form onSubmit={step === 1 ? handleNextStep : handleSubmit}>
                            {step === 1 ? (
                                <div className="relative">
                                    <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-2 ml-1">Username</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="ชื่อผู้ใช้ของคุณ"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className="w-full h-[54px] px-4 rounded-xl border border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-0 outline-none text-slate-900 dark:text-white placeholder:text-slate-400 bg-slate-50 dark:bg-slate-950 transition-all"
                                            autoFocus
                                        />
                                        <button
                                            type="submit"
                                            disabled={!username}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-all disabled:opacity-50 shadow-lg shadow-blue-500/20"
                                        >
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                                        <div className="space-y-0.5">
                                            <label className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-bold">บัญชี</label>
                                            <span className="text-slate-900 dark:text-white font-bold">{username}</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-bold text-xs"
                                        >
                                            เปลี่ยน
                                        </button>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase ml-1">Password</label>
                                        <input
                                            type="password"
                                            placeholder="รหัสผ่านของคุณ"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full h-[54px] px-4 rounded-xl border border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-0 outline-none text-slate-900 dark:text-white placeholder:text-slate-400 bg-slate-50 dark:bg-slate-950 transition-all font-mono"
                                            autoFocus
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading || !password}
                                        className="w-full h-[54px] bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-xl transition-all shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2"
                                    >
                                        {isLoading && <Loader2 className="animate-spin" size={20} />}
                                        {isRegistering ? "สร้างบัญชีใหม่" : "เข้าสู่ระบบเดี๋ยวนี้"}
                                    </button>
                                </div>
                            )}
                        </form>

                        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center space-y-4">
                            <button
                                onClick={() => {
                                    setIsRegistering(!isRegistering)
                                    setStep(1)
                                    setPassword("")
                                }}
                                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-sm flex items-center justify-center gap-2 mx-auto transition-colors"
                            >
                                {isRegistering ? "มีบัญชีอยู่แล้ว?" : "ยังไม่มีบัญชี?"}
                                <span className="font-bold text-blue-600 dark:text-blue-400">{isRegistering ? "เข้าสู่ระบบ" : "สมัครสมาชิกฟรี"}</span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
