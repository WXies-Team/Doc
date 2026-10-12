---
outline: deep
---

# 获取 QQ 群头像

通过 QQ 群号获取群头像。

## 接口信息

| 项目 | 说明 |
| --- | --- |
| 接口地址 | `https://api.horatio.cn/avatar/qqg.php` |
| 请求方法 | `GET` |
| 返回格式 | `302` 重定向到群头像图片地址 |
| 鉴权方式 | 无需鉴权 |

## 调用参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `qqg` | string | 是 | — | QQ 群号，5–12 位数字。示例：`746950948` |
| `s` | string | 否 | `3` | 头像尺寸，取值 `1` = 40×40、`2` = 100×100、`3` = 640×640；其他值按 `3` 处理 |

## 调用示例

### 基础调用

**请求链接：**

```text
https://api.horatio.cn/avatar/qqg.php?qqg=746950948
```

**HTML 调用：**

```html
<img src="https://api.horatio.cn/avatar/qqg.php?qqg=746950948" />
```

**显示效果：**

<img src="https://api.horatio.cn/avatar/qqg.php?qqg=746950948" />

### 指定尺寸

获取 100×100 中头像：

**请求链接：**

```text
https://api.horatio.cn/avatar/qqg.php?qqg=746950948&s=2
```

## 错误处理

| HTTP 状态码 | 说明 |
| --- | --- |
| `302` | 成功，重定向到群头像图片地址 |
| `400` | 群号缺失或不是 5–12 位数字，返回 `{"code":400,"message":"请在 URL 中提供有效的 QQ 群号 (5-12位数字)","data":null}` |

:::warning 版权声明
部分代码来自互联网，如有侵权请前往 [GitHub Issues](https://github.com/WXies-Team/Doc/issues) 要求删除
:::

:::tip 问题反馈
遇到问题请前往 [GitHub Issues](https://github.com/WXies-Team/Doc/issues) 提问
:::
