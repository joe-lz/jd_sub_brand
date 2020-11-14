const path = require("path");

const alias = require("./alias");
const newAlias = {};
Object.keys(alias).map((aliasKey) => {
  newAlias[aliasKey] = `${path.resolve(__dirname, "..", alias[aliasKey])}`;
  return aliasKey;
});

const config = {
  projectName: "jd_taro",
  date: "2020-9-24",
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: "src",
  outputRoot: "dist",
  plugins: [],
  defineConstants: {
    WEAPP_APPID_TUGECAO: '"wx8abaf00ee8c3202e"', // 吐个槽
    WEAPP_APPID_KUAIDI100: '"wx6885acbedba59c14"', // 快递100
  },
  copy: {
    patterns: [
      { from: "src/images/tabbar/", to: "dist/images/tabbar/", ignore: "*.js" }, // 指定需要 copy 的目录
    ],
    options: {},
  },
  alias: newAlias,
  framework: "react",
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
  h5: {
    publicPath: "/",
    staticDirectory: "static",
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
};
