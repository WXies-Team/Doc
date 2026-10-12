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

### API 页固定结构（tool/ 下接口页，新增/改动照此顺序；`tool/index.md` 目录页只用第 6、7 条）

1. `# 接口名` + 一句话说明
2. `## 接口信息`：`| 项目 | 说明 |` 两列表，行顺序固定——接口地址 / 请求方法 / 返回格式 / 鉴权方式（无需鉴权也写），业务补充行（如「调用对象」）放最后；表后到 `## 鉴权` 之间不插其他内容
3. `## 鉴权`：仅需鉴权的接口写
4. `## 调用参数`：固定五列 `参数 | 类型 | 必填 | 默认值 | 说明`，必填写 `是`/`否`（不用 ✅），无默认填 `—`。**离散枚举** >3 项另开 `##` 章节（如「可用分辨率」）、≤3 项并进「说明」列；**连续取值区间**（如 `day` 的 `-1`~`7`）用 `:::tip` 说明，不另开章节；多 action 接口的「操作一览」表列固定 `action | 方法 | 必填参数 | 说明`，不套五列
5. `## 调用示例`：`###` 场景名 + 说明句；标签按内容需要取用，**出现时**顺序固定——`**请求：**`（bash/python 等代码围栏）或 `**请求链接：**`（纯 URL，`text` 围栏）→ `**HTML 调用：**`（`html` 围栏）→ `**显示效果：**`（内联 `<img>`）→ `**返回示例：**`（`json` 围栏）
6. `## 错误处理`：`| HTTP 状态码 | 说明 |` 两列，每行状态码加反引号；业务错误统一走 HTTP 200 的接口（如短链）额外加 `message` 列（目录页该小节嵌在「使用说明」下，用 `###`）
7. 尾部容器顺序固定：`:::warning 版权声明` → `:::tip 问题反馈`；版权声明只用于代码源自互联网的接口，自研接口（如短链服务）只放问题反馈

**写错误处理前必须 curl 实测状态码与返回体，不照抄旧行为**——2026-10-12 全站规范化时就靠实测发现 QQ 头像「参数非法返回默认头像」是错的（实际 `400` JSON），成功是 `302` 重定向。

## 已知坑

- push `main` = 直接部署上线，别把半成品推上去；改错了 revert 后再推
- `paths-ignore: .github/**` —— 只改 CI 配置**不会**触发部署，要部署用 `workflow_dispatch` 手动触发
- 站内搜索已关闭（换取确定性构建，vitepress issue #4246），升级 vitepress 后别顺手把 `search` 配置加回来
- CI 用 `rsync -a -c --no-times --delete`：内容没变的文件服务器上 mtime 不动（保住 Last-Modified），别在 workflow 里加「全量 touch」之类
- 本地 `node_modules` 与 lock 可能滞后于 `package-lock.json`，构建报依赖错误先 `npm install` 再判定
