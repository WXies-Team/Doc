---
outline: deep
---

# 必应每日壁纸

获取必应每日壁纸图片。

## 接口信息

| 项目 | 说明 |
| --- | --- |
| 接口地址 | `https://api.horatio.cn/tool/bing.php` |
| 返回格式 | 跳转图片链接 或 JSON |
| 请求方法 | GET |

## 调用参数

| 参数 | 说明 | 类型 | 必填 | 默认值 | 可选值 |
| --- | --- | --- | --- | --- | --- |
| rand | 是否随机显示最近8天内的图片 | boolean | 否 | `false` | `true`, `false` |
| day | 显示指定日期的图片 | number | 否 | `0` | `-1` ~ `7` |
| size | 指定获取图片大小 | string | 否 | `1920x1080` | 见下方分辨率列表 |
| info | 获取图片基础信息（JSON格式） | boolean | 否 | `false` | `true`, `false` |

:::tip 日期说明
- `0`：今天
- `-1`：昨天
- `1` ~ `7`：前2~8天
:::

## 可用分辨率

| 分辨率 | 说明 |
| --- | --- |
| 1920x1080 | 全高清（默认） |
| 1366x768 | 高清 |
| 1280x768 | 宽屏 |
| 1024x768 | 标准 |
| 800x600 | 小屏 |
| 800x480 | 手机横屏 |
| 768x1280 | 平板竖屏 |
| 720x1280 | 手机竖屏 |
| 640x480 | 小屏 |
| 480x800 | 手机竖屏 |
| 400x240 | 小屏 |
| 320x240 | 小屏 |
| 240x320 | 小屏竖屏 |

:::tip 注意
中间的 `x` 为英文字母 `x`，不是乘号
:::

## 调用示例

### 默认调用

不带任何参数调用，显示必应当天图片（1920x1080）。

**请求链接：**

```
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

```
https://api.horatio.cn/tool/bing.php?day=-1
```

### 指定分辨率

获取 1366x768 分辨率的图片：

```
https://api.horatio.cn/tool/bing.php?size=1366x768
```

### 随机图片

随机显示最近8天内的图片：

```
https://api.horatio.cn/tool/bing.php?rand=true
```

**HTML 调用：**

```html
<img src="https://api.horatio.cn/tool/bing.php?rand=true" />
```

**显示效果：**

<img src="https://api.horatio.cn/tool/bing.php?rand=true" />

### 获取图片信息

获取图片的详细信息（JSON格式）：

**请求链接：**

```
https://api.horatio.cn/tool/bing.php?info=true
```

**返回示例：**

```json
{
  "title": "Elephant hawk-moth on foxglove flower (© David Chapman/Alamy)",
  "url": "https://www.bing.com/th?id=OHR.FoxgloveHawkmoth_EN-US4340017481_1920x1080.jpg",
  "link": "https://www.bing.com/search?q=elephant+hawk+moth&form=hpcapt&filters=HpDate%3a%2220220723_0700%22",
  "time": "20220723"
}
```

### 组合参数

可以同时使用多个参数：

```
https://api.horatio.cn/tool/bing.php?day=-1&size=1366x768
```

## 错误处理

- 如果参数值无效，接口会返回默认图片
- 如果日期超出范围，接口会返回今天图片

:::warning 版权声明
部分代码来自互联网，如有侵权请前往 [GitHub Issues](https://github.com/WXies-Team/Doc/issues) 要求删除
:::