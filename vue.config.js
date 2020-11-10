module.exports = {
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .end()

    config.module
      .rule('glsl')
      .test(/\.glsl$/)
      .use('raw')
      .loader('raw-loader')
      .end()
      .use('glslify')
      .loader('glslify-loader')
      .end()
  }
}
