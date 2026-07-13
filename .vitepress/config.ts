import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-Hans',
  base: '/',
  title: 'WXies Docs',
  description: 'We Quest On and On',
  head: [
    ['link', { rel: 'icon', href: '//wxies.cn/favicon.ico' }]
  ],
  outDir: './dist',
  vite: {
    build: {
      emptyOutDir: false
    }
  },
  themeConfig: {
    repo: 'WXies-Team/Homepage',
    docsRepo: 'https://github.com/WXies-Team/Doc',
    docsBranch: 'main',
    editLink: {
      pattern: 'https://github.com/WXies-Team/Doc/edit/main/:path',
      text: '在 GitHub 上编辑此页'
    },
    docsDir: '.',
    logo: '//wxies.cn/favicon.png',
    nav: [
      { text: '首页', link: 'https://www.wxies.cn' }
    ],
    sidebar: [
      {
        text: '文档',
        items: [
          { text: '隐私政策', link: '/privacy' }
        ]
      },
      {
        text: 'API 文档',
        items: [
          { text: '工具概览', link: '/tool/' },
          { text: '获取 QQ 头像', link: '/tool/qava' },
          { text: '获取 QQ 群头像', link: '/tool/qgava' },
          { text: '必应每日壁纸', link: '/tool/bing' }
        ]
      }
    ],
    outline: {
      level: [2, 3],
      label: '本页目录'
    },
    footer: {
      message: 'Released under the MPL-2.0 License.',
      copyright: 'Copyright © 2021-2026 WXies Team'
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
    search: {
      provider: 'local'
    }
  }
})