const observer = require('intersection-observer');
const path = require("path")
const Mode = require("frontmatter-markdown-loader/mode")
const parser = require('md-yaml-json').default;
const { get, kebabCase, flatten } = require('lodash')
const seo = require('./content/data/seo.json')

const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/der-raum/'
  }
} : {}

function loadPages (enPrefix, dePrefix) {
  // create context via webpack to map over all markdown pages
  let pages = parser(`./content/${enPrefix}`)

  pages = pages.map(page => {
    // give back the pages urls as strings in both languages
    return [
      `/${dePrefix}/${kebabCase(get(page, 'meta.de_title', ''))}`,
      `en/${enPrefix}/${kebabCase(get(page, 'meta.en_title', ''))}`
    ]
    // if (enPrefix === 'services' || enPrefix === 'about') {
    //   return [
    //     `/${dePrefix}#${kebabCase(get(page, 'meta.de_title', ''))}`,
    //     `en/${enPrefix}#${kebabCase(get(page, 'meta.en_title', ''))}`
    //   ]
    // } else {
    //   return [
    //     `/${dePrefix}/${kebabCase(get(page, 'meta.de_title', ''))}`,
    //     `en/${enPrefix}/${kebabCase(get(page, 'meta.en_title', ''))}`
    //   ]
    // }
  })

  return flatten(pages)
}

export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  ...routerBase,
  head: {
    title: seo.longTitle,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: seo.description
      },
      {
        hid: "og:description",
        name: "og:description",
        content: seo.description
      }
    ],
    // script: [
    //   {
    //     src: 'https://raw.githubusercontent.com/john-doherty/swiped-events/master/dist/swiped-events.min.js'
    //   }
    // ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }]
  },
  generate: {
    fallback: true,
    async routes() {

      return [
        ...loadPages('projects', 'projekte'),
        // ...loadPages('services', 'leistungen'),
        ...loadPages('rooms', 'raume')
        // ...loadPages('about', 'uber')
      ]
    }
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/translate_page",
    "~/plugins/markdown",
    { src: '~/plugins/intersection_observer', ssr: false }
  ],
  polyfill: {
    features: [
      {
        require: 'object.entries',
        detect: () => 'entries' in window.Object,
        install: entries => entries.shim(),
      },
      {
        require: 'intersection-observer',
        detect: () => 'IntersectionObserver' in window,
      },
      {
        require: 'smoothscroll-polyfill',
        detect: () =>
          'scrollBehavior' in document.documentElement.style &&
          window.__forceSmoothScrollPolyfill__ !== true,
        install: smoothscroll => smoothscroll.polyfill(),
      },
    ],
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    "@nuxtjs/eslint-module",
    "@nuxtjs/google-analytics"
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/style-resources",
    "nuxt-i18n",
    "nuxt-svg-loader",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
    "nuxt-polyfill"
  ],
  // SCSS resources
  styleResources: {
    scss: ["assets/styles/main.scss"]
  },
  // Localization
  i18n: {
    locales: [
      {
        code: "en",
        file: "en.json",
        iso: "en-US"
      },
      {
        code: "de",
        file: "de.json",
        iso: "de-DE"
      }
    ],
    strategy: "prefix_except_default",
    defaultLocale: "de",
    vueI18n: {
      fallbackLocale: "de"
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected"
    },
    seo: true,
    lazy: true,
    langDir: "content/data/lang/"
  },
  // Google Analytics Config
  googleAnalytics: {
    id: 'UA-1433242-13'
  },
  // Sitemap config
  sitemap: {
    hostname: 'https://www.der-raum.de',
    gzip: true,
    // routes: {
      // async routes() {

      //   return [
      //     ...loadPages('projects', 'projekte'),
      //     ...loadPages('services', 'leistungen'),
      //     ...loadPages('rooms', 'raume'),
      //     ...loadPages('about', 'uber')
      //   ]
      // }
    // }
  },
  // robots.txt config
  robots: {
    Sitemap: 'https://www.der-raum.de/sitemap.xml'
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    transpile: [ 'tinygesture' ],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      // if (ctx.isDev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: "pre",
      //     test: /\.(js|vue)$/,
      //     loader: "eslint-loader",
      //     exclude: /(node_modules)/
      //   })
      // }

      // add frontmatter-markdown-loader
      config.module.rules.push({
        test: /\.md$/,
        include: path.resolve(__dirname, "content"),
        loader: "frontmatter-markdown-loader",
        options: {
          mode: [Mode.VUE_COMPONENT, Mode.META]
        }
      })

      // add svg loader
      config.module.rules.push({
        test: /\.vue$/,
        loader: "vue-svg-inline-loader"
      })
    }
  }
}
