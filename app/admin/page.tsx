"use client"

import { useState, useEffect } from "react"
import { useAuthStore } from "@/store/useAuthStore"
import { useSettingsStore } from "@/store/useSettingsStore"
import { useRouter } from "next/navigation"
import {
    LayoutDashboard,
    Package,
    Users,
    Settings,
    Plus,
    Trash2,
    Edit,
    Save,
    X,
    Loader2,
    Shield
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export default function AdminPage() {
    const { user } = useAuthStore()
    const { settings, updateSettings, fetchSettings } = useSettingsStore()
    const router = useRouter()

    const [activeTab, setActiveTab] = useState<'products' | 'users' | 'settings'>('settings')
    const [products, setProducts] = useState<any[]>([])
    const [allUsers, setAllUsers] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    // Form states
    const [newProduct, setNewProduct] = useState({ name: '', price: 0, description: '', category: 'FiveM' })
    const [editSettings, setEditSettings] = useState({ ...settings })

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            router.push('/')
            return
        }

        loadData()
    }, [user])

    const loadData = async () => {
        setIsLoading(true)
        try {
            const [prodRes, userRes] = await Promise.all([
                fetch('/api/products'),
                fetch('/api/admin/users')
            ])

            if (prodRes.ok) setProducts(await prodRes.json())
            if (userRes.ok) setAllUsers(await userRes.json())

            await fetchSettings()
            setEditSettings(settings)
        } catch (error) {
            toast.error("Failed to load data")
        } finally {
            setIsLoading(false)
        }
    }

    const handleSaveSettings = async () => {
        try {
            await updateSettings(editSettings)
            toast.success("Settings updated successfully")
        } catch (error) {
            toast.error("Failed to update settings")
        }
    }

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct)
            })
            if (res.ok) {
                toast.success("Product added")
                setNewProduct({ name: '', price: 0, description: '', category: 'FiveM' })
                loadData()
            }
        } catch (error) {
            toast.error("Failed to add product")
        }
    }

    const handleDeleteProduct = async (id: number) => {
        if (!confirm("Are you sure?")) return
        try {
            const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
            if (res.ok) {
                toast.success("Product deleted")
                loadData()
            }
        } catch (error) {
            toast.error("Failed to delete product")
        }
    }

    if (!user || user.role !== 'admin') return null

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-red-500 rounded-2xl text-white shadow-lg shadow-red-500/20">
                        <Shield size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Admin Dashboard</h1>
                        <p className="text-slate-500 dark:text-slate-400">Manage your shop and users</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Sidebar Tabs */}
                    <div className="space-y-2">
                        {[
                            { id: 'settings', label: 'Site Settings', icon: Settings },
                            { id: 'products', label: 'Products', icon: Package },
                            { id: 'users', label: 'Users', icon: Users },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm",
                                    activeTab === tab.id
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                        : "text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800"
                                )}
                            >
                                <tab.icon size={20} />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <AnimatePresence mode="wait">
                            {isLoading ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center justify-center p-24"
                                >
                                    <Loader2 className="animate-spin text-blue-600" size={48} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm"
                                >

                                    {/* Settings Tab */}
                                    {activeTab === 'settings' && (
                                        <div className="space-y-6">
                                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                                <Settings size={24} className="text-blue-500" />
                                                Global Settings
                                            </h2>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase text-slate-500">Site Name</label>
                                                    <input
                                                        type="text"
                                                        value={editSettings.site_name}
                                                        onChange={e => setEditSettings({ ...editSettings, site_name: e.target.value })}
                                                        className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 ring-blue-500 outline-none"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase text-slate-500">Hero Title</label>
                                                    <input
                                                        type="text"
                                                        value={editSettings.hero_title}
                                                        onChange={e => setEditSettings({ ...editSettings, hero_title: e.target.value })}
                                                        className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 ring-blue-500 outline-none"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase text-slate-500">Hero Subtitle</label>
                                                    <input
                                                        type="text"
                                                        value={editSettings.hero_subtitle}
                                                        onChange={e => setEditSettings({ ...editSettings, hero_subtitle: e.target.value })}
                                                        className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 ring-blue-500 outline-none"
                                                    />
                                                </div>
                                                <div className="space-y-2 md:col-span-2">
                                                    <label className="text-xs font-bold uppercase text-slate-500">Hero Description</label>
                                                    <textarea
                                                        rows={3}
                                                        value={editSettings.hero_description}
                                                        onChange={e => setEditSettings({ ...editSettings, hero_description: e.target.value })}
                                                        className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 ring-blue-500 outline-none resize-none"
                                                    />
                                                </div>
                                            </div>

                                            <button
                                                onClick={handleSaveSettings}
                                                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20"
                                            >
                                                <Save size={20} />
                                                Save Changes
                                            </button>
                                        </div>
                                    )}

                                    {/* Products Tab */}
                                    {activeTab === 'products' && (
                                        <div className="space-y-8">
                                            <div className="flex justify-between items-center">
                                                <h2 className="text-xl font-bold flex items-center gap-2">
                                                    <Package size={24} className="text-blue-500" />
                                                    Inventory List
                                                </h2>
                                            </div>

                                            {/* Add Product Form */}
                                            <form onSubmit={handleAddProduct} className="p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <input
                                                        placeholder="Product Name"
                                                        value={newProduct.name}
                                                        onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                                                        className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 ring-blue-500"
                                                        required
                                                    />
                                                    <input
                                                        type="number"
                                                        placeholder="Price (THB)"
                                                        value={newProduct.price || ''}
                                                        onChange={e => setNewProduct({ ...newProduct, price: parseInt(e.target.value) })}
                                                        className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 ring-blue-500"
                                                        required
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="p-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                                                    >
                                                        <Plus size={20} /> Add Product
                                                    </button>
                                                </div>
                                            </form>

                                            <div className="space-y-4">
                                                {products.map((p) => (
                                                    <div key={p.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-200 dark:border-slate-800">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center text-blue-600">
                                                                <Package size={24} />
                                                            </div>
                                                            <div>
                                                                <h4 className="font-bold text-slate-900 dark:text-white uppercase">{p.name}</h4>
                                                                <p className="text-sm text-blue-500 font-bold">{p.price} THB</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button onClick={() => handleDeleteProduct(p.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                                                                <Trash2 size={20} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Users Tab */}
                                    {activeTab === 'users' && (
                                        <div className="space-y-6">
                                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                                <Users size={24} className="text-blue-500" />
                                                All Registered Users
                                            </h2>

                                            <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
                                                <table className="w-full text-left bg-slate-50 dark:bg-slate-800/20">
                                                    <thead>
                                                        <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 font-bold text-sm text-slate-500 uppercase">
                                                            <th className="px-6 py-4">ID</th>
                                                            <th className="px-6 py-4">Username</th>
                                                            <th className="px-6 py-4">Role</th>
                                                            <th className="px-6 py-4">Created At</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="text-sm">
                                                        {allUsers.map((u) => (
                                                            <tr key={u.id} className="border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                                                                <td className="px-6 py-4">#{u.id}</td>
                                                                <td className="px-6 py-4 font-bold">{u.username}</td>
                                                                <td className="px-6 py-4">
                                                                    <span className={cn(
                                                                        "px-2 py-1 rounded text-[10px] uppercase font-black",
                                                                        u.role === 'admin' ? "bg-red-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-500"
                                                                    )}>
                                                                        {u.role}
                                                                    </span>
                                                                </td>
                                                                <td className="px-6 py-4 text-slate-400">
                                                                    {new Date(u.created_at).toLocaleDateString('th-TH')}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}

                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>

            </div>
        </div>
    )
}
