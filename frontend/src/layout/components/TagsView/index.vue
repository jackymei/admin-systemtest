<template>
  <div class="tags-view">
    <el-scrollbar>
      <div class="tags-item">
        <router-link to="/dashboard">仪表盘</router-link>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.tags-view {
  height: 34px;
  background: var(--bg-base);
  border-bottom: 1px solid var(--border-light);
}

.tags-item {
  display: inline-flex;
  padding: 0 10px;
  height: 100%;
  align-items: center;
  font-size: 12px;
}

a {
  color: var(--text-regular);
  text-decoration: none;
  padding: 0 8px;
  height: 26px;
  line-height: 26px;
  border: 1px solid var(--border-base);
  border-radius: 2px;
  background: var(--bg-base);
}

a.router-link-active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}
</style>
