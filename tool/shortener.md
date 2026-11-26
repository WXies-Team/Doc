---
outline: deep
---

# 短链服务

为 [tio.fyi](https://tio.fyi) 短链系统提供 REST 接口：创建、查看、编辑、删除短链，并支持密钥管理。

## 接口信息

| 项目 | 说明 |
| --- | --- |
| 接口地址 | `https://tio.fyi/api/v1` |
| 请求方法 | `GET` / `POST` / `PATCH` / `DELETE`，见各接口 |
| 返回格式 | `JSON`（UTF-8） |
| 鉴权方式 | `Authorization: Bearer <API密钥>`，见下方「鉴权」 |
| 调用对象 | 本人名下短链；通过密钥调用时，创建与编辑仅限**链接（url）类型**，文本/Markdown 只能网页端维护 |
| 管理页面 | `https://tio.fyi/`（登录后管理短链） |

:::warning 旧接口已下线
`https://tio.fyi/api.php?action=...` 返回 HTTP `410`，请迁移到本页的 `/api/v1` 接口。
短链本身不受影响：`https://tio.fyi/{code}` 仍然照常跳转。
:::

## 鉴权

每个用户拥有唯一 API 密钥，**一把密钥对应一个用户**，仅可操作该用户名下的短链。

密钥为 64 位十六进制串（32 字节随机生成），首次访问短链管理页时自动生成。

**四种携带方式（任选其一）：**

| 方式 | 说明 |
| --- | --- |
| `Authorization: Bearer <密钥>` | 首选 |
| `X-API-Key: <密钥>` | 部分 Nginx 配置会丢弃 `Authorization` 头时使用 |
| `?api_key=<密钥>` | 无法设置请求头的环境（如纯 GET 链接） |
| JSON body 中的 `api_key` 字段 | 只想用一个 body 携带全部参数时 |

会话登录态优先：浏览器带着登录 Cookie 请求接口时，按登录用户处理，不读密钥。会话态的写操作需要携带 `X-CSRF-Token`（来自管理页 `<meta name="csrf-token">`）；密钥调用不需要。

> 网页登录（2026-11 起）为统一授权登录：跳转 auth.horatio.cn（OAuth2 授权码 + PKCE）完成
> 登录后回到本页建立会话，本地不再保存密码；API 密钥的生成、携带与校验方式均不变。

**获取密钥：**登录 [短链管理](https://tio.fyi/) → 左侧「API 密钥」卡片 → 复制密钥。
**重置密钥：**同一卡片的「重置密钥」按钮（红色）。重置后旧密钥**立即失效**，需重新同步配置。

:::warning 密钥安全
密钥等同于你的账号凭据，请勿提交到公开仓库或写在前端代码中。
:::

## 短链对象

所有返回短链的接口都使用同一形态：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | int | 短链 ID（编辑、删除用） |
| `code` | string | 短链代码，统一小写 |
| `url` | string | 目标链接；文本/Markdown 类型时为内容本身 |
| `type` | string | `url` / `text` / `markdown` |
| `wechat_allowed` | int | `1` 允许微信内打开，`0` 禁止 |
| `expires_at` | string\|null | 过期时间 `Y-m-d H:i:s`，`null` 永不过期 |
| `max_clicks` | int\|null | 访问次数上限，`null` 不限 |
| `clicks` | int | 已访问次数 |
| `created_at` | string | 创建时间 |
| `short_url` | string | 完整短链，如 `https://tio.fyi/Kzufb6` |

## 接口

### 创建短链

`POST /api/v1/links`

| 参数 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `url` | string | 是 | — | 目标链接。含中文或敏感关键词时建议改用 `url_b64` |
| `url_b64` | string | 否 | — | `url` 的 UTF-8 base64，与 `url` 二选一，优先使用 |
| `code` | string | 否 | 自动生成 6 位 | 短链代码，`a-zA-Z0-9`，长度 1–32，入库统一转小写 |
| `wechat_allowed` | int | 否 | `1` | `1` 允许微信内打开，`0` 禁止 |
| `expire_days` | int | 否 | `0` | 有效天数：`0` 永不过期 |
| `max_clicks` | int | 否 | 不限 | 访问次数上限，`0` 或空视为不限 |
| `type` | string | 否 | `url` | **密钥调用仅支持 `url`**；`text` / `markdown` 只能网页端创建 |

成功返回 `201 Created`、`Location: /api/v1/links/{id}` 与短链对象。自动生成代码命中冲突时会自动换码重试，不会覆盖任何已有短链。

### 查询列表

`GET /api/v1/links?page=1&per_page=20&search=xxx`

| 参数 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `page` | int | 否 | `1` | 页码 |
| `per_page` | int | 否 | `20` | 每页条数，上限 `100` |
| `search` | string | 否 | — | 按 `code` 或 `url` 模糊匹配 |

返回 `{ "data": [...], "page": 1, "per_page": 20, "total": 2, "pages": 1 }`，仅包含本人短链。

### 统计总览

`GET /api/v1/stats` 返回本人短链的汇总数据：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `links` | int | 短链总数 |
| `clicks` | int | 累计点击 |
| `new7d` | int | 近 7 天新增 |
| `expiring7d` | int | 未来 7 天内到期（未过期） |

### 查询单条

`GET /api/v1/links/{id}` → 短链对象。

### 编辑短链

`PATCH /api/v1/links/{id}`

只传需要修改的字段，未传的保持不变：

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `code` | string | 新短链代码（同样受格式、保留字、占用校验） |
| `url` / `url_b64` | string | 新目标地址（同创建规则） |
| `wechat_allowed` | int | 仅链接类型有效；文本/Markdown 强制为 `1` |
| `expire_days` | int | `0` = 清除过期；不传 = 保持原值 |
| `max_clicks` | int | 空/`0` = 取消上限；不传 = 保持原值 |

`type` 不可修改，如需改为文本/Markdown 请重新创建。

### 删除短链

`DELETE /api/v1/links/{id}` → `204 No Content`。删除后该短链立即失效，代码可被重新创建。

### 重置 API 密钥

`POST /api/v1/api-key/reset` → `{ "api_key": "..." }`。**仅网页登录态可用**，防止密钥被盗后远程轮换锁死账号。

## 短链代码规则

- 只允许 `a-z` / `A-Z` / `0-9`，长度 1–32；入库与返回统一小写（历史大写代码仍可访问，数据库排序规则不区分大小写）。
- **全站唯一，先到先得**：已被占用的代码（包括自己创建的）在创建时返回 `409 code_taken`。本服务**不提供覆盖**；要换目标链接请对原 ID 发 `PATCH`，要换代码也通过 `PATCH`。
- **保留字**：`api`、`login`、`logout`、`oauth`、`resource`、`assets`、`admin`、`app`、`config`、`script`、`public`、`favicon`、`robots` 不可使用，返回 `409 code_reserved`。

## 目标链接校验规则

`url` / `url_b64` 解码后的内容需同时满足以下条件，否则返回 `422 invalid_url`：

- 长度 ≤ 4096 字节，且不含换行符
- 带协议头，形如 `scheme://...`：`http`/`https` 之外也允许 `clash://`、`tg://`、`bilibili://`、`weixin://` 等自定义应用协议
- 禁止 `javascript:`、`vbscript:`、`data:` 等危险伪协议
- 不能指向本站任意域名（`tio.fyi`、`www.tio.fyi`、`url.horatio.cn`、`url.wxies.cn`），避免自环
- 中文与复杂查询参数可正常传入；命中 WAF 误拦截时改用 `url_b64`

## 跳转行为

- 正常跳转：`302 Found`，不强缓存，编辑后立即生效。
- 过期或次数达上限：返回 `410 Gone`「链接已过期」。次数上限在服务端原子扣减，不会超发。
- 禁止微信且来自微信内置浏览器：返回微信拦截页，不跳转。
- 文本/Markdown：直接返回内容页（同样计入点击数、受过期与次数上限约束）。

## 调用示例

### 创建短链（不指定代码）

```bash
curl -X POST 'https://tio.fyi/api/v1/links' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer 你的API密钥' \
  -d '{"url":"https://example.com/hello"}'
```

```json
{
  "id": 12,
  "code": "Kzufb6",
  "url": "https://example.com/hello",
  "type": "url",
  "wechat_allowed": 1,
  "expires_at": null,
  "max_clicks": null,
  "clicks": 0,
  "created_at": "2026-11-26 17:30:00",
  "short_url": "https://tio.fyi/Kzufb6"
}
```

### 指定代码 + 完整参数

```bash
curl -X POST 'https://tio.fyi/api/v1/links' \
  -H 'Content-Type: application/json' \
  -H 'X-API-Key: 你的API密钥' \
  -d '{
    "url": "https://example.com/sale",
    "code": "sale2026",
    "wechat_allowed": 0,
    "expire_days": 7,
    "max_clicks": 100
  }'
```

### 使用 url_b64 避免误拦截

```python
import base64, json, urllib.request

key = "你的API密钥"
body = {
    "url_b64": base64.b64encode("https://example.com/中文路径?x=1&y=2".encode()).decode(),
    "code": "cnlink",
}
req = urllib.request.Request(
    "https://tio.fyi/api/v1/links",
    data=json.dumps(body).encode(),
    headers={"Content-Type": "application/json", "Authorization": f"Bearer {key}"},
)
print(json.load(urllib.request.urlopen(req)))
```

### 查询、编辑、删除

```bash
curl 'https://tio.fyi/api/v1/links?search=sale&page=1' \
  -H 'Authorization: Bearer 你的API密钥'

curl -X PATCH 'https://tio.fyi/api/v1/links/13' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer 你的API密钥' \
  -d '{"url":"https://example.com/v3","expire_days":0,"max_clicks":""}'

curl -X DELETE 'https://tio.fyi/api/v1/links/13' \
  -H 'Authorization: Bearer 你的API密钥'
```

## 错误处理

失败时返回非 2xx 状态码与统一错误体：

```json
{ "error": { "code": "code_taken", "message": "该短链代码已被占用" } }
```

| HTTP 状态码 | `error.code` | 说明 |
| --- | --- | --- |
| `400` | `empty_content` | `url` / `url_b64` 为空 |
| `401` | `unauthorized` | 密钥缺失、错误或过期 |
| `403` | `csrf_invalid` / `session_required` | 会话写操作缺少 CSRF；密钥调用了仅会话接口 |
| `404` | `not_found` | 短链不存在或不属于当前用户（不区分两者，避免枚举） |
| `405` | `method_not_allowed` | 路径存在但不支持该请求方法 |
| `409` | `code_taken` / `code_reserved` | 代码已被占用 / 命中保留字 |
| `410` | `api_moved` | 调用了已下线的旧 `api.php` |
| `422` | `invalid_url` / `invalid_code` / `type_not_supported` | 目标链接非法 / 代码格式非法 / 密钥调用非链接类型 |
| `500` | `server_error` | 数据库或服务器异常 |

WAF 拦截会直接返回 HTML 拦截页（`403`），不会进入应用；改用 `url_b64` 或调整目标地址后重试。

:::tip 问题反馈
遇到问题请前往 [GitHub Issues](https://github.com/WXies-Team/Doc/issues) 提问
:::
