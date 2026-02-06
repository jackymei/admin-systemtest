<template>
  <div class="sidebar">
    <div class="logo">后台管理系统</div>
    <el-menu
      :default-active="activeMenu"
      :collapse="collapsed"
      router
    >
      <el-menu-item index="/dashboard">
        <el-icon><House /></el-icon>
        <span>仪表盘</span>
      </el-menu-item>
      <el-sub-menu index="system">
        <template #title>
          <el-icon><Setting /></el-icon>
          <span>系统管理</span>
        </template>
        <el-menu-item index="/system/user">用户管理</el-menu-item>
        <el-menu-item index="/system/role">角色管理</el-menu-item>
        <el-menu-item index="/system/config">系统配置</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/log">
        <el-icon><Document /></el-icon>
        <span>日志监控</span>
      </el-menu-item>
      <el-menu-item index="/notification">
        <el-icon><Bell /></el-icon>
        <span>消息中心</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const collapsed = defineModel<boolean>('collapsed')
const activeMenu = computed(() => route.path)
</script>

<style scoped>
.sidebar {
  width: 220px;
  height: 100%;
  background: var(--sidebar-bg);
  transition: width 0.3s;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  font-weight: bold;
}

:deep(.el-menu) {
  border-right: none;
  background: var(--sidebar-bg);
}

:deep(.el-menu-item), :deep(.el-sub-menu__title) {
  color: var(--sidebar-text);
}

:deep(.el-menu-item:hover), :deep(.el-sub-menu__title:hover) {
  background: #263445;
}

:deep(.el-menu-item.is-active) {
  background: #263445;
  color: var(--sidebar-active);
}
</style>
