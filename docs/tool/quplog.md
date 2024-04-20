# 生成 QQ 更新日志

:::tip 遇到了问题？
该工具为TG@ [QQ/TIM For Update Log](https://t.me/qq_updatelog)生成更新日志，目前仅支持生成日期码格式链接
:::

- 接口地址：https://api.wxies.cn/tool/quplog.php
- 返回格式：跳转图片链接
- 请求方法：POST
- 调用参数：

| 参数代码 | 参数含义 | 参数值 | 默认值 | 是否必要 |
| --- | --- | --- | --- | --- |
| win | Winodws 大版本号 | - | 9.9.9 | 否 |
| linux | Linux 大版本号 | - | 3.2.7 | 否 |
| macos | macOS 大版本号 | - | 6.9.32 | 否 |
| vcode | 小版本号 | - | - | 是 |
| fcode | 日期码 | yymmdd | - | 是 |
| pnum | 发版次数 | - | 01 | 是 |
| log | 更新日志 | - | - | 是 |
| blink | 备份链接初始数字 | 不输入删除备份段 | - | 否 |

:::tip 提示
也可直接前往该[网页](https://horatio.cn/quplog.html)生成
:::