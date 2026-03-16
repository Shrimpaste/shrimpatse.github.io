# Geek Blog - 项目说明

## 设计概念

这是一个融合**极客美学**与**文艺气质**的个人博客。设计哲学：

- **极客**: 终端元素、代码高亮、命令行提示符
- **简约**: 大量留白、克制配色、清晰层级
- **文艺**: 精致排版、优雅动画、衬线字体

## 配色方案

| 用途 | 颜色 | Hex |
|------|------|-----|
| 主背景 | 墨绿黑 | `#0a0f0c` |
| 次级背景 | 深墨绿 | `#111815` |
| 强调色 | 琥珀金 | `#f59e0b` |
| 代码色 | 薄荷绿 | `#34d399` |
| 主文字 | 米白 | `#e8e6e3` |
| 次级文字 | 灰 | `#9ca3af` |

## 字体

- **标题**: Crimson Text (衬线体，增加文艺感)
- **正文**: Source Sans 3 (无衬线，清晰易读)
- **代码/终端**: JetBrains Mono (等宽，极客感)

## 动画效果

- 页面切换淡入淡出
- 卡片悬停微抬升
- 打字机效果光标
- 阅读进度条
- 终端光标闪烁

## 文件结构

```
geek-blog/
├── src/
│   ├── components/
│   │   ├── Header.tsx          # 导航栏
│   │   ├── Footer.tsx          # 页脚
│   │   ├── TerminalPrompt.tsx  # 终端组件
│   │   ├── PostCard.tsx        # 文章卡片
│   │   ├── ReadingProgress.tsx # 阅读进度
│   │   └── index.ts            # 导出
│   ├── pages/
│   │   ├── Home.tsx            # 首页
│   │   ├── BlogList.tsx        # 博客列表
│   │   ├── PostDetail.tsx      # 文章详情
│   │   ├── About.tsx           # 关于页面
│   │   └── index.ts            # 导出
│   ├── data/
│   │   └── posts.ts            # 文章数据
│   ├── types/
│   │   └── index.ts            # 类型定义
│   ├── App.tsx                 # 路由配置
│   ├── main.tsx                # 入口
│   └── index.css               # 全局样式
├── index.html                  # HTML模板
├── tailwind.config.js          # Tailwind配置
├── postcss.config.js           # Postcss配置
├── vite.config.ts              # Vite配置
└── package.json                # 依赖

```

## 使用方法

### 1. 安装依赖

```bash
cd geek-blog
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173

### 3. 添加文章

编辑 `src/data/posts.ts`:

```typescript
{
  id: '7',
  title: '你的文章标题',
  excerpt: '简短描述',
  content: `# Markdown 内容

支持所有 Markdown 语法：
- 列表
- **加粗**
- [链接](url)
- \`代码\`

\`\`\`javascript
// 代码块
console.log('Hello');
\`\`\`
  `,
  date: '2024-03-20',
  readTime: '5 min',
  tags: ['标签1', '标签2'],
  slug: 'your-article-slug'
}
```

### 4. 自定义个人信息

编辑 `src/data/posts.ts` 中的 `author` 对象:

```typescript
export const author = {
  name: '你的名字',
  title: '职位',
  bio: '个人简介',
  location: '城市',
  email: 'your@email.com',
  github: 'https://github.com/yourname',
  twitter: 'https://twitter.com/yourname'
};
```

### 5. 构建

```bash
npm run build
```

输出到 `dist/` 目录。

## 部署

### GitHub Pages

1. 推送代码到 GitHub
2. 设置 Actions 自动部署
3. 或使用 `gh-pages` 分支

### Vercel

```bash
npm i -g vercel
vercel
```

### Netlify

连接 GitHub 仓库自动部署。

## 特色组件

### TerminalPrompt

```tsx
<TerminalPrompt>echo "Hello World"</TerminalPrompt>
// 渲染: $ echo "Hello World" _
```

### TerminalWindow

```tsx
<TerminalWindow title="script.js">
  {/* 内容 */}
</TerminalWindow>
```

### PostCard

```tsx
<PostCard post={post} index={0} />
```

## 响应式断点

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 依赖说明

- **react-router-dom**: 路由
- **framer-motion**: 动画
- **lucide-react**: 图标
- **react-markdown**: Markdown 渲染
- **rehype-highlight**: 代码高亮
- **remark-gfm**: GitHub Flavored Markdown

## 面试展示建议

1. **技术亮点**:
   - TypeScript 类型安全
   - 组件化设计
   - 动画与交互
   - Markdown 渲染
   - 响应式布局

2. **设计亮点**:
   - 独特的配色方案
   - 终端风格元素
   - 精致的排版
   - 流畅的动画

3. **可扩展性**:
   - 易于添加新文章
   - 组件可复用
   - 样式系统清晰

---

祝你面试顺利！
