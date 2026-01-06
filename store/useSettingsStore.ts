import { create } from 'zustand'

interface Settings {
    site_name: string
    primary_color: string
    hero_title: string
    hero_subtitle: string
    hero_description: string
}

interface SettingsState {
    settings: Settings
    isLoading: boolean
    fetchSettings: () => Promise<void>
    updateSettings: (newSettings: Partial<Settings>) => Promise<void>
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
    settings: {
        site_name: '64SHOP',
        primary_color: 'blue',
        hero_title: '64SHOP',
        hero_subtitle: 'FIVEM CHEAT CHEAP',
        hero_description: 'โปรแกรมช่วยเล่น FiveM คุณภาพดี ราคาถูก ใช้งานได้ทุกเซิฟเวอร์',
    },
    isLoading: false,
    fetchSettings: async () => {
        set({ isLoading: true })
        try {
            const res = await fetch('/api/settings')
            if (res.ok) {
                const data = await res.json()
                set({ settings: { ...get().settings, ...data } })
            }
        } catch (error) {
            console.error('Failed to fetch settings:', error)
        } finally {
            set({ isLoading: false })
        }
    },
    updateSettings: async (newSettings) => {
        try {
            const res = await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newSettings)
            })
            if (res.ok) {
                set({ settings: { ...get().settings, ...newSettings } })
            }
        } catch (error) {
            console.error('Failed to update settings:', error)
        }
    }
}))
