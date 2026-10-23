# yooooooong-bro.github.io

Yibo Sun 的个人主页（GitHub Pages 作业 Part 2，Option A：纯手写 HTML / CSS / JS）。
无框架、无构建步骤，直接双击 `index.html` 即可预览。

## 文件结构

```
yooooooong-bro.github.io/
├── index.html          # 入口页面（所有文案都在这里）
├── css/style.css       # 样式（CSS 变量、栅格、响应式、打印样式）
├── js/main.js          # 交互（移动端菜单、平滑滚动、滚动高亮、项目筛选、复制邮箱）
├── assets/
│   ├── favicon.svg     # 网站图标（矢量）
│   ├── favicon.ico     # 网站图标（传统格式，兜底）
│   └── CV.pdf          # ⚠️ 目前是占位 PDF，换成你的简历
└── README.md
```

## 内容说明

正文已按简历（孙弋博 · AI 数据与评测实习生）填写完毕，全部在 `index.html` 对应 section 里：

- **Hero / About**：AI 数据与评测方向定位 + 实习经历回顾
- **Focus**：数据与编程 / AI 数据与评测 / 分析与表达，三组技能
- **Projects**：AIGC 图像数据与评测（AI）、乐屋 APP 数据整理（Data）、本网站（Web），支持筛选
- **Experience**：两段实习 + 教育背景 + 演讲卓越奖
- **Contact**：GitHub + 学校邮箱

还需要你处理的：

1. **assets/CV.pdf** —— 目前是占位 PDF，用你的真实简历替换同名文件（下载按钮即生效）。
2. **可选：照片** —— 简历 .docx 里内嵌了一张约 2MB 的图片（可能是证件照）。想放到页首头像的话告诉我，我帮你压缩成 `assets/photo.jpg` 并替换字母徽章。
3. **联系信息** —— 公开页面用的是学校邮箱；简历里的手机号 / QQ 邮箱我没有放上去（隐私考虑），需要公开可以告诉我。

## 可选：加照片

当前页首头像是字母徽章（YS）。想换成你的照片：

1. 把照片命名为 `photo.jpg` 放进 `assets/`（建议正方形、不小于 400×400）。
2. 把 `index.html` 里 hero-card 开头的这一行：

   ```html
   <div class="monogram" aria-hidden="true">YS</div>
   ```

   换成：

   ```html
   <img class="monogram" src="assets/photo.jpg" alt="Portrait of Yibo Sun" style="width:64px;height:64px;object-fit:cover;" />
   ```

## 本地预览

- 直接双击 `index.html`；或
- 在项目目录开一个本地服务器（推荐，行为最接近线上）：

  ```sh
  python -m http.server 8000
  # 然后访问 http://localhost:8000
  ```

## 部署到 GitHub Pages（作业步骤）

1. GitHub 右上角 **+ → New repository**，仓库名必须是 **`yooooooong-bro.github.io`**，
   可见性选 **Public**，勾选 **Add a README file**，Create。
2. 仓库页 **Add file → Upload files**，把 `index.html`、`css/`、`js/`、`assets/`、`README.md`
   一起拖进去（GitHub 会保留子目录结构）→ **Commit changes**。
3. **Settings → Pages**，Build and deployment → Source 选 **Deploy from a branch**，
   分支 **main**、目录 **/ (root)** → Save。
4. 等 1–2 分钟，访问 **https://yooooooong-bro.github.io**，刷新页面确认上线。

### 常见问题

- 打开是 404：确认仓库名一字不差、可见性是 **Public**、Pages 分支是 `main` + `/ (root)`。
- 样式没生效：链接区分大小写（`css/style.css` 必须和仓库里的路径一致）。
- 上传时只有一个文件没传上去：重新进 Upload files 把缺的拖进去 Commit 即可。
- ⚠️ 隐私提示：仓库是 Public，`assets/CV.pdf` 会被任何人下载。如果不希望公开完整简历，
  可以只放精简版 CV，或先删除 CV 链接。

## 技术说明

- 字体走 Google Fonts（Instrument Serif / Inter Tight / IBM Plex Mono），断网关掉后自动回退系统字体。
- 全部交互都在 `js/main.js`，无第三方依赖。
- 打印样式（Ctrl+P）会隐藏导航和按钮，适合打印成 PDF 版个人资料。
