# 必应每日壁纸

!> 工具与涉及资源全部来自于互联网，如有侵权内容，请联系hs@horatio.cn

- 接口地址：https://api.443.fyi/rpicgs/bing.php
- 返回格式：跳转图片链接
- 请求方法：GET
- 调用参数：

| 参数代码 | 参数含义 | 参数值 |
| --- | --- | --- |
| rand | 是否随机显示最近8天内的图片 | true, false |
| day | 显示指定日期的图片 | -1，0，1，2，3，4，5，6，7(0为今天，-1为昨天) |
| size | 指定获取图片大小 | 指定获取图片大小 |
| info | 获取图片基础信息（json格式） | true, false |

?> 以上所有参数均非必要，默认参数为rand=false，day=0，size=1920×1080，info=false

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

?> 中间的x为英文字母x

- 调用示例：
  - 默认调用：

?> 不带任何参数调用，显示必应当天图片

调用链接：

```html
<img src="https://api.443.fyi/rpicgs/bing.php"/>
```

显示效果
<img src="https://api.443.fyi/rpicgs/bing.php"/>

  - Info调用：

调用链接：

```html
https://api.443.fyi/rpicgs/bing.php?info=true
```

返回值：

```json
{
title:Elephant hawk-moth on foxglove flower (© David Chapman/Alamy),url:https://www.bing.com/th?id=OHR.FoxgloveHawkmoth_EN-US4340017481_1920x1080.jpg,link:https://www.bing.com/search?q=elephant+hawk+moth&form=hpcapt&filters=HpDate%3a%2220220723_0700%22,time:20220723
}
```

- 随机调用：

?> 刷新本页，图片随机显示

调用链接：

```html
<img src="https://api.443.fyi/rpicgs/bing.php?rand=true"/>
```

显示效果

<img src="https://api.443.fyi/rpicgs/bing.php?rand=true">