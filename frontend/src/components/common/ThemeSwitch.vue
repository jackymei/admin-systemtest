<template>
  <div class="theme-switch">
    <el-icon @click="toggleTheme" class="theme-icon">
      <Moon v-if="appStore.theme === 'light'" />
      <Sunny v-else />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

function toggleTheme() {
  const newTheme = appStore.theme === 'light' ? 'dark' : 'light'
  appStore.setTheme(newTheme)
}
</script>

<style scoped>
.theme-icon {
  font-size: 20px;
  cursor: pointer;
  transition: transform 0.3s;
}

.theme-icon:hover {
  transform: rotate(180deg);
}
</style>
