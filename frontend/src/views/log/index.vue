<template>
  <div class="log-monitoring">
    <el-card>
      <template #header>
        <span>操作日志</span>
      </template>

      <el-form :model="queryForm" inline>
        <el-form-item label="用户名">
          <el-input v-model="queryForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="模块">
          <el-input v-model="queryForm.module" placeholder="请输入模块" />
        </el-form-item>
        <el-form-item label="时间范围">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="handleDateChange"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData" v-loading="loading" stripe>
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="module" label="模块" />
        <el-table-column prop="action" label="操作" />
        <el-table-column prop="method" label="方法" />
        <el-table-column prop="path" label="路径" />
        <el-table-column prop="ip" label="IP地址" />
        <el-table-column prop="duration" label="耗时(ms)" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="row.status === 'success' ? 'success' : 'danger'">
              {{ row.status === 'success' ? '成功' : '失败' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" />
      </el-table>

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
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import request from '@/utils/request'

const loading = ref(false)
const tableData = ref([])
const dateRange = ref<any[]>([])

const queryForm = reactive({
  username: '',
  module: '',
  startTime: '',
  endTime: '',
})

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0,
})

function handleDateChange(value: any[]) {
  if (value && value.length === 2) {
    queryForm.startTime = value[0]
    queryForm.endTime = value[1]
  } else {
    queryForm.startTime = ''
    queryForm.endTime = ''
  }
}

async function handleQuery() {
  loading.value = true
  try {
    const res = await request.get('/logs/oper', { params: { ...queryForm, ...pagination } })
    tableData.value = res.items || []
    pagination.total = res.total || 0
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

function handleReset() {
  Object.assign(queryForm, { username: '', module: '', startTime: '', endTime: '' })
  dateRange.value = []
  handleQuery()
}

onMounted(() => {
  handleQuery()
})
</script>

<style scoped>
.el-pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
