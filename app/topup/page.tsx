"use client"

import { useState } from "react"
import { CreditCard, Wallet, QrCode, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

const recommendedAmounts = [100, 300, 500, 1000, 2000, 5000]
const paymentMethods = [
    { id: 'qrcode', name: 'สแกนจ่าย QR Code', icon: QrCode },
    { id: 'truemoney', name: 'TrueMoney Wallet', icon: Wallet },
    { id: 'credit', name: 'บัตรเครดิต/เดบิต', icon: CreditCard },
]

export default function TopupPage() {
    const [amount, setAmount] = useState<string>("")
    const [selectedMethod, setSelectedMethod] = useState('qrcode')
    const [isProcessing, setIsProcessing] = useState(false)

    const handleTopup = (e: React.FormEvent) => {
        e.preventDefault()
        if (!amount || Number(amount) <= 0) {
            toast.error("กรุณาระบุจำนวนเงินที่ถูกต้อง")
            return
        }

        setIsProcessing(true)
        // Simulate API call
        setTimeout(() => {
            toast.success(`เติมเงิน ${Number(amount).toLocaleString()} บาท สำเร็จ`, {
                description: "ยอดเงินเข้าสู่บัญชีของคุณแล้ว",
            })
            setIsProcessing(false)
            setAmount("")
        }, 1500)
    }

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">เติมเงินเข้าระบบ</h1>
                <p className="text-slate-500 dark:text-slate-400">เลือกช่องทางการชำระเงินและระบุจำนวนเงินที่ต้องการ</p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
                <form onSubmit={handleTopup} className="space-y-8">
                    {/* Amount Selection */}
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">ระบุจำนวนเงิน</label>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                            {recommendedAmounts.map((val) => (
                                <button
                                    key={val}
                                    type="button"
                                    onClick={() => setAmount(val.toString())}
                                    className={cn(
                                        "py-2 px-1 rounded-lg text-sm font-medium border transition-all",
                                        amount === val.toString()
                                            ? "bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-600 dark:text-blue-400 ring-1 ring-blue-500"
                                            : "border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 text-slate-700 dark:text-slate-300"
                                    )}
                                >
                                    {val}
                                </button>
                            ))}
                        </div>
                        <div className="relative">
                            <input
                                type="number"
                                min="1"
                                placeholder="ระบุจำนวนเงินอื่นๆ"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full pl-4 pr-12 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-lg"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">THB</span>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">ช่องทางการชำระเงิน</label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {paymentMethods.map((method) => (
                                <button
                                    key={method.id}
                                    type="button"
                                    onClick={() => setSelectedMethod(method.id)}
                                    className={cn(
                                        "flex flex-col items-center justify-center gap-3 p-4 rounded-xl border transition-all h-32",
                                        selectedMethod === method.id
                                            ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-600 dark:text-blue-400 ring-1 ring-blue-500"
                                            : "bg-transparent border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                                    )}
                                >
                                    <method.icon size={32} />
                                    <span className="text-sm font-medium">{method.name}</span>
                                    {selectedMethod === method.id && (
                                        <div className="absolute top-2 right-2 text-blue-500">
                                            <CheckCircle2 size={16} />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isProcessing || !amount}
                        className={cn(
                            "w-full py-4 rounded-xl font-bold text-lg text-white transition-all shadow-lg",
                            isProcessing || !amount
                                ? "bg-slate-300 dark:bg-slate-700 cursor-not-allowed"
                                : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5"
                        )}
                    >
                        {isProcessing ? "กำลังทำรายการ..." : "ยืนยันการเติมเงิน"}
                    </button>

                    <p className="text-center text-xs text-slate-500 dark:text-slate-500">
                        การเติมเงินมีความปลอดภัย 100% ผ่านระบบ SSL Secure Connection
                    </p>
                </form>
            </div>
        </div>
    )
}
