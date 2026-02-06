<template>
  <div class="message-center">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>消息中心</span>
          <el-button @click="handleMarkAllRead">全部已读</el-button>
        </div>
      </template>

      <el-tabs v-model="activeTab">
        <el-tab-pane label="全部消息" name="all">
          <MessageList :data="tableData" @refresh="handleQuery" />
        </el-tab-pane>
        <el-tab-pane label="未读消息" name="unread">
          <MessageList :data="unreadData" @refresh="handleQuery" />
        </el-tab-pane>
      </el-tabs>

      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.pageSize"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleQuery"
        @current-change="handleQuery"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { ElMessage } from 'element-plus'
import request from '@/utils/request'
import MessageList from './MessageList.vue'

const activeTab = ref('all')
const loading = ref(false)
const tableData = ref([])

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0,
})

const unreadData = computed(() => tableData.value.filter((item: any) => !item.read))

async function handleQuery() {
  loading.value = true
  try {
    const res = await request.get('/notifications', {
      params: { ...pagination, read: activeTab.value === 'unread' ? false : undefined },
    })
    tableData.value = res.items || []
    pagination.total = res.total || 0
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

async function handleMarkAllRead() {
  try {
    await request.put('/notifications/read-all', {})
    ElMessage.success('已全部标记为已读')
    handleQuery()
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  handleQuery()
})
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
