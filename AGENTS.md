# AGENTS.md — Doc

VitePress doc site served at `doc.horatio.cn` — the whole site is the root-level `.md` files; pushing `main` builds via self-hosted Actions and rsyncs `dist/` to the live site root (a doc edit deploys immediately).

## Precedence

Nearest `AGENTS.md` wins over the global file; an explicit user instruction wins over both. When docs and code disagree, follow the existing code and report the inconsistency. Global rules live in `~/.config/opencode/AGENTS.md` (do not restate them here).

## Commands

| Purpose | Command (from CI/package.json) |
| --- | --- |
| Install dependencies | `npm install` |
| Local preview | `npm run dev` |
| Build / verification | `npm run build` → `dist/`; CI check = `dist/index.html` exists |
| Single test / lint | none — `npm run build` is the only gate |
| `npm run count` | broken — `scripts/count.ts` does not exist; don't run it |

Required before finishing: `npm run build` exits 0 and `dist/index.html` exists. If a dependency error appears, run `npm install` first (local `node_modules`/lockfile can lag `package-lock.json`).

## Boundaries

**Always**
- Adding or removing a page → update the `sidebar` in `.vitepress/config.ts` in the same change (nav only has the home link); a page not in the sidebar is unreachable.
- Editing legal text → update that page's `**生效日期：**` line; privacy/terms must match the products' real data behavior (covers the two diary apps and QIQI Island — change both sides together).
- API error sections: curl the real status codes/bodies first; never copy old behavior.

**Ask first**
- Editing `.github/workflows/deploy.yml`, the `vite.build` config, or bumping vitepress/vite a major version; re-adding on-site search (currently off for deterministic builds).
- Large changes to the fixed section structure of `tool/*.md` API pages — follow an existing page before adding one.

**Never**
- Hand-edit or commit `dist/`, or set `emptyOutDir` back to `true` (breaks mtime stability); `srcExclude: ['AGENTS.md']` keeps this file off the site.
- Re-add a `search` config; add panel-managed files (`.user.ini`, `.htaccess`, `.well-known/`) to the repo.

## Pointers

- Nav/sidebar/outDir: `.vitepress/config.ts`; deploy semantics and exclusions: `ci/deploy-managed.sh`, `ci/deploy-exclude.txt`.
- Legal pages: `privacy.md`, `terms.md`; API docs pattern: `tool/*.md`.
- Actor for data-collection cross-check: `/www/project/QIQI_ISLAND_E-PASSPORT`.
