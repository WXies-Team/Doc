# 生成 QQ 更新日志

:::tip 遇到了问题？
该工具为TG@ [QQ/TIM For Update Log](https://t.me/qq_updatelog)生成更新日志
:::

- 接口地址：https://api.wxies.cn/tool/quplog.php (日期码) | https://api.wxies.cn/tool/quplogc.php (版本号)
- 返回格式：MarkDown
- 请求方法：GET
- 日期码调用参数：

| 参数代码 | 参数含义 | 参数值 | 默认值 | 是否必要 |
| :-: | :-: | :-: | :-: | :-: |
| win | Winodws 大版本号 | - | 9.9. | 是 |
| linux | Linux 大版本号 | - | 3.2. | 是 |
| macos | macOS 大版本号 | - | 6.9. | 是 |
| vcode | 小版本号 | - | - | 是 |
| fcode | 日期码 | yymmdd | - | 是 |
| pnum | 发版次数 | - | 01 | 否 |
| log | 更新日志 | - | - | 是 |
| blink | 备份链接初始数字 | 不输入删除备份段 | - | 否 |

- 版本号调用参数：

| 参数代码 | 参数含义 | 参数值 | 默认值 | 是否必要 |
| :-: | :-: | :-: | :-: | :-: |
| win | Winodws 大版本号 | - | 9.9. | 是 |
| linux | Linux 大版本号 | - | 3.2. | 是 |
| macos | macOS 大版本号 | - | 6.9. | 是 |
| vcode | 小版本号 | - | - | 是 |
| w86 | Windows X86 五位MD5 | - | - | 是 |
| w64 | Windows X64 五位MD5 | - | - | 是 |
| warm | Windows Arn 五位MD5 | - | - | 是 |
| mac | macOS X86 五位MD5 | - | - | 是 |
| linuxc | Linux 五位MD5 | - | - | 是 |
| log | 更新日志 | - | - | 是 |
| blink | 备份链接初始数字 | 不输入删除备份段 | - | 否 |

:::tip 提示
也可直接前往该[网页(日期码)](https://api.wxies.cn/tool/quplog.html) | [网页(版本号)](https://api.wxies.cn/tool/quplogc.html)生成
:::

调用链接：

```html
https://api.wxies.cn/tool/quplog.php?vcode=22961&fcode=240412&log=114514&blink=1919810
```

```html
https://api.wxies.cn/tool/quplogc.php?vcode=22961&w86=240412&w64=240412&warm=240412&mac=240412&linuxc=240412&log=114514&blink=1919810
```

显示效果

Windows QQ_NT 9.9.9.22961 &
MacOS QQ_NT 6.9.32.22961 &
Linux QQ_NT 3.2.7.22961

官方更新内容：
114514

下载：
- Windows:
[X86](https://dldir1.qq.com/qqfile/qq/QQNT/Windows/QQ_9.9.9_240412_x86_.exe) | [X64](https://dldir1.qq.com/qqfile/qq/QQNT/Windows/QQ_9.9.9_240412_x64_.exe)
- MacOS:
[Dmg](https://dldir1.qq.com/qqfile/qq/QQNT/Mac/QQ_6.9.32_240412_.dmg)
- Linux:
[DEB_x64](https://dldir1.qq.com/qqfile/qq/QQNT/Linux/QQ_3.2.7_240412_amd64_.deb) | [RPM_x64](https://dldir1.qq.com/qqfile/qq/QQNT/Linux/QQ_3.2.7_240412_x86_64_.rpm) | [Appimage_x64](https://dldir1.qq.com/qqfile/qq/QQNT/Linux/QQ_3.2.7_240412_x86_64_.AppImage)
[DEB_arm](https://dldir1.qq.com/qqfile/qq/QQNT/Linux/QQ_3.2.7_240412_arm64_.deb) | [RPM_arm](https://dldir1.qq.com/qqfile/qq/QQNT/Linux/QQ_3.2.7_240412_aarch64_.rpm) | [Appimage_arm](https://dldir1.qq.com/qqfile/qq/QQNT/Linux/QQ_3.2.7_240412_arm64_.AppImage)
[LoongArch](https://dldir1.qq.com/qqfile/qq/QQNT/Linux/QQ_3.2.7_240412_loongarch64_.deb) | [Mips](https://dldir1.qq.com/qqfile/qq/QQNT/Linux/QQ_3.2.7_240412_mips64el_.deb)

备份：
- Windows:
[X86](https://t.me/linqiqi_backup/1919810) | [X64](https://t.me/linqiqi_backup/1919811)
- MacOS:
[Dmg](https://t.me/linqiqi_backup/1919812)
- Linux:
[DEB](https://t.me/linqiqi_backup/1919813) | [RPM](https://t.me/linqiqi_backup/1919814) | [Appimage](https://t.me/linqiqi_backup/1919815) | [LoongArch](https://t.me/linqiqi_backup/1919816) | [Mips](https://t.me/linqiqi_backup/1919817)

TG@ [QQ/TIM For Update Log](https://t.me/qq_updatelog)
#QQ_NT_Windows
#QQ_NT_MacOS
#QQ_NT_Linux
