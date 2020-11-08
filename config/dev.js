module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
    // 根据存储区域修改上传域名https://developer.qiniu.com/kodo/kb/5869/store-uploads-and-downloads-the-domain-name
    REACT_APP_QINIU_SERVER: '"https://upload-z1.qiniup.com"',
    // 空间 bucket 绑定的域名
    REACT_APP_QINIU_URL: '"https://t-qiniu.jingdian.club"',

    REACT_APP_LEAN_APPID: '"xTqcOYx0cBmnL0wTiMg6OY0m-gzGzoHsz"',
    REACT_APP_LEAN_KEY: '"zM3U8rwR2nFQaWYsGShYykla"',
    REACT_APP_LEAN_SERVER: '"https://t-lean-api.jingdian.club"', // API 访问域名
    REACT_APP_LEAN_CLOUD_SERVER: '"https://t-lean-cloud.jingdian.club"', // 云引擎域名
    // REACT_APP_LEAN_CLOUD_SERVER: "http://localhost:3000", // 云引擎域名
    REACT_APP_LEAN_DOMAIN_WHITE: '"t-lean-api.jingdian.club"',

    REACT_APP_CATEGORY_ID: '"5e04ab707d5774006a108214"',

    REACT_APP_FRONT: '"https://t-www.jingdian.club"',
    REACT_APP_ADMIN: '"https://t-admin.jingdian.club"',

    LEAN_CONFIG_ID: '"5e8073c68a84ab008ccea3fa"', // 用于审核的设置

    DEFAULT_CARD_ID_HORIZONTAL: '"5ed20640a6ec380006d34d76"', // 横版
    DEFAULT_CARD_ID_VERTICAL: '"5ed2069535e8ae000a21c7ee"' // 竖的
  },
  mini: {},
  h5: {}
}
