import type { Post, Project } from '../types';

export const posts: Post[] = [
  {
    id: '1',
    title: '在终端与诗歌之间',
    excerpt: '作为一名开发者，我常常在代码的逻辑严谨与文字的朦胧意境之间寻找平衡。这篇文章探讨技术与人文的交汇点。',
    content: `# 在终端与诗歌之间

> "代码是写给人看的，只是顺便让机器执行。" —— Harold Abelson

作为一名开发者，我常常在代码的逻辑严谨与文字的朦胧意境之间寻找平衡。清晨六点的编译器提示与深夜台灯下的散文草稿，构成了我生活的两个极点。

## 命令行的浪漫

\`\`\`bash
$ grep -r "poetry" ~/life/moments/
./sunrise.md:金色的光落在键盘上
./rainy-night.md:听雨声，写递归
./coffee-shop.md:那杯拿铁的温度，像极了一个bug的复现率
\`\`\`

终端的黑底绿字，是最纯粹的界面。没有多余的装饰，只有**输入**与**输出**的直接对话。这种极简主义的美感，与俳句的十七音有着异曲同工之妙。

## 编程语言的文学性

Python 的优雅像一首散文诗，Ruby 的灵活如爵士乐即兴，Haskell 的纯粹则是数学证明般的严谨。每种语言都有其独特的"文风"。

\`\`\`python
# 一个生成器的俳句
def moments():
    yield "晨光微熹"
    yield "代码流淌"
    yield "黄昏入定"
\`\`\`

## 注释里的秘密

最诚实的文字往往藏在代码注释里：

- \`// 这里有个hack，但暂时能用\`
- \`# TODO: 人生苦短，我用Python\`
- \`/* 这段代码写于凌晨三点，神志不清 */\`

## 结语

技术与人文从不矛盾。它们都是人类试图理解世界、表达自我的方式。终端闪烁的光标与稿纸上流动的墨水，本质上是同一种渴望的两种形态。

---

*写于 Vim，背景音乐是坂本龙一的《异步》。*`,
    date: '2026-02-28',
    readTime: '5 min',
    tags: ['随笔', '技术哲学', '生活'],
    slug: 'between-terminal-and-poetry'
  },
  {
    id: '2',
    title: 'Rust 学习笔记：所有权与借用的诗意',
    excerpt: 'Rust 的所有权系统不仅是内存安全的保障，更是一种资源管理的哲学。让我们用文艺的视角来理解这门语言。',
    content: `# Rust 学习笔记：所有权与借用的诗意

Rust 的所有权系统常被初学者视为陡峭的学习曲线。但换个角度，它其实是一种**生命的隐喻**。

## 所有权：独一无二的拥有

\`\`\`rust
let book = String::from《百年孤独》;
let gift = book;  // 所有权转移
// println!("{}", book); // 错误：值已被移动
\`\`\`

这就像马尔克斯将手稿交给出版社——**同一个时刻，只有一个所有者**。

## 借用：暂时的凝视

\`\`\`rust
fn read(book: &String) {
    println!("阅读: {}", book);
} // 借用结束，书归还

let novel = String::from《挪威的森林》;
read(&novel);  // 不可变借用
read(&novel);  // 可以多次借用
\`\`\`

借阅而不占有，这是图书馆的智慧，也是 Rust 的安全哲学。

## 生命周期的韵律

\`\`\`rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}
\`\`\`

生命周期标注就像诗歌的韵脚，规定了引用的存在边界。

## 为什么值得学习

| 特性 | 隐喻 |
|------|------|
| 零成本抽象 | 写意画的留白 |
| 模式匹配 | 命运的岔路口 |
| 错误处理 |  plan B 的艺术 |

## 结语

Rust 不是一门容易的语言，但正如里尔克所说：*"你要爱你的寂寞。"* 学习 Rust 的过程，也是学习如何与复杂性共处的过程。`,
    date: '2026-01-15',
    readTime: '8 min',
    tags: ['Rust', '编程语言', '学习笔记'],
    slug: 'rust-ownership-poetry'
  },
  {
    id: '3',
    title: '构建极简的个人知识管理系统',
    excerpt: '在这个信息过载的时代，如何建立一个不成为负担的知识管理系统？分享我的 Zettelkasten 实践与工具链。',
    content: `# 构建极简的个人知识管理系统

> 你的笔记系统应该是一个花园，而不是一个仓库。

## 问题：收集癖的陷阱

我们都有过这样的经历：
- 收藏了 1000+ 篇文章，却从未回顾
- 笔记软件换了一个又一个
- 精心整理的分类，最后成了信息的坟墓

## 我的解决方案

### 1. 纯文本的持久性

所有笔记使用 Markdown，存储在 Git 仓库中。没有专有格式，没有供应商锁定。

\`\`\`
notes/
├── fleeting/      # 闪念笔记
├── literature/    # 文献笔记
├── permanent/     # 永久笔记
└── index.md       # 索引
\`\`\`

### 2. 卡片盒笔记法 (Zettelkasten)

每则笔记只包含一个想法，通过链接形成网络。

\`\`\`markdown
---
id: 202403101234
tags: [cognition, learning]
---

# 间隔重复的记忆曲线

艾宾浩斯遗忘曲线表明...

## 链接
- [[202403100001]] 记忆的形成机制
- [[202403090045]] Anki 使用技巧
\`\`\`

### 3. 工具链

| 用途 | 工具 | 理由 |
|------|------|------|
| 编辑 | Neovim | 速度、可定制 |
| 同步 | Git | 版本控制 |
| 搜索 | ripgrep | 极速 |
| 发布 | Hugo | 静态生成 |

## 每日 workflow

\`\`\`bash
# 早晨：回顾
$ git log --oneline --since="1 day ago" -- notes/

# 随时记录
$ nvim notes/fleeting/$(date +%Y%m%d%H%M).md

# 晚间整理
$ ./scripts/archive-fleeting.sh
\`\`\`

## 核心原则

1. **现在就写** — 不要等到"完美的笔记系统"
2. **链接胜于分类** — 让知识自然生长
3. **定期修剪** — 删除过时的笔记
4. **公开发布** — 教是最好的学

## 结语

知识管理的终极目标不是拥有更多笔记，而是**更好的思考**。保持系统简单，让注意力回归内容本身。`,
    date: '2025-12-08',
    readTime: '6 min',
    tags: ['效率工具', '知识管理', '方法论'],
    slug: 'minimal-pkm'
  },
  {
    id: '4',
    title: '递归之美：函数的自画像',
    excerpt: '递归不仅是编程技巧，更是一种思维方式。从数学归纳法到分形艺术，探索自相似的魅力。',
    content: `# 递归之美：函数的自画像

\`\`\`python
def recursion():
    return recursion()
    # 不要在家里尝试这个
\`\`\`

## 什么是递归

递归是函数调用自身的编程技巧。但更深层的，它是一种**将大问题分解为相似小问题**的思维方式。

## 经典例子

### 阶乘
\`\`\`python
def factorial(n):
    return 1 if n <= 1 else n * factorial(n - 1)
\`\`\`

### 斐波那契
\`\`\`python
def fib(n):
    return n if n < 2 else fib(n-1) + fib(n-2)
\`\`\`

### 树的遍历
\`\`\`python
def traverse(node):
    if node is None:
        return
    traverse(node.left)
    print(node.value)
    traverse(node.right)
\`\`\`

## 递归三要素

1. **基准情况** (Base case) — 何时停止
2. **递归情况** (Recursive case) — 如何分解
3. **收敛** — 问题规模必须减小

## 现实中的递归

- 俄罗斯套娃
- 分形几何
- 梦境中的梦境
- 故事中的故事 (*《一千零一夜》*)

## 尾递归优化

\`\`\`python
def factorial_tail(n, acc=1):
    return acc if n <= 1 else factorial_tail(n-1, n*acc)
\`\`\`

某些语言会将尾递归优化为循环，避免栈溢出。

## 结语

理解递归，就像学会从两面镜子之间看世界 — 无限延伸，却又回到起点。`,
    date: '2025-10-22',
    readTime: '4 min',
    tags: ['算法', '编程思想', '计算机科学'],
    slug: 'beauty-of-recursion'
  },
  {
    id: '5',
    title: '暗色模式的设计哲学',
    excerpt: '为什么程序员喜欢暗色主题？从视觉生理学到界面美学，探讨暗色模式的设计原则。',
    content: `# 暗色模式的设计哲学

> 在黑暗中，我们看到的更清晰。

## 为什么暗色？

### 生理层面
- 减少蓝光暴露，保护褪黑素分泌
- 低亮度下，暗色更舒适
- OLED 屏幕的省电效应

### 心理层面
- 减少视觉疲劳
- 营造专注氛围
- "黑客美学"的文化认同

## 设计原则

### 1. 避免纯黑

\`\`\`css
/* 不好 */
background: #000000;

/* 更好 */
background: #0a0f0c;  /* 带一点绿调的黑 */
\`\`\`

纯黑与纯白文字对比度过强，会造成"光晕效应"。

### 2. 分层明度

\`\`\`
Surface:    #0a0f0c  (最深)
Elevation 1: #111815
Elevation 2: #1a211c
Elevation 3: #242e28  (最浅)
\`\`\`

### 3. 饱和度控制

暗色模式中的颜色应该降低饱和度，避免刺眼。

\`\`\`css
/* 亮色模式 */
--accent: #3b82f6;

/* 暗色模式 */
--accent: #60a5fa;  /* 更亮，但饱和度更低 */
\`\`\`

## 实现方案

### CSS 变量方案
\`\`\`css
:root {
  --bg: #faf9f6;
  --text: #1a1a1a;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0a0f0c;
    --text: #e8e6e3;
  }
}
\`\`\`

### React Context 方案
\`\`\`tsx
const ThemeContext = createContext({ theme: 'dark', toggle: () => {} });
\`\`\`

## 常见错误

1. 直接反转颜色
2. 忽视图片适配
3. 阴影效果失效（暗色下阴影不明显）
4. 对比度不足

## 结语

暗色模式不仅是一种偏好，更是对数字生活质量的追求。好的暗色设计，应该让人忘记它的存在，只专注于内容本身。`,
    date: '2025-09-10',
    readTime: '7 min',
    tags: ['UI设计', '前端开发', '用户体验'],
    slug: 'dark-mode-philosophy'
  },
  {
    id: '6',
    title: '用 Neovim 打造写作环境',
    excerpt: '离开 VS Code:，我用 Neovim 搭建了一个专注的写作环境。从配置到插件，完整分享。',
    content: `# 用 Neovim 打造写作环境

从 VS Code: 迁移到 Neovim 不是为了"炫技"，而是为了**更纯粹的写作体验**。

## 为什么选 Neovim

- 启动速度 < 100ms
- 全键盘操作，手不离位
- 可高度定制
- 终端原生集成

## 核心配置

### 基础设置
\`\`\`lua
-- init.lua
vim.opt.number = false        -- 无行号，更干净
vim.opt.wrap = true           -- 自动换行
vim.opt.linebreak = true      -- 按词换行
vim.opt.spell = true          -- 拼写检查
vim.opt.spelllang = { 'en', 'cjk' }
\`\`\`

### 专注模式
\`\`\`lua
-- 居中当前行
vim.opt.scrolloff = 999

-- 隐藏所有 UI 元素
vim.opt.laststatus = 0
vim.opt.showmode = false
vim.opt.showcmd = false
\`\`\`

## 写作插件

| 插件 | 用途 |
|------|------|
| vim-pencil | 文本对象的正确处理 |
| zen-mode.nvim | 无干扰写作模式 |
| telescope.nvim | 文件快速跳转 |
| markdown-preview.nvim | 实时预览 |

## Zen Mode 配置

\`\`\`lua
require("zen-mode").setup {
  window = {
    backdrop = 0.95,
    width = 80,
    options = {
      signcolumn = "no",
      number = false,
      cursorline = false,
    }
  },
  plugins = {
    tmux = { enabled = true },
  },
}
\`\`\`

## 快捷键

\`\`\`
<Space>zw    切换 Zen Mode
<Space>fp    查找文章
<Space>mp    Markdown 预览
\`\`\`

## 与 Hugo 集成

\`\`\`lua
-- 新建文章
vim.keymap.set('n', '<Leader>hn', function()
  local title = vim.fn.input('Title: ')
  local slug = title:lower():gsub(' ', '-')
  local file = string.format('content/posts/%s.md', slug)
  -- 创建文件并填充 frontmatter
end)
\`\`\`

## 结语

工具只是手段，**持续的写作习惯**才是关键。Neovim 提供的，是一个不打扰、随时就绪的创作空间。`,
    date: '2025-07-28',
    readTime: '5 min',
    tags: ['Neovim', '工具链', '写作'],
    slug: 'neovim-writing-environment'
  }
];

export const projects: Project[] = [
  {
    id: '1',
    name: 'term-note',
    description: '终端里的笔记本，支持 Markdown 和全文搜索',
    tech: ['Rust', 'SQLite'],
    github: 'https://github.com/example/term-note'
  },
  {
    id: '2',
    name: 'synapse',
    description: '一个轻量级的 API 网关，支持插件系统',
    tech: ['Go', 'Redis'],
    github: 'https://github.com/example/synapse'
  },
  {
    id: '3',
    name: 'zen-reader',
    description: '浏览器扩展，一键开启专注阅读模式',
    tech: ['TypeScript', 'WebExtension'],
    github: 'https://github.com/Shrimpaste/zen-reader'
  }
];

export const allTags = [...new Set(posts.flatMap(p => p.tags))];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find(p => p.slug === slug);
}

export function getPostsByTag(tag: string): Post[] {
  return posts.filter(p => p.tags.includes(tag));
}

export function getRecentPosts(count: number = 3): Post[] {
  return posts.slice(0, count);
}

export const author = {
  name: '艾遥昕',
  title: '开发者 / 写作者',
  bio: '在代码与文字之间寻找平衡。相信技术的终极目标是解放人性，而非取代。',
  location: '武汉',
  email: 'a1677237312@outlook.com',
  github: 'https://github.com/Shrimpaste'
};
