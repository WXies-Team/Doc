---
outline: deep
---

# 必应每日壁纸

获取必应每日壁纸图片。

## 接口信息

| 项目 | 说明 |
| --- | --- |
| 接口地址 | `https://api.horatio.cn/tool/bing.php` |
| 请求方法 | `GET` |
| 返回格式 | `302` 重定向到图片地址；`info=true` 时返回 `200` JSON |
| 鉴权方式 | 无需鉴权 |

## 调用参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `day` | number | 否 | `0` | 指定日期的图片，见下方日期说明 |
| `rand` | boolean | 否 | `false` | 为 `true` 时随机返回最近 8 天内的图片，与 `day` 同传时以随机为准 |
| `size` | string | 否 | `1920x1080` | 图片分辨率，取值见下方「可用分辨率」 |
| `info` | boolean | 否 | `false` | 为 `true` 时返回图片信息 JSON，不返回图片 |

:::tip 日期说明
- `0`：今天
- `-1`：昨天
- `1` ~ `7`：前 2 ~ 8 天
:::

## 可用分辨率

| 分辨率 | 说明 |
| --- | --- |
| `1920x1080` | 全高清（默认） |
| `1366x768` | 高清 |
| `1280x768` | 宽屏 |
| `1024x768` | 标准 |
| `800x600` | 小屏 |
| `800x480` | 手机横屏 |
| `768x1280` | 平板竖屏 |
| `720x1280` | 手机竖屏 |
| `640x480` | 小屏 |
| `480x800` | 手机竖屏 |
| `400x240` | 小屏 |
| `320x240` | 小屏 |
| `240x320` | 小屏竖屏 |

:::tip 分辨率写法
中间的 `x` 为英文字母 `x`，不是乘号；取值不合法时按默认分辨率返回。
:::

## 调用示例

### 基础调用

不带任何参数调用，返回必应当天图片（1920x1080）。

**请求链接：**

```text
https://api.horatio.cn/tool/bing.php
```

**HTML 调用：**

```html
<img src="https://api.horatio.cn/tool/bing.php" />
```

**显示效果：**

<img src="https://api.horatio.cn/tool/bing.php" />

### 指定日期

获取昨天的图片：

**请求链接：**

```text
https://api.horatio.cn/tool/bing.php?day=-1
```

### 指定分辨率

获取 1366x768 分辨率的图片：

**请求链接：**

```text
https://api.horatio.cn/tool/bing.php?size=1366x768
```

### 随机图片

随机返回最近 8 天内的图片：

**请求链接：**

```text
https://api.horatio.cn/tool/bing.php?rand=true
```

**HTML 调用：**

```html
<img src="https://api.horatio.cn/tool/bing.php?rand=true" />
```

**显示效果：**

<img src="https://api.horatio.cn/tool/bing.php?rand=true" />

### 获取图片信息

返回图片的详细信息（JSON）：

**请求链接：**

```text
https://api.horatio.cn/tool/bing.php?info=true
```

**返回示例：**

```json
{
  "code": 200,
  "message": "success",
  "title": "曼布尔斯码头，斯旺西，威尔士 (© Helen Hotson/Shutterstock)",
  "url": "https://www.bing.com/th?id=OHR.MumblesSwansea2026_ZH-CN5419531039_1920x1080.jpg",
  "link": "https://www.bing.com/search?q=%E5%A8%81%E5%B0%94%E5%A3%AB%E6%9B%BC%E5%B8%83%E5%B0%94%E6%96%AF%E7%A0%81%E5%A4%B4&form=hpcapt&mkt=zh-cn",
  "time": "20261011",
  "data": {
    "title": "曼布尔斯码头，斯旺西，威尔士 (© Helen Hotson/Shutterstock)",
    "url": "https://www.bing.com/th?id=OHR.MumblesSwansea2026_ZH-CN5419531039_1920x1080.jpg",
    "link": "https://www.bing.com/search?q=%E5%A8%81%E5%B0%94%E5%A3%AB%E6%9B%BC%E5%B8%83%E5%B0%94%E6%96%AF%E7%A0%81%E5%A4%B4&form=hpcapt&mkt=zh-cn",
    "time": "20261011"
  }
}
```

顶层的 `title`、`url`、`link`、`time` 与 `data` 内的字段内容一致，取其一即可。

### 组合参数

多个参数可用 `&` 连接：

**请求链接：**

```text
https://api.horatio.cn/tool/bing.php?day=-1&size=1366x768
```

## 错误处理

| HTTP 状态码 | 说明 |
| --- | --- |
| `302` | 成功，重定向到图片地址；参数缺失或取值非法时返回当天默认图（默认分辨率） |
| `200` | `info=true` 时返回图片信息 JSON |

:::warning 版权声明
部分代码来自互联网，如有侵权请前往 [GitHub Issues](https://github.com/WXies-Team/Doc/issues) 要求删除
:::

:::tip 问题反馈
遇到问题请前往 [GitHub Issues](https://github.com/WXies-Team/Doc/issues) 提问
:::
