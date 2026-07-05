---
outline: deep
---

# API 文档

WXies Team 提供的各种实用工具 API 文档。

## 工具列表

| 工具 | 描述 | 接口地址 |
| --- | --- | --- |
| [获取 QQ 头像](/tool/qava) | 通过 QQ 号获取用户头像 | `https://api.horatio.cn/avatar/qq.php` |
| [获取 QQ 群头像](/tool/qgava) | 通过 QQ 群号获取群头像 | `https://api.horatio.cn/avatar/qqg.php` |
| [必应每日壁纸](/tool/bing) | 获取必应每日壁纸图片 | `https://api.horatio.cn/tool/bing.php` |

## 使用说明

所有工具均通过 API 接口调用，返回格式为图片链接或 JSON 数据。

### 调用方式

- **请求方法**：GET
- **返回格式**：图片链接跳转 或 JSON
- **编码格式**：UTF-8
- **响应时间**：通常 < 500ms

### 错误处理

当请求参数错误时，接口会返回相应的错误信息或默认图片。

| HTTP 状态码 | 说明 |
| --- | --- |
| 200 | 成功 |
| 400 | 请求参数错误 |
| 502 | 服务器内部错误 |

## 更新日志

### 2026-07-05

- 添加 QQ 头像和 QQ 群头像的尺寸参数支持
- 优化必应壁纸接口的参数验证
- 完善 API 文档

## 注意事项

:::warning 版权声明
部分代码来自互联网，如有侵权请前往 [GitHub Issues](https://github.com/WXies-Team/Doc/issues) 要求删除
:::

:::tip 问题反馈
遇到问题请前往 [GitHub Issues](https://github.com/WXies-Team/Doc/issues) 提问
:::