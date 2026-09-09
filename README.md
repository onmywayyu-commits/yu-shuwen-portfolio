# 个人作品集网站（Portfolio Site）

俞舒文的个人网站：一面是金融方向的求职作品集（简介、教育、实习与经历），
一面是兴趣记录站（动画剧评、音乐推荐、游戏手记、手作 / 吉他 / 唱歌）。

技术栈：**React + Vite + TypeScript + Tailwind CSS v4**，纯静态站点，无后端。

---

## 一、本地运行

```bash
npm install      # 首次安装依赖
npm run dev      # 本地开发（默认 http://localhost:5173）
npm run build    # 构建到 dist/（会先跑 TypeScript 检查）
npm run preview  # 本地预览构建产物
```

要求 Node.js 18 及以上。

---

## 二、如何更新网站内容（最重要）

**所有文字内容都集中在一个文件里：`src/data/siteData.ts`。**
改内容不需要碰任何组件代码，改完保存即可（开发模式下页面自动刷新）。

| 想改什么 | 在 siteData.ts 里改哪里 |
| --- | --- |
| 姓名、标语、自我介绍、求职方向、邮箱 | `siteMeta` |
| 页脚「最后更新于」 | `siteMeta.lastUpdated` |
| 自我介绍、教育经历、技能、工具、兴趣标签、在学内容 | `about` |
| 实习 / 创业经历（时间轴） | `experiences` 数组，按时间倒序排列 |
| 动画条目（封面、评分、短评、长评） | `animeEntries` 数组 |
| 音乐推荐（含「本月循环」：`monthlyPick: true`） | `musicEntries` 数组 |
| 游戏手记（状态：正在玩 / 已通关 / 搁置） | `gameEntries` 数组 |
| 手作 / 吉他 / 唱歌 | `creativeEntries` 数组 |
| 联系方式（GitHub、LinkedIn、Bilibili 等） | `contactLinks` 数组，`url: ''` 表示待补充 |

每类条目都有 TypeScript 类型提示，照着已有条目复制一段、改字段就行。
音乐 / 游戏 / 手作目前是**示例数据（页面已标注「待替换」）**，请换成真实内容。

### 新番评价的更新方式

每季度看完新番后，在 `animeEntries` 里按现有格式追加条目即可：
- `tier` 只能是：`'夯' | '人上人' | 'Npc-人上人' | 'npc' | '拉' | '未评'`；
- 复合评级（如「人上人制作 - npc 剧情」）把补充说明写进 `tierNote`；
- `detail` 是弹窗里展示的完整长评，不写则弹窗显示 `shortReview`；
- 弃番加 `dropped: true`；补番把 `status` 改成 `'补番'`。

---

## 三、如何替换图片（头像 / 动画封面 / 手作照片）

网站**不依赖外部图床**。没有图片时会自动生成柔和配色的占位封面，不会影响阅读。

- 动画 / 音乐 / 游戏封面：把图片放进 `public/covers/`，然后把对应条目的
  `cover` 字段改成 `'/covers/文件名.jpg'`；
- 手作照片：把图片放进 `public/crafts/`，把 `image` 字段改成
  `'/crafts/文件名.jpg'`；
- 想换 Hero 区的抽象背景：改 `src/components/Hero.tsx` 里的 SVG 装饰
  （这是唯一需要动组件的地方，纯装饰，可整段删掉换成 `<img>`）。

---

## 四、部署（让别人能访问）

### 方式 A：Vercel（推荐，免费且自动更新）

1. 把本项目推送到你自己的 GitHub 仓库（`git init` → 提交 → 关联远程 → 推送）；
2. 到 [vercel.com](https://vercel.com) 用 GitHub 登录，点 **Add New → Project**，选中这个仓库；
3. Vercel 会自动识别 Vite 项目（Build Command: `npm run build`，Output: `dist`），点 Deploy；
4. 之后**每次 push 到 GitHub，Vercel 都会自动重新构建发布**——这就是"持续更新"：
   改 `siteData.ts` → push → 一分钟后线上就是新内容。

### 方式 B：GitHub Pages

1. `npm run build` 得到 `dist/`；
2. 在 `vite.config.ts` 里加 `base: '/仓库名/'`；
3. 用 `gh-pages` 分支或 GitHub Actions 发布 `dist/`
   （可搜索 "Vite GitHub Pages" 官方指南，或让我帮你配好）。

### 更新后重新发布

- Vercel：push 即自动发布，无需其他操作；
- GitHub Pages：重新 build 并推送 `dist/`（或交给 Action 自动跑）。

### 进阶：无代码后台（本次未实现）

如果以后想在网页后台里直接写剧评而不碰代码，可以接入无头 CMS：
**Decap CMS**（搭配 GitHub，免费）、**Notion API**、或 **Sanity**。
思路是把 `siteData.ts` 换成构建时从 CMS 拉取 JSON。需要时随时找我升级。

---

## 五、目录结构

```
portfolio-site/
├── index.html
├── src/
│   ├── data/siteData.ts      # ⭐ 所有内容都在这里改
│   ├── hooks/useTheme.ts     # 深浅色模式
│   ├── index.css             # 配色变量（浅色/深色两套）
│   └── components/           # 页面组件（一般不用动）
│       ├── Navbar.tsx  Hero.tsx  About.tsx  Career.tsx
│       ├── Interests.tsx         # 兴趣角落 Tabs 容器
│       ├── AnimeJournal.tsx      # 动画筛选 + 剧评弹窗
│       ├── MusicNotes.tsx  GameDiary.tsx  CreativeCorner.tsx
│       ├── Contact.tsx  Footer.tsx  CoverArt.tsx
├── public/covers/            # 放封面图
└── public/crafts/            # 放手作照片
```

## 六、隐私说明

- 网站上**没有放手机号和住址**，联系方式以邮箱为主；
- 部署前请确认 `siteData.ts` 里的内容都愿意公开。
