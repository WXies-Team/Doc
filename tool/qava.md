---
outline: deep
---

# 获取 QQ 头像

通过 QQ 号获取用户头像。

## 接口信息

| 项目 | 说明 |
| --- | --- |
| 接口地址 | `https://api.horatio.cn/avatar/qq.php` |
| 返回格式 | 跳转图片链接 |
| 请求方法 | GET |

## 调用参数

| 参数 | 说明 | 类型 | 必填 | 示例 |
| --- | --- | --- | --- | --- |
| qq | 需要获取头像的 QQ 号 | string | 是 | `1115058004` |

## 调用示例

### 基础调用

**请求链接：**

```
https://api.horatio.cn/avatar/qq.php?qq=1115058004
```

**HTML 调用：**

```html
<img src="https://api.horatio.cn/avatar/qq.php?qq=1115058004" />
```

**显示效果：**

<img src="https://api.horatio.cn/avatar/qq.php?qq=1115058004" />

### 不同尺寸

QQ 头像支持多种尺寸，通过添加 `s` 参数指定：

| 参数值 | 尺寸 | 说明 |
| --- | --- | --- |
| 1 | 40×40 | 小头像 |
| 2 | 100×100 | 中头像 |
| 3 | 640×640 | 大头像 |

**请求示例：**

```
https://api.horatio.cn/avatar/qq.php?qq=1115058004&s=2
```

## 错误处理

- 如果 QQ 号无效，接口会返回默认头像
- 如果参数缺失，接口会返回错误提示

:::warning 版权声明
部分代码来自互联网，如有侵权请前往 [GitHub Issues](https://github.com/WXies-Team/Doc/issues) 要求删除
:::