# 后台管理系统

基于 Vue 3 + NestJS + MongoDB 的企业级后台管理系统。

## 技术栈

### 前端
- Vue 3 + TypeScript
- Vite
- Element Plus
- Pinia
- Vue Router
- Axios
- ECharts

### 后端
- NestJS + TypeScript
- MongoDB
- Redis
- JWT 认证
- Passport

## 开发环境要求

- Node.js >= 18.0.0
- MongoDB >= 6.0
- Redis >= 7.0

## 快速开始

### 使用 Docker Compose

```bash
docker-compose up -d
```

### 本地开发

#### 前端

```bash
cd frontend
npm install
npm run dev
```

#### 后端

```bash
cd backend
npm install
npm run start:dev
```

## 项目结构

```
├── frontend/          # 前端项目
│   ├── src/
│   │   ├── api/       # API接口
│   │   ├── assets/    # 静态资源
│   │   ├── components/# 全局组件
│   │   ├── layout/    # 布局组件
│   │   ├── router/    # 路由配置
│   │   ├── stores/    # 状态管理
│   │   ├── types/     # 类型定义
│   │   ├── utils/     # 工具函数
│   │   └── views/     # 页面组件
│   └── package.json
│
├── backend/           # 后端项目
│   ├── src/
│   │   ├── modules/   # 业务模块
│   │   ├── common/    # 公共模块
│   │   ├── shared/    # 共享服务
│   │   └── config/    # 配置文件
│   └── package.json
│
└── docker-compose.yml # Docker编排文件
```

## 功能特性

- 用户认证与授权（JWT + RBAC）
- 用户管理
- 角色权限管理
- 数据可视化仪表盘
- 操作日志监控
- 消息通知
- 报表生成

## 许可证

MIT
