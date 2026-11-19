# AGENTS.md — Doc

VitePress doc site served at `doc.horatio.cn` — the whole site is the root-level `.md` files; pushing `main` builds via self-hosted Actions and rsyncs `dist/` to the live site root (a doc edit deploys immediately).

## Commands

| Purpose | Command |
| --- | --- |
| Install dependencies | `npm install` |
| Local preview | `npm run dev` |
| Build / verification | `npm run build` → `dist/`; CI check = `dist/index.html` exists |
| Single test / lint | none — `npm run build` is the only gate |
| `npm run count` | broken — `scripts/count.ts` does not exist |

Before finishing: `npm run build` exits 0 and `dist/index.html` exists. On a dependency error run `npm install` first (local `node_modules`/lockfile can lag `package-lock.json`).

## Context loading

| Task | Read |
| --- | --- |
| Nav/sidebar/outDir/`srcExclude`/`emptyOutDir` | `.vitepress/config.ts` |
| Deploy semantics and exclusions | `ci/deploy-managed.sh`, `ci/deploy-exclude.txt` |
| Legal pages | `privacy.md`, `terms.md` |
| API docs pattern | `tool/*.md` |
| Global rules | `~/.config/opencode/AGENTS.md` |

## Boundaries

### Always
- Adding or removing a page → update the `sidebar` in `.vitepress/config.ts` in the same change (nav only has the home link); a page not in the sidebar is unreachable.
- Editing legal text → update that page's `**生效日期：**` line; privacy/terms must match real product behavior (two diaries, auth, Qiqi Island, tio.fyi) — change both sides together.
- API error sections: curl the real status codes/bodies first.

### Ask first
- Editing `.github/workflows/deploy.yml` or the `vite.build` config, or bumping vitepress/vite a major version; re-adding on-site search (off for deterministic builds).
- Large changes to the fixed section structure of `tool/*.md` pages — follow an existing page first.

### Never
- Hand-edit or commit `dist/` — edit `.md` only; set `emptyOutDir` back to `true` — keep `false` for mtime stability.
- Re-add a `search` config.
- Add panel-managed files (`.user.ini`, `.htaccess`, `.well-known/`) to the repo — they are rsync-excluded.

## Output

Chinese, lead with the conclusion. Keep instruction files in English.
