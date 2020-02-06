const path = require("path")
const Mode = require("frontmatter-markdown-loader/mode")

const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/der-raum/'
  }
} : {}

export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  ...routerBase,
  head: {
    title: "DER RAUM",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }]
  },
  generate: {
    routes:
    // {
    //   async asyncData() {
    //     // create context via webpack to map over all blog pages
    //     const allPages = await require.context(
    //       "~/content/services/",
    //       true,
    //       /\.md$/
    //     )
    //     return allPages.keys().map(key => {
    //       // give back the value of each page context
    //       return {
    //         route: '/services/' + key.title,
    //         payload: key
    //       }
    //     })
    //   }
    // }
    function () {
     return require.context(
          "~/content/services/",
          true,
          /\.md$/
      )
     .then((res) => {
        return res.data.map((service) => {
            return {
               route: '/services/' + service.title,
               payload: service
            }
        })
     })
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
    "~/plugins/markdown"
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    "@nuxtjs/eslint-module"
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/style-resources",
    "nuxt-i18n",
    "nuxt-fontawesome",
    "nuxt-svg-loader"
  ],
  // Font awesome icon libraries
  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-brands-svg-icons',
        icons: ['fab']
      }
    ]
  },
  // SCSS resources
  styleResources: {
    scss: ["assets/styles/main.scss"]
  },
  // Localization
  i18n: {
    locales: [
      {
        code: "en",
        file: "en.js",
        iso: "en-US"
      },
      {
        code: "de",
        file: "de.js",
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
    langDir: "lang/"
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
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        })
      }

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
