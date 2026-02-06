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
  background: white;
  border-bottom: 1px solid #e6e6e6;
}

.tags-item {
  display: inline-flex;
  padding: 0 10px;
  height: 100%;
  align-items: center;
  font-size: 12px;
}

a {
  color: #495060;
  text-decoration: none;
  padding: 0 8px;
  height: 26px;
  line-height: 26px;
  border: 1px solid #d8dce5;
  border-radius: 2px;
  background: white;
}

a.router-link-active {
  background: #409eff;
  color: white;
  border-color: #409eff;
}
</style>
