<template>
  <div class="navbar">
    <div class="left">
      <el-icon @click="toggleCollapse" style="cursor: pointer; font-size: 20px">
        <Fold v-if="!collapsed" />
        <Expand v-else />
      </el-icon>
    </div>
    <div class="right">
      <el-dropdown>
        <span class="user-info">
          <el-avatar :size="30" />
          <span>管理员</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()
const collapsed = defineModel<boolean>('collapsed')

function toggleCollapse() {
  collapsed.value = !collapsed.value
}

async function handleLogout() {
  await userStore.logoutAction()
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background: white;
  border-bottom: 1px solid #e6e6e6;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
</style>
