# 必应每日壁纸

:::warning 警告
部分代码来自互联网，如有侵权请前往[GitHub Issues](https://github.com/WXies-Team/Doc/issues)要求删除
:::

- 接口地址：https://api.wxies.cn/rpicgs/bing.php
- 返回格式：跳转图片链接
- 请求方法：GET
- 调用参数：

| 参数代码 | 参数含义 | 参数值 | 默认值 | 是否必要 |
| --- | --- | --- | --- | --- |
| rand | 是否随机显示最近8天内的图片 | true, false | false | 否 |
| day | 显示指定日期的图片 | -1，0，1，2，3，4，5，6，7(0为今天，-1为昨天) | 0 | 否 |
| size | 指定获取图片大小 | 指定获取图片大小 | 1920×1080 | 否 |
| info | 获取图片基础信息（json格式） | true, false | false | 否 |

- 可用分辨率：
1920×1080
1366×768
1280×768
1024×768
800×600
800×480
768×1280
720×1280
640×480
480×800
400×240
320×240
240×320

:::tip 提示
中间的x为英文字母x
:::

- 调用示例：
  - 默认调用：

:::tip 提示
不带任何参数调用，显示必应当天图片
:::

调用链接：

```html
<img src="https://api.wxies.cn/rpicgs/bing.php"/>
```

显示效果
<img src="https://api.wxies.cn/rpicgs/bing.php"/>

  - Info调用：

调用链接：

```html
https://api.wxies.cn/rpicgs/bing.php?info=true
```

返回值：

```json
{
title:Elephant hawk-moth on foxglove flower (© David Chapman/Alamy),url:https://www.bing.com/th?id=OHR.FoxgloveHawkmoth_EN-US4340017481_1920x1080.jpg,link:https://www.bing.com/search?q=elephant+hawk+moth&form=hpcapt&filters=HpDate%3a%2220220723_0700%22,time:20220723
}
```

- 随机调用：

:::tip 提示
刷新本页，图片随机显示
:::

调用链接：

```html
<img src="https://api.wxies.cn/rpicgs/bing.php?rand=true"/>
```

显示效果

<img src="https://api.wxies.cn/rpicgs/bing.php?rand=true">