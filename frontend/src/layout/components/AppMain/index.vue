<template>
  <div class="app-main">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.app-main {
  flex: 1;
  padding: 20px;
  overflow: auto;
}
</style>
