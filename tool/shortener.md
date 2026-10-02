---
outline: deep
---

# 短链服务

为 [tio.fyi](https://tio.fyi) 短链系统提供 JSON 接口：创建、查看、编辑、删除短链，并支持密钥管理。

## 接口信息

| 项目 | 说明 |
| --- | --- |
| 接口地址 | `https://tio.fyi/api.php` |
| 请求方法 | POST（推荐，携带 JSON body）或 GET（只读操作） |
| 返回格式 | JSON（UTF-8） |
| 鉴权方式 | `Authorization: Bearer <API密钥>` |
| 调用对象 | 链接（url）类型短链 |

:::tip 一句话速用
唯一必填参数是 `url`（长链），其余全部可省略——省略 `code` 自动生成、省略 `wechat_allowed` 视为允许微信、省略 `expire_days` 视为永不过期、省略 `max_clicks` 视为无次数上限。
:::

## 鉴权

每个用户拥有唯一 API 密钥，**一把密钥对应一个用户**，仅可操作该用户名下的短链。

**三种携带方式（任选其一）：**

| 方式 | 说明 |
| --- | --- |
| `Authorization: Bearer <密钥>` | 首选 |
| `X-API-Key: <密钥>` | 部分 Nginx 配置会丢弃 `Authorization` 头时使用 |
| `?api_key=<密钥>` | 无法设置请求头的环境（如纯 GET 链接） |

**获取密钥：**登录 [短链管理](https://tio.fyi/url.php) → 短链列表底部「API 密钥」→ 复制密钥。
**重置密钥：**同一位置的「重置密钥」按钮（红色）。重置后旧密钥**立即失效**，需重新同步配置。

:::warning 密钥安全
密钥等同于你的账号凭据，请勿提交到公开仓库或写在前端代码中。
:::

## 调用参数

### create — 创建短链

| 参数 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | :---: | --- | --- |
| `action` | string | ✅ | — | 固定 `create` |
| `url` | string | ✅ | — | 长链（目标地址）。含中文或敏感关键词时建议改用 `url_b64` |
| `url_b64` | string | — | — | `url` 的 UTF-8 base64，与 `url` 二选一，优先使用 |
| `code` | string | — | 自动生成 6 位 | 短链代码，`a-zA-Z0-9`，长度 1–32 |
| `wechat_allowed` | int | — | `1` | `1` 允许微信内打开，`0` 禁止 |
| `expire_days` | int | — | `0` | 有效天数：`0` 永不过期 |
| `max_clicks` | int | — | 不限 | 访问次数上限，`0` 或空视为不限 |
| `overwrite` | int | — | **API: `1` / 网页: `0`** | 短链已存在且属于同一用户时是否覆盖 |
| `type` | string | — | `url` | **仅支持 `url`**，传 `text`/`markdown` 会报错 |

### update — 编辑短链

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | :---: | --- |
| `action` | string | ✅ | 固定 `update` |
| `id` | int | ✅ | 短链 ID |
| `code` | string | ✅ | 短链代码 |
| `url` | string | ✅ | 目标地址（同 `url_b64` 规则） |
| `wechat_allowed` | int | — | 省略则不改动 |
| `expire_days` | int | — | **省略 = 保持原过期时间**；`0` = 清除过期 |
| `max_clicks` | int | — | **省略 = 保持原上限**；空/`0` = 取消上限 |

:::tip 编辑限制
接口不支持修改 `type`（与网页端一致），如需改为文本/Markdown 请重新创建。
:::

### 其他操作

| `action` | 方法 | 必填参数 | 说明 |
| --- | --- | --- | --- |
| `list` | GET | `search`、`page`（可选） | 分页 20 条/页，仅返回本人短链 |
| `delete` | POST | `id` | 删除短链 |
| `update_wechat` | POST | `id`、`wechat_allowed` | 单独切换微信可开状态 |
| `reset_api_key` | POST | — | 重置密钥；**仅网页登录态可用**，防止密钥被盗后远程轮换锁死账号 |

## 覆盖规则

短链代码全站唯一，创建时按归属与 `overwrite` 决定行为：

| 短链归属 | `overwrite` | 结果 |
| --- | --- | --- |
| 不存在 | — | 正常创建，`code` 自动生成或使用传入值 |
| **他人**（或无归属） | 任意 | ❌ `该短链代码已被其他用户占用` |
| **本人** | `1` | ✅ **删旧插新**：删除原记录并重新插入，`id` 变更、点击数与创建时间重置，返回 `overwritten: true` |
| **本人** | `0` | 返回 `needs_overwrite: true`，由调用方确认后带 `overwrite: 1` 重发 |

:::tip 网页与接口的差别
网页端默认 `overwrite=0`（弹窗让你确认后再覆盖），接口默认 `overwrite=1`（直接覆盖，不打断自动化流程）。显式传递 `overwrite` 时以传入值为准。
:::

## 调用示例

### 创建短链（不指定代码）

```bash
curl -X POST 'https://tio.fyi/api.php?action=create' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer 你的API密钥' \
  -d '{"url":"https://example.com/hello"}'
```

**返回示例：**

```json
{
  "success": true,
  "id": 12,
  "code": "Kzufb6",
  "url": "https://example.com/hello",
  "type": "url",
  "wechat_allowed": 1,
  "expires_at": null,
  "max_clicks": null,
  "overwritten": false,
  "short_url": "https://tio.fyi/Kzufb6"
}
```

### 指定短链代码 + 完整参数

```bash
curl -X POST 'https://tio.fyi/api.php?action=create' \
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
    "https://tio.fyi/api.php?action=create",
    data=json.dumps(body).encode(),
    headers={"Content-Type": "application/json", "Authorization": f"Bearer {key}"},
)
print(json.load(urllib.request.urlopen(req)))
```

### 覆盖已存在的同名短链

```bash
# 第一次：code 已存在且属于你，返回 needs_overwrite
curl -X POST 'https://tio.fyi/api.php?action=create' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer 你的API密钥' \
  -d '{"url":"https://example.com/v2","code":"sale2026"}'

# 返回
# {"success":false,"needs_overwrite":true,"message":"该短链代码已存在，是否覆盖原内容？"}

# 第二次：带 overwrite=1 确认覆盖
curl -X POST 'https://tio.fyi/api.php?action=create' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer 你的API密钥' \
  -d '{"url":"https://example.com/v2","code":"sale2026","overwrite":1}'
```

### 查询短链列表

```bash
curl 'https://tio.fyi/api.php?action=list&search=sale&page=1' \
  -H 'Authorization: Bearer 你的API密钥'
```

**返回示例：**

```json
{
  "success": true,
  "data": [
    {
      "id": 13,
      "code": "sale2026",
      "url": "https://example.com/v2",
      "type": "url",
      "clicks": 4,
      "wechat_allowed": 1,
      "expires_at": "2026-10-10 00:00:00",
      "max_clicks": 100
    }
  ],
  "total": 1,
  "page": 1,
  "pages": 1
}
```

### 编辑短链

```bash
# 传 expire_days=0 清除过期；不传 expire_days 则保持原值
curl -X POST 'https://tio.fyi/api.php?action=update' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer 你的API密钥' \
  -d '{"id":13,"code":"sale2026","url":"https://example.com/v3","expire_days":0,"max_clicks":""}'
```

### 删除短链 / 切换微信

```bash
curl -X POST 'https://tio.fyi/api.php?action=delete' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer 你的API密钥' \
  -d '{"id":13}'

curl -X POST 'https://tio.fyi/api.php?action=update_wechat' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer 你的API密钥' \
  -d '{"id":13,"wechat_allowed":0}'
```

## 错误处理

所有响应均含 `success` 字段，失败时附 `message`；覆盖确认场景额外返回 `needs_overwrite`。

| HTTP | message | 说明 |
| --- | --- | --- |
| 200 | `未授权：请先登录，或提供有效的 API 密钥` | 密钥缺失、错误或过期 |
| 200 | `API 仅支持链接类型，文本与 Markdown 请在网页端创建` | 通过接口创建非链接类型 |
| 200 | `API 仅支持链接类型，请在网页端编辑该内容` | 通过接口编辑文本/Markdown 短链 |
| 200 | `请输入内容` | `url` / `url_b64` 为空 |
| 200 | `请输入有效的链接地址` | 目标地址不符合链接格式 |
| 200 | `短链代码只能包含字母和数字，长度 1-32 位` | `code` 格式非法 |
| 200 | `该短链代码已被其他用户占用` | 短链代码属于他人 |
| 200 | `该短链代码已存在，是否覆盖原内容？` | 返回 `needs_overwrite:true`，需确认后重发 |
| 200 | `该短链代码已被占用` | 编辑时改为已被占用的代码 |
| 200 | `短链不存在` / `无效的ID` | `id` 无权或不存在 |
| 200 | `该操作需在登录后的网页中执行` | 用密钥调用 `reset_api_key` |
| 200 | `无效的操作请求` | `action` 不受支持 |
| 200 | `服务器错误，请稍后再试` | 数据库异常 |

:::tip 状态码说明
业务错误统一返回 HTTP `200` + `"success": false`，请以响应体中的 `success` 判断成败。
:::

:::warning 反馈问题
遇到未列出的错误请前往 [GitHub Issues](https://github.com/WXies-Team/Doc/issues) 提问。
:::
