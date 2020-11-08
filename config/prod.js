module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  defineConstants: {
    // 根据存储区域修改上传域名https://developer.qiniu.com/kodo/kb/5869/store-uploads-and-downloads-the-domain-name
    REACT_APP_QINIU_SERVER: '"https://upload-z1.qiniup.com"',
    // 空间 bucket 绑定的域名
    REACT_APP_QINIU_URL: '"https://qiniu.jingdian.club"',

    REACT_APP_LEAN_APPID: '"GGIygpQelaxlTpx8FLlgAIRv-gzGzoHsz"',
    REACT_APP_LEAN_KEY: '"W3sgekCYSxWK6J6FxXgXPsk1"',
    REACT_APP_LEAN_SERVER: '"https://lean-api.jingdian.club"',
    REACT_APP_LEAN_CLOUD_SERVER: '"https://lean-cloud.jingdian.club"', // 云引擎域名
    // REACT_APP_LEAN_CLOUD_SERVER: "http://localhost:3000", // 云引擎域名
    REACT_APP_LEAN_DOMAIN_WHITE: '"lean-api.jingdian.club"',

    REACT_APP_CATEGORY_ID: '"5e19dc927d5774006ac832d0"',

    REACT_APP_FRONT: '"https://www.jingdian.club"',
    REACT_APP_ADMIN: '"https://admin.jingdian.club"',

    LEAN_CONFIG_ID: '"5e8071481358aa0081e7cd49"', // 用于审核的设置

    DEFAULT_CARD_ID_VERTICAL: '"5ed2805ca6ec380006d464a0"', // 竖的
    DEFAULT_CARD_ID_HORIZONTAL: '"5ed28055e2ae37000638f2bc"' // 横版
  },
  mini: {},
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * webpackChain (chain) {
     *   chain.plugin('analyzer')
     *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
     * }
     */
  }
}
