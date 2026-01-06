import { Facebook, Twitter, Instagram, Github } from "lucide-react"
import Link from "next/link"

export function Footer() {
    return (
        <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1 space-y-4">
                        <Link href="/" className="inline-block">
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
                                64SHOP
                            </span>
                        </Link>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            แพลตฟอร์มสินค้าดิจิทัลพรีเมียม สัมผัสประสบการณ์การช้อปปิ้งที่เหนือระดับ ด้วยดีไซน์ที่ทันสมัยและระบบที่ปลอดภัย
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">เมนูหลัก</h4>
                        <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                            <li><Link href="/" className="hover:text-blue-500 transition-colors">หน้าหลัก</Link></li>
                            <li><Link href="/products" className="hover:text-blue-500 transition-colors">สินค้าทั้งหมด</Link></li>
                            <li><Link href="/topup" className="hover:text-blue-500 transition-colors">เติมเงิน</Link></li>
                            <li><Link href="/cart" className="hover:text-blue-500 transition-colors">ตะกร้าสินค้า</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">บริการลูกค้า</h4>
                        <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                            <li><Link href="#" className="hover:text-blue-500 transition-colors">ติดต่อเรา</Link></li>
                            <li><Link href="#" className="hover:text-blue-500 transition-colors">คำถามที่พบบ่อย</Link></li>
                            <li><Link href="#" className="hover:text-blue-500 transition-colors">แจ้งปัญหาการใช้งาน</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">ติดตามเรา</h4>
                        <div className="flex gap-4">
                            <a href="#" className="group p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-200 dark:hover:border-blue-800 transition-all">
                                <Facebook size={20} className="text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                            </a>
                            <a href="#" className="group p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-200 dark:hover:border-blue-800 transition-all">
                                <Twitter size={20} className="text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                            </a>
                            <a href="#" className="group p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-200 dark:hover:border-blue-800 transition-all">
                                <Instagram size={20} className="text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>© {new Date().getFullYear()} 64SHOP. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
