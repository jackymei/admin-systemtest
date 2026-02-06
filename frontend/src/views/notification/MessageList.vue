<template>
  <el-table :data="data" v-loading="loading" stripe>
    <el-table-column prop="title" label="标题" />
    <el-table-column prop="type" label="类型" width="100">
      <template #default="{ row }">
        <el-tag :type="getTypeColor(row.type)">{{ getTypeLabel(row.type) }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="content" label="内容" show-overflow-tooltip />
    <el-table-column prop="read" label="状态" width="80">
      <template #default="{ row }">
        <el-tag :type="row.read ? 'info' : 'danger'">
          {{ row.read ? '已读' : '未读' }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="createdAt" label="时间" width="180" />
    <el-table-column label="操作" width="150">
      <template #default="{ row }">
        <el-button link type="primary" @click="handleView(row)">查看</el-button>
        <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="dialogVisible" title="消息详情" width="500px">
    <el-descriptions :column="1" border>
      <el-descriptions-item label="标题">{{ currentMessage.title }}</el-descriptions-item>
      <el-descriptions-item label="类型">{{ getTypeLabel(currentMessage.type) }}</el-descriptions-item>
      <el-descriptions-item label="内容">{{ currentMessage.content }}</el-descriptions-item>
      <el-descriptions-item label="时间">{{ currentMessage.createdAt }}</el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import request from '@/utils/request'

defineProps<{ data: any[], loading: boolean }>()
const emit = defineEmits(['refresh'])

const dialogVisible = ref(false)
const currentMessage = ref<any>({})

function getTypeColor(type: string) {
  const map: Record<string, string> = {
    system: '',
    alert: 'warning',
    report: 'success',
  }
  return map[type] || ''
}

function getTypeLabel(type: string) {
  const map: Record<string, string> = {
    system: '系统消息',
    alert: '告警消息',
    report: '报告消息',
  }
  return map[type] || type
}

async function handleView(row: any) {
  currentMessage.value = row
  dialogVisible.value = true
  if (!row.read) {
    try {
      await request.put(`/notifications/${row.id}/read`)
      emit('refresh')
    } catch (error) {
      console.error(error)
    }
  }
}

async function handleDelete(row: any) {
  try {
    await ElMessageBox.confirm('确定要删除该消息吗？', '提示', {
      type: 'warning',
    })
    await request.delete(`/notifications/${row.id}`)
    ElMessage.success('删除成功')
    emit('refresh')
  } catch (error) {
    if (error !== 'cancel') {
      console.error(error)
    }
  }
}
</script>
