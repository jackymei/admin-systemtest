src/
├── api/                 # API接口模块
│   ├── auth.ts
│   ├── user.ts
│   ├── role.ts
│   ├── dashboard.ts
│   └── notification.ts
├── assets/              # 静态资源
│   ├── images/
│   └── styles/
├── components/          # 全局组件
│   ├── common/
│   ├── form/
│   └── table/
├── directives/          # 自定义指令
│   └── permission.ts
├── hooks/               # 组合式函数
│   ├── useRequest.ts
│   └── useTable.ts
├── layout/              # 布局组件
│   └── components/
│       ├── Sidebar/
│       ├── Navbar/
│       ├── TagsView/
│       └── AppMain/
├── router/              # 路由配置
│   ├── index.ts
│   └── guards/
├── stores/              # Pinia状态管理
│   ├── user.ts
│   ├── permission.ts
│   ├── app.ts
│   └── tagsView.ts
├── types/               # TypeScript类型
│   ├── api.d.ts
│   ├── user.d.ts
│   └── global.d.ts
├── utils/               # 工具函数
│   ├── request.ts
│   ├── auth.ts
│   └── format.ts
├── views/               # 页面组件
│   ├── login/
│   ├── dashboard/
│   ├── system/
│   │   ├── user/
│   │   ├── role/
│   │   └── config/
│   ├── log/
│   └── profile/
├── App.vue
└── main.ts
