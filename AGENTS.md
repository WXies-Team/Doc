# AGENTS.md

WXies Team doc site (VitePress): the whole site is the `.md` files at the repo root; pushing `main` builds via self-hosted Actions and rsyncs to the live `doc.horatio.cn`.

## Commands

- Install dependencies: `npm install`
- Local preview: `npm run dev`
- Build: `npm run build` → output in `dist/` (gitignored, never committed)
- **`npm run count` is broken**: `scripts/count.ts` doesn't exist — don't run it
- No lint / test; verification = build exits 0 and `dist/index.html` exists (same check as CI)

## Boundaries

**Always**
- Adding / removing a page → update the `sidebar` in `.vitepress/config.ts` in the same change (nav only has the home item); a page not in the sidebar is unreachable
- Editing legal text → update that page's `**生效日期：**` line in the same change
- **The privacy policy / ToS tables about data Qiqi Island collects must match that project's actual fields**: when the upstream repo `/www/project/QIQI_ISLAND_E-PASSPORT` changes a collected field, change it here too (and vice versa) — deliver both sides together

**Ask first**
- Editing `.github/workflows/deploy.yml` (rsync semantics, `paths-ignore`, concurrency)
- Major version bumps of vitepress / vite, or re-adding on-site search
- Changing the `vite.build` config in `.vitepress/config.ts`

**Never**
- Hand-editing or committing `dist/` (build output; with `emptyOutDir: false` it keeps stale hashed files — that's normal)
- Setting `emptyOutDir` back to `true` (breaks output mtime stability)

## Conventions

- All content sits at the root: `index.md` home, `terms.md` ToS, `privacy.md` privacy policy, `tool/*.md` API docs
- In-site links use root-absolute paths (`/privacy`); external links are https or protocol-relative
- Commits use a `docs:` prefix with a Chinese description (`docs` never enters the Release Log)
- Legal docs state what is collected, what it's used for, how long it's kept — worded to match the live product's real behavior, no implementation detail (archive directories, internal key names, etc.)

### Fixed structure for API pages (pages under `tool/`; follow this order when adding/changing; the `tool/index.md` index page uses only items 6 and 7)

1. `# 接口名` (interface name) + a one-sentence description
2. `## 接口信息`: a two-column `| 项目 | 说明 |` table with a fixed row order — endpoint / request method / response format / auth method (write it even when none is required), with extra business rows (e.g. 「调用对象」) last; nothing between the table and `## 鉴权`
3. `## 鉴权`: only for interfaces that need auth
4. `## 调用参数`: the fixed five columns `参数 | 类型 | 必填 | 默认值 | 说明`, with `是`/`否` for required (never ✅) and `—` when there's no default. **Discrete enums** with >3 values get their own `##` section (e.g. 「可用分辨率」), ≤3 fold into the 「说明」 column; **continuous ranges** (e.g. `day` `-1`~`7`) go in a `:::tip`, no separate section; the 「操作一览」 table of multi-action interfaces has the fixed columns `action | 方法 | 必填参数 | 说明`, not the five-column layout
5. `## 调用示例`: a `###` scenario name + one sentence; use tags as content needs, but **when present** the order is fixed — `**请求：**` (bash/python code fence) or `**请求链接：**` (bare URL, `text` fence) → `**HTML 调用：**` (`html` fence) → `**显示效果：**` (inline `<img>`) → `**返回示例：**` (`json` fence)
6. `## 错误处理`: a two-column `| HTTP 状态码 | 说明 |` table, status codes in backticks; interfaces that return business errors over HTTP 200 (e.g. the shortener) add a `message` column (on the index page this section nests under 「使用说明」 as `###`)
7. Fixed order of trailing containers: `:::warning 版权声明` → `:::tip 问题反馈`; the copyright block is only for interfaces whose code comes from the internet, self-built interfaces (e.g. the shortener service) only get the feedback block

**Before writing an error section, curl the real status codes and response bodies — never copy the old behavior**: the 2026-10-12 site-wide normalization found "QQ avatar returns the default avatar on invalid params" was wrong (actually a `400` JSON) by testing — success is a `302` redirect.

## Known pitfalls

- Push `main` = straight to production; never push half-done work — if you got it wrong, revert first, then push
- `paths-ignore: .github/**` — changing only CI config does **not** trigger a deploy; use workflow_dispatch to deploy manually
- On-site search is off (traded for deterministic builds, vitepress issue #4246); after upgrading vitepress don't re-add the `search` config
- CI runs `rsync -a -c --no-times --delete`: files whose content didn't change keep their mtime on the server (preserving Last-Modified) — don't add "touch everything" tricks to the workflow
- Local `node_modules` and the lockfile may lag `package-lock.json`; on a dependency error during build, run `npm install` before judging anything
