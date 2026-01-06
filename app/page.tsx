"use client"


import { ProductCard } from "@/components/ProductCard"
import Link from 'next/link'
import { Rocket, ShieldCheck, Zap, Server, Activity, Users, Globe } from 'lucide-react'
import { Parallax, ParallaxText } from "@/components/Parallax"
import { StarBackground } from "@/components/StarBackground"
import { motion } from "framer-motion"
import { useSettingsStore } from "@/store/useSettingsStore"
import { useEffect, useState } from "react"

export default function Home() {
  const [products, setProducts] = useState<any[]>([])
  const { settings, fetchSettings } = useSettingsStore()

  useEffect(() => {
    fetchSettings()
    fetch('/api/products').then(res => res.json()).then(data => setProducts(data.slice(0, 4)))
  }, [])

  return (
    <div className="space-y-24 pb-16 overflow-hidden">
      <StarBackground />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

          {/* Text Content - Left */}
          <div className="space-y-8 text-center lg:text-left">
            <ParallaxText speed={0.2}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-500 dark:text-blue-400 text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                รองรับ Windows 10/11
              </div>
            </ParallaxText>

            <div className="space-y-1">
              <ParallaxText speed={0.4}>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                  {settings.hero_title}
                </h1>
              </ParallaxText>
              <ParallaxText speed={0.6}>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 leading-tight">
                  {settings.hero_subtitle}
                </h1>
              </ParallaxText>
            </div>

            <ParallaxText speed={0.5}>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {settings.hero_description}
              </p>
            </ParallaxText>

            <ParallaxText speed={0.8}>
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start">
                <Link href="/topup" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-1 flex items-center justify-center gap-2">
                  เริ่มต้นใช้งาน &rarr;
                </Link>
                <Link href="/products" className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-transparent border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-900 dark:text-white rounded-xl font-semibold transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50 flex items-center justify-center">
                  ดูสินค้าเรา
                </Link>
              </div>
            </ParallaxText>

            {/* Stats Row */}
            <ParallaxText speed={0.3} className="pt-12 mt-12 grid grid-cols-3 gap-8">
              <div>
                <h4 className="text-3xl font-bold text-slate-900 dark:text-white">17+</h4>
                <p className="text-sm text-slate-500">ผู้ใช้งานทั่วโลก</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-slate-900 dark:text-white">99.9%</h4>
                <p className="text-sm text-slate-500">Uptime Guarantee</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-slate-900 dark:text-white">24/7</h4>
                <p className="text-sm text-slate-500">Expert Support</p>
              </div>
            </ParallaxText>
          </div>

          {/* Dashboard Card - Right (Parallax) */}
          <Parallax speed={0.2} className="relative hidden lg:block">
            <div className="relative z-10 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 rounded-3xl p-6 shadow-2xl transform rotate-y-12 hover:rotate-0 transition-transform duration-500">
              {/* Header */}
              <div className="flex justify-between items-center mb-8 border-b border-slate-100 dark:border-slate-700/50 pb-4">
                <div>
                  <h3 className="text-slate-900 dark:text-white font-bold text-lg">Server Overview</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Bangkok, Thailand - HK-01</p>
                </div>
                <div className="px-2 py-1 bg-green-500/10 dark:bg-green-500/20 text-green-600 dark:text-green-400 text-xs rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Online
                </div>
              </div>

              {/* Cards */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-100 dark:border-slate-700/30">
                  <div className="p-2 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-lg w-fit mb-3"><Zap size={20} /></div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Response Time</div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">45 <span className="text-sm font-normal text-slate-500">ms</span></div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-100 dark:border-slate-700/30">
                  <div className="p-2 bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-lg w-fit mb-3"><Globe size={20} /></div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Bandwidth</div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">1.2 <span className="text-sm font-normal text-slate-500">TB</span></div>
                </div>
              </div>

              {/* Graph Mock */}
              <div className="bg-slate-50 dark:bg-slate-800/30 rounded-2xl p-4 border border-slate-100 dark:border-slate-700/30 h-32 flex items-end gap-2">
                {[40, 60, 45, 70, 50, 80, 65, 90, 75, 55, 60, 95].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="flex-1 bg-gradient-to-t from-blue-600/30 to-blue-500 rounded-t-sm"
                  />
                ))}
              </div>
            </div>

            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/10 dark:bg-blue-500/20 blur-[100px] -z-10" />
          </Parallax>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center text-center mb-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">บริการของเรา</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl">เลือกสิ่งที่ดีที่สุดสำหรับการใช้งานของคุณ</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: Rocket, title: "จัดส่งอัตโนมัติ", desc: "รับสินค้าทันทีหลังชำระเงิน รวดเร็วทันใจ" },
            { icon: ShieldCheck, title: "ปลอดภัย 100%", desc: "ระบบรักษาความปลอดภัยมาตรฐาน SSL" },
            { icon: Zap, title: "รวดเร็ว", desc: "ทำรายการไวในไม่กี่วินาที ไม่ต้องรอนาน" },
            { icon: Server, title: "บริการ 24 ชม.", desc: "พร้อมให้บริการและซัพพอร์ตตลอดเวลา" }
          ].map((feature, i) => (
            <Parallax key={i} speed={0.1 * (i + 1)}>
              <div className="bg-white dark:bg-slate-800/40 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50 hover:border-blue-500 transition-all hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:-translate-y-1 shadow-sm hover:shadow-xl h-full">
                <div className="inline-flex p-4 rounded-xl bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 mb-4">
                  <feature.icon size={32} />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            </Parallax>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <span className="w-1.5 h-8 bg-gradient-to-b from-blue-600 to-cyan-500 rounded-full inline-block" />
            สินค้าแนะนำ
          </h2>
          <Link href="/products" className="text-blue-600 dark:text-blue-400 hover:underline font-medium transition-colors">
            ดูทั้งหมด &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}
