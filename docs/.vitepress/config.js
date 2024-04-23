/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  base: "/",
  title:"WXies Docs",
  description: "We Quest On and On",
  head: [
    ['link', { rel: 'icon', href: 'https://www.wxies.cn/favicon.ico' }]
  ],
  outDir: "dist",
  themeConfig: {
    repo: "WXies-Team/Homepage",
    docsRepo: "https://github.com/WXies-Team/Doc",
    docsBranch: "Next",
    editLink: {
      pattern: 'https://github.com/WXies-Team/Doc/edit/main/docs/:path',
      text:"在 GitHub 上编辑此页"
    },
    docsDir: "docs",
    lastUpdated: "最近更新于",
    logo: "https://www.wxies.cn/favicon.ico",
    nav: [
      { text: "首页", link: "https://www.wxies.cn" },
    ],
    sidebar: getGuideSidebar(),
    footer: {
      copyright: 'Copyright © 2021-2024 WXies Team'
    }
  },
};

function getGuideSidebar() {
  return [
    {
      text: "实用工具",
      items: [
        { text: "获取 QQ 头像", link: "/tool/qava" },
        { text: "必应每日壁纸", link: "/tool/bingr" },
        { text: "生成 QQ 更新日志", link: "/tool/quplog" },
      ],
    },
  ]
}

export default config;
