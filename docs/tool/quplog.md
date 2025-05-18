# 生成 QQ 更新日志

:::tip 遇到了问题？
该工具为TG@ [QQ/TIM For Update Log](https://t.me/qq_updatelog)生成更新日志
:::

- 接口地址：https://api.wxies.cn/tool/quplog.php
- 返回格式：HTML
- 请求方法：GET

- 版本号调用参数：

| 参数代码 | 参数含义 | 参数值 | 默认值 | 是否必要 |
| :-: | :-: | :-: | :-: | :-: |
| link_windows_x86 | Winodws X86 链接 | 不输入删除 Windows 段 | - | 否 |
| link_windows_x64 | Winodws X64 链接 | - | - | 否 |
| link_windows_arm | Winodws arm 链接 | - | - | 否 |
| link_macos | macOS 链接 | 不输入删除 macos 段 | - | 否 |
| link_linux | Linux 链接(输入一个即可) |   不输入删除 Linux 段   | - | 否 |
| token | 推送鉴权 Token | 不输入不推送至 Telegram | - | 否 |
|       log        |         更新日志         |            -            |   -    |    否    |
|      blink       |     备份链接初始数字     |    不输入删除备份段     |   -    |    否    |

:::tip 提示
也可直接前往该 [网页](https://api.wxies.cn/tool/quplog.html)生成
:::

调用链接：

```html
https://api.wxies.cn/tool/quplog.php?link_windows_x86=https://dldir1.qq.com/qqfile/qq/QQNT/eb96d600/QQ9.9.16.29927_x86.exe&link_windows_x64=https://dldir1.qq.com/qqfile/qq/QQNT/3e273e30/QQ9.9.16.29927_x64.exe&link_windows_arm=https://dldir1.qq.com/qqfile/qq/QQNT/082e7efa/QQ9.9.16.29927_arm64.exe&link_macos=https://dldir1.qq.com/qqfile/qq/QQNT/62a1a49c/QQ_v6.9.61.29927.dmg&link_linux=https://dldir1.qq.com/qqfile/qq/QQNT/833d113c/linuxqq_3.2.13-29927_amd64.deb&blink=114514
```

显示效果

<b>Windows QQ_NT 9.9.16.29927 &</b>
<b>MacOS QQ_NT 6.9.61.29927 &</b>
<b>Linux QQ_NT 3.2.13.29927</b>

<b>官方更新内容：</b>

> 截图
> - 新增 支持快捷键唤起提取文字(Windows&Mac)
> - 新增 支持快捷键唤起屏幕翻译(Windows)
>
>
> 体验
> - 新增 支持新文件接收提醒
> - 新增 支持鼠标拖拽输入框内图片至本地保存
>
> 问题修复
> - 修复 查看图片时卡顿的问题
> - 修复 最近发送表情功能显示异常的问题
> - 修复 其他一些已知 Bug
>

<b>下载：</b>

- Windows:
<blockquote><a href='https://dldir1.qq.com/qqfile/qq/QQNT/eb96d600/QQ9.9.16.29927_x86.exe'>X86</a> | <a href='https://dldir1.qq.com/qqfile/qq/QQNT/3e273e30/QQ9.9.16.29927_x64.exe'>X64</a> | <a href='https://dldir1.qq.com/qqfile/qq/QQNT/082e7efa/QQ9.9.16.29927_arm64.exe'>Arm</a></blockquote>
- MacOS:
<blockquote><a href='https://dldir1.qq.com/qqfile/qq/QQNT/62a1a49c/QQ_v6.9.61.29927.dmg'>Dmg</a></blockquote>
- Linux:
<blockquote><a href='https://dldir1.qq.com/qqfile/qq/QQNT/833d113c/linuxqq_3.2.13-29927_amd64.deb'>DEB_x64</a> | <a href='https://dldir1.qq.com/qqfile/qq/QQNT/833d113c/linuxqq_3.2.13-29927_x86_64.rpm'>RPM_x64</a> | <a href='https://dldir1.qq.com/qqfile/qq/QQNT/833d113c/linuxqq_3.2.13-29927_x86_64.AppImage'>Appimage_x64</a></blockquote>
<blockquote><a href='https://dldir1.qq.com/qqfile/qq/QQNT/833d113c/linuxqq_3.2.13-29927_arm64.deb'>DEB_Arm</a> | <a href='https://dldir1.qq.com/qqfile/qq/QQNT/833d113c/linuxqq_3.2.13-29927_aarch64.rpm'>RPM_Arm</a> | <a href='https://dldir1.qq.com/qqfile/qq/QQNT/833d113c/linuxqq_3.2.13-29927_arm64.AppImage'>Appimage_Arm</a></blockquote>
<blockquote><a href='https://dldir1.qq.com/qqfile/qq/QQNT/833d113c/linuxqq_3.2.13-29927_loongarch64.deb'>LoongArch</a> | <a href='https://dldir1.qq.com/qqfile/qq/QQNT/833d113c/linuxqq_3.2.13-29927_mips64el.deb'>Mips</a></blockquote>

<b>备份：</b>
- Windows:
<blockquote><a href='https://t.me/linqiqi_backup/11'>X86</a> | <a href='https://t.me/linqiqi_backup/12'>X64</a> | <a href='https://t.me/linqiqi_backup/13'>Arm</a></blockquote>
- MacOS:
<blockquote><a href='https://t.me/linqiqi_backup/14'>Dmg</a></blockquote>
- Linux:
<blockquote><a href='https://t.me/linqiqi_backup/15'>DEB</a> | <a href='https://t.me/linqiqi_backup/16'>RPM</a> | <a href='https://t.me/linqiqi_backup/17'>Appimage</a> | <a href='https://t.me/linqiqi_backup/18'>LoongArch</a> | <a href='https://t.me/linqiqi_backup/19'>Mips</a></blockquote>

TG@ <a href='https://t.me/qq_updatelog'>QQ/TIM For Update Log</a>
#QQ_NT_Windows
#QQ_NT_MacOS
#QQ_NT_Linux
