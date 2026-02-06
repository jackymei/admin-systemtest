import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const theme = ref(localStorage.getItem('theme') || 'light')
  const sidebarCollapsed = ref(false)

  function setTheme(newTheme: string) {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
  }

  return {
    theme,
    sidebarCollapsed,
    setTheme,
    toggleSidebar,
    initTheme,
  }
})
