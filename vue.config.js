module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/myTools/'
    : '/',

  configureWebpack: {
    target: 'electron-renderer',
  },
  
  chainWebpack: config => {
      config.module
      .rule('js')
      .use('babel')
        .loader('babel-loader')
        .options({
          presets: [
            '@babel/preset-env',
          ],
          plugins: [
            '@babel/plugin-syntax-import-meta',
          ],
        })
      
      config.module
      .rule('ts')
      .use('ts-loader')
  },
};
