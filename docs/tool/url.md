# 唯蟹短链API

:::warning 警告
接口已废弃
:::

- 接口地址：https://go.443.fyi/api/url
- 返回格式：json, xml
- 请求方法：POST & GET
- 调用参数：

| 参数代码 | 参数含义 |
| --- | --- |
| url | 原网址 (GET方式请先将原网址进行URL编码)(10~255) |
| short | 自定义短网址 (4~10) |
| enhtml | 返回方式 (可选json、xml,默认为json) |

- 调用示例：
  - 默认调用：

?> 不带任何参数调用,随机生成短链

调用链接：

```html
https://go.443.fyi/api/url?url=https://443.fyi
```

返回值
```html
{
    "html": 0,
    "msg": "success",
    "url": "https://go.443.fyi/OGiQq"
}
```

  - 指定调用：

?> 指定生成短链

调用链接：

```html
https://go.443.fyi/api/url?url=https://443.fyi&short=114514
```

json
```html
{
    "html": 0,
    "msg": "success",
    "url": "https://go.443.fyi/114514"
}
```