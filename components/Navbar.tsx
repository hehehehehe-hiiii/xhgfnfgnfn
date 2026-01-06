"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, Menu, X, Sun, Moon, Search, LogOut, User } from "lucide-react"
import { useTheme } from "next-themes"
import { useCartStore } from "@/store/useCartStore"
import { useAuthStore } from "@/store/useAuthStore"
import { useSettingsStore } from "@/store/useSettingsStore"
import { cn } from "@/lib/utils"
import { LoginModal } from "@/components/LoginModal"

const navItems = [
    { name: "หน้าหลัก", path: "/" },
    { name: "สินค้า", path: "/products" },
    { name: "เติมเงิน", path: "/topup" },
]

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoginOpen, setIsLoginOpen] = useState(false)
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()
    const totalItems = useCartStore((state) => state.totalItems())
    const { user, logout } = useAuthStore()
    const { settings, fetchSettings } = useSettingsStore()
    const [mounted, setMounted] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        setMounted(true)
        fetchSettings()
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <>
            <nav className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
                scrolled ? "bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md border-slate-200 dark:border-slate-800 py-3" : "bg-transparent py-5"
            )}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
                            <div className="px-2 h-8 rounded bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all">
                                64
                            </div>
                            <span className="font-bold text-xl text-slate-900 dark:text-white tracking-wide">
                                {settings.site_name}
                            </span>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={cn(
                                        "text-sm font-medium transition-colors hover:text-blue-400 relative",
                                        pathname === item.path ? "text-blue-400" : "text-slate-400"
                                    )}
                                >
                                    {item.name}
                                    {pathname === item.path && (
                                        <motion.span
                                            layoutId="nav-glow"
                                            className="absolute -bottom-1 left-0 right-0 h-px bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                        />
                                    )}
                                </Link>
                            ))}
                            {user?.role === 'admin' && (
                                <Link
                                    href="/admin"
                                    className={cn(
                                        "text-sm font-bold text-red-500 hover:text-red-400 transition-colors flex items-center gap-1",
                                        pathname === "/admin" && "underline underline-offset-4"
                                    )}
                                >
                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                    จัดการหลังบ้าน
                                </Link>
                            )}
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-4">
                            {/* Search (Visual Only) */}
                            <button className="p-2 text-slate-400 hover:text-white transition-colors">
                                <Search size={20} />
                            </button>

                            {/* Theme Toggle */}
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="p-2 text-slate-400 hover:text-white transition-colors"
                            >
                                {mounted && theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                            </button>

                            {/* Cart */}
                            <Link href="/cart" className="relative p-2 text-slate-400 hover:text-white transition-colors">
                                <ShoppingCart size={20} />
                                {mounted && totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-blue-500 text-white text-[10px] font-bold rounded-full">
                                        {totalItems}
                                    </span>
                                )}
                            </Link>

                            {/* User Auth */}
                            {user ? (
                                <div className="hidden md:flex items-center gap-3">
                                    <div className="flex flex-col items-end">
                                        <span className="text-sm font-bold text-slate-900 dark:text-white">{user.username}</span>
                                        <span className={cn(
                                            "text-[10px] px-1.5 rounded uppercase font-black",
                                            user.role === 'admin' ? "bg-red-500 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                                        )}>
                                            {user.role}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => logout()}
                                        className="p-2 text-red-500 hover:text-red-600 transition-colors bg-red-500/10 rounded-lg"
                                    >
                                        <LogOut size={18} />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setIsLoginOpen(true)}
                                    className="hidden md:flex bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
                                >
                                    เข้าสู่ระบบ
                                </button>
                            )}

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] backdrop-blur-md overflow-hidden"
                        >
                            <div className="px-4 py-4 space-y-2">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        href={item.path}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                            pathname === item.path
                                                ? "bg-blue-500/10 text-blue-400"
                                                : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <div className="pt-4 mt-4 border-t border-slate-800">
                                    {user ? (
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between px-4 py-3 bg-slate-100 dark:bg-slate-800/50 rounded-lg">
                                                <div className="flex flex-col">
                                                    <span className="text-slate-900 dark:text-white font-bold">{user.username}</span>
                                                    <span className="text-[10px] uppercase text-slate-500">{user.role}</span>
                                                </div>
                                                <button onClick={() => logout()} className="text-red-500 font-medium">Logout</button>
                                            </div>
                                            {user.role === 'admin' && (
                                                <Link
                                                    href="/admin"
                                                    onClick={() => setIsOpen(false)}
                                                    className="block w-full text-center bg-red-500 text-white py-3 rounded-lg font-bold"
                                                >
                                                    จัดการหลังบ้าน
                                                </Link>
                                            )}
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => { setIsOpen(false); setIsLoginOpen(true); }}
                                            className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg font-semibold"
                                        >
                                            เข้าสู่ระบบ
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
        </>
    )
}
