module.exports = {
  chainWebpack: config => config.resolve.symlinks(false),
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/assets/scss/global.scss";`
      }
    }
  }
}