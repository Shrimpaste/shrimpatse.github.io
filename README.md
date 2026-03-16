# Geek Blog

一个极客风格、简约、文艺的个人博客网站。

![Preview](https://img.shields.io/badge/React-18.2-blue)
![Preview](https://img.shields.io/badge/TypeScript-5.2-blue)
![Preview](https://img.shields.io/badge/Tailwind-3.4-06B6D4)

## 特色

- **极客风格**: 深色主题、终端元素、代码高亮
- **简约设计**: 大量留白、克制配色、清晰层级
- **文艺气质**: 精致排版、优雅动画、阅读体验优先
- **技术栈**: React + TypeScript + Tailwind CSS + Framer Motion

## 设计亮点

- 墨绿色主色调 (#0a0f0c) + 琥珀金强调色 (#f59e0b) + 薄荷绿代码 (#34d399)
- Crimson Text 衬线字体增加文艺感
- JetBrains Mono 等宽字体用于终端风格元素
- 打字机效果光标、终端窗口组件
- 阅读进度条、页面切换动画

## 页面

- **首页**: 个人简介、精选文章、项目展示
- **博客列表**: 文章列表、标签筛选、搜索功能
- **文章详情**: Markdown 渲染、代码高亮、上一篇/下一篇导航
- **关于**: 个人介绍、技术栈、兴趣爱好

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建
npm run build
```

## 自定义

编辑 `src/data/posts.ts` 来添加你自己的文章：

```typescript
export const posts: Post[] = [
  {
    id: '1',
    title: '你的文章标题',
    excerpt: '文章摘要',
    content: '# Markdown 内容',
    date: '2024-03-15',
    readTime: '5 min',
    tags: ['标签1', '标签2'],
    slug: 'your-article-slug'
  }
];
```

## 目录结构

```
src/
├── components/       # 组件
│   ├── Header.tsx   # 导航头部
│   ├── Footer.tsx   # 页脚
│   ├── TerminalPrompt.tsx  # 终端风格组件
│   ├── PostCard.tsx        # 文章卡片
│   └── ReadingProgress.tsx # 阅读进度条
├── pages/           # 页面
│   ├── Home.tsx     # 首页
│   ├── BlogList.tsx # 博客列表
│   ├── PostDetail.tsx # 文章详情
│   └── About.tsx    # 关于页面
├── data/            # 数据
│   └── posts.ts     # 文章数据
├── types/           # 类型定义
│   └── index.ts
└── ...
```

## License

MIT
