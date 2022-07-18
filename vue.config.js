const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  outputDir: path.resolve(__dirname, process.env.OUTPUT_DIR),
  runtimeCompiler: true,
  devServer: {
    hot: false,
    liveReload: false,
    host: '0.0.0.0',
    port: 8080, // CHANGE YOUR PORT HERE!
    https: true,
    allowedHosts: 'all'
  },
  transpileDependencies: true,
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false
    }
  },
  pwa: {
    name: 'Visi8 Webcomic',
    themeColor: "#42b983",
    msTileColor: "#42b983",
    appleMobileWebAppCache: "yes",
    manifestOptions: {
      background_color: "#42b983"
    },
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
        swSrc: "./src/service-worker.js"
    },
  }
})
