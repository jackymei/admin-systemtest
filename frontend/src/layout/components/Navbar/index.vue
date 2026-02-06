<template>
  <div class="navbar">
    <div class="left">
      <el-icon @click="toggleCollapse" style="cursor: pointer; font-size: 20px; margin-right: 20px">
        <Fold v-if="!collapsed" />
        <Expand v-else />
      </el-icon>
      <span class="title">{{ currentTitle }}</span>
    </div>
    <div class="right">
      <el-badge :value="unreadCount" :hidden="unreadCount === 0" style="margin-right: 20px">
        <el-icon :size="20" style="cursor: pointer" @click="router.push('/notification')">
          <Bell />
        </el-icon>
      </el-badge>
      <ThemeSwitch />
      <el-dropdown style="margin-left: 20px">
        <span class="user-info">
          <el-avatar :size="30" />
          <span>{{ userStore.userInfo?.username || '管理员' }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="router.push('/profile')">个人中心</el-dropdown-item>
            <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import request from '@/utils/request'
import ThemeSwitch from '@/components/common/ThemeSwitch.vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const collapsed = defineModel<boolean>('collapsed')
const unreadCount = ref(0)

const currentTitle = computed(() => route.meta.title as string || '后台管理系统')

function toggleCollapse() {
  collapsed.value = !collapsed.value
}

async function handleLogout() {
  await userStore.logoutAction()
  router.push('/login')
}

async function getUnreadCount() {
  try {
    const res = await request.get('/notifications', { params: { read: false, pageSize: 1 } })
    unreadCount.value = res.unread || 0
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getUnreadCount()
})
</script>

<style scoped>
.navbar {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background: var(--bg-base);
  border-bottom: 1px solid var(--border-light);
}

.left {
  display: flex;
  align-items: center;
}

.title {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);
}

.right {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
</style>
