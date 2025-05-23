/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  lang: 'zh-Hans',
  base: "/",
  title: "WXies Docs",
  description: "We Quest On and On",
  head: [
    ['link', { rel: 'icon', href: 'https://www.wxies.cn/images/favicons/favicon.png' }]
  ],
  outDir: "dist",
  themeConfig: {
    repo: "WXies-Team/Homepage",
    docsRepo: "https://github.com/WXies-Team/Doc",
    docsBranch: "main",
    editLink: {
      pattern: 'https://github.com/WXies-Team/Doc/edit/main/docs/:path',
      text: "在 GitHub 上编辑此页"
    },
    docsDir: "docs",
    logo: "https://www.wxies.cn/images/favicons/favicon.png",
    nav: [
      { text: "首页", link: "https://www.wxies.cn" },
    ],
    sidebar: getGuideSidebar(),
    footer: {
      copyright: 'Copyright © 2021-2025 WXies Team'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    darkModeSwitchLabel: '外观',
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
  },
};

function getGuideSidebar() {
  return [
    {
      text: "实用工具",
      items: [
        { text: "获取 QQ 头像", link: "/tool/qava" },
        { text: "获取 QQ 群头像", link: "/tool/qgava" },
        { text: "生成 QQ 更新日志", link: "/tool/quplog" },
        { text: "必应每日壁纸", link: "/tool/bingr" },
        { text: "FastGit", link: "/tool/fastgit" },
        { text: "获取 IP 地址", link: "/tool/getip" },
      ],
    },
  ]
}

export default config;
