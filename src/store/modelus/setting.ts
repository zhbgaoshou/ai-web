import { defineStore } from 'pinia'
import themes from 'daisyui/src/theming/themes'

type Theme = keyof typeof themes;  // 确保 Theme 类型是 themes 的键

const currentTheme = localStorage.getItem('currentTheme') || '';
const isFullWidth = localStorage.getItem('isFullWidth') === 'true';

export const useSettingStore = defineStore('setting', {
    state: () => ({
        themeList: [
            "light",
            "dark",
            "wireframe",
            "black",
            "lofi",
            "nord",
            'night'
        ],
        currentTheme: currentTheme,
        isFullWidth: isFullWidth,
    }),

    actions: {
        getTheme() {
            // 将 themeName 显式转换为 Theme 类型
            const filteredThemes = this.themeList.reduce((acc, themeName) => {
                if (themes[themeName as Theme]) {
                    acc[themeName] = themes[themeName as Theme];  // 强制将 themeName 作为 Theme 类型
                }
                return acc;
            }, {} as Record<string, Record<string, string>>);

            return filteredThemes;
        },

        setTheme(themeName: string) {
            document.documentElement.setAttribute('data-theme', themeName);
            this.currentTheme = themeName;
            localStorage.setItem('currentTheme', themeName);
        },
        setFullWidth(isFullWidth: boolean) {
            const appEl = document.getElementById('app') as HTMLDivElement;
            if (this.isFullWidth) {
                appEl.classList.add('!max-w-full');
            } else {
                appEl.classList.remove('!max-w-full');
            }
            localStorage.setItem('isFullWidth', isFullWidth.toString());
        },
        initSetting() {
            this.setTheme(this.currentTheme);
            this.setFullWidth(this.isFullWidth);
        },
    },

    getters: {
        // 可以添加其他需要的计算属性
    }
})
