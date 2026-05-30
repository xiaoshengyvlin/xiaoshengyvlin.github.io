# 杂鱼の博客

基于 Vue 3 + Vuetify + Vite 的个人主页，macOS 毛玻璃风格，纯静态部署。

## 技术栈

| 依赖 | 版本 |
|------|------|
| Vue | 3.5 |
| Vuetify | 3.7 |
| Vite | 5.4 |
| Chart.js | 4.4 |
| TypeIt | 8.8 |
| Less | 4.2 |
| MDI | 7.4 |

## 功能

- 毛玻璃卡片 + 弹性动画
- 头像悬浮音乐播放器（本地音频）
- 技能雷达图（Chart.js）
- 打字机古诗轮播
- 星环粒子交互动画
- 自定义壁纸（预设 / URL / 本地上传）
- 主题色、亮度、模糊度可调

## 本地运行

```bash
npm install
npm run dev
```

端口 `9527`。

## 修改内容

编辑 `src/config.js`：

- `metaData` — 网页标题、描述
- `welcometitle` — 欢迎语
- `tags` — 个性标签
- `socialPlatformIcons` — 社交链接
- `typeWriterStrings` — 打字机文案
- `polarChart` — 技能图数据
- `music.songs` — 本地音乐
- `projectcards` — 项目卡片

静态资源替换路径：`public/img/`、`public/audio/`。

## 部署

推送到 GitHub，在 Vercel 导入即可。构建命令 `npm run build`，输出目录 `dist`。
