# AGENTS.md

WXies Team 文档站（VitePress）：全站内容就是仓库根目录的 `.md`，推 `main` 即由 self-hosted Actions 构建并 rsync 到线上 `doc.horatio.cn`。

## 命令

- 安装依赖：`npm install`
- 本地预览：`npm run dev`
- 构建：`npm run build` → 产物在 `dist/`（已 gitignore，不入库）
- **`npm run count` 是坏的**：`scripts/count.ts` 不存在，别跑
- 无 lint / test；验证 = 构建 exit 0 且 `dist/index.html` 存在（CI 同款检查）

## 边界

**总是做**
- 新增 / 删除页面时同步改 `.vitepress/config.ts` 的 `sidebar`（nav 只有首页一项），不进侧边栏 = 页面不可达
- 改协议正文时同步该页的 `**生效日期：**` 行
- **隐私政策 / 用户协议里涉及奇奇岛收集数据的表格，必须与奇奇岛项目实际字段一致**：上游仓库 `/www/project/QIQI_ISLAND_E-PASSPORT` 改了收集字段，这里要跟着改（反之亦然），两边一起交付

**先问**
- 改 `.github/workflows/deploy.yml`（rsync 语义、`paths-ignore`、concurrency）
- 升级 vitepress / vite 大版本，或加回站内搜索
- 改 `.vitepress/config.ts` 的 `vite.build` 配置

**绝不动**
- 手改或提交 `dist/`（构建产物，且因 `emptyOutDir: false` 残留历史 hash 文件，属正常）
- 把 `emptyOutDir` 改回 `true`（会破坏产物 mtime 稳定性）

## 约定

- 内容全在根目录：`index.md` 首页、`terms.md` 用户协议、`privacy.md` 隐私政策、`tool/*.md` API 文档
- 站内链接用根绝对路径（`/privacy`），外部链接 https 或协议相对
- 提交用 `docs:` + 中文描述（`docs` 类型不进 Release Log）
- 协议类文档写「收集什么、干什么用、存多久」，措辞对齐线上产品实际行为，不写实现细节（归档目录、内部 key 名等）

## 已知坑

- push `main` = 直接部署上线，别把半成品推上去；改错了 revert 后再推
- `paths-ignore: .github/**` —— 只改 CI 配置**不会**触发部署，要部署用 `workflow_dispatch` 手动触发
- 站内搜索已关闭（换取确定性构建，vitepress issue #4246），升级 vitepress 后别顺手把 `search` 配置加回来
- CI 用 `rsync -a -c --no-times --delete`：内容没变的文件服务器上 mtime 不动（保住 Last-Modified），别在 workflow 里加「全量 touch」之类
- 本地 `node_modules` 与 lock 可能滞后于 `package-lock.json`，构建报依赖错误先 `npm install` 再判定
