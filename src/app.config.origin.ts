import preval from "preval.macro";

export default {
  resizable: true,
  darkmode: true,
  themeLocation: "theme.json",
  // pages: ["pages/index/index", "pages/index-detail/index"],
  // window: {
  //   navigationBarTitleText: "WeChat",
  //   navigationBarBackgroundColor: "@navBgColor",
  //   navigationBarTextStyle: "@navTxtStyle",
  //   backgroundColor: "@bgColor",
  //   backgroundTextStyle: "@bgTxtStyle",
  //   backgroundColorTop: "@bgColorTop",
  //   backgroundColorBottom: "@bgColorBottom"
  // },
  // tabBar: {
  //   color: "@tabFontColor",
  //   selectedColor: "@tabSelectedColor",
  //   backgroundColor: "@tabBgColor",
  //   borderStyle: "@tabBorderStyle",
  //   list: [
  //     {
  //       pagePath: "pages/index/index",
  //       iconPath: "@iconPath1",
  //       selectedIconPath: "@selectedIconPath1",
  //       text: "首页"
  //     },
  //     {
  //       pagePath: "pages/me/index",
  //       iconPath: "@iconPath2",
  //       selectedIconPath: "@selectedIconPath2",
  //       text: "我的"
  //     }
  //   ]
  // }
  pages: preval`
      module.exports=(function() {
        const pages = require('./config/pages')
        return pages;
      })()
    `,
  subpackages: preval`
      module.exports=(function(){
        const subPackages = require('./config/subpackages');
        const subPackagesSubModule = require('./config/subPackage.subModule.generated');
        return [
          ...subPackages,
          ...subPackagesSubModule,
        ]
      })();
    `,
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
    navigationStyle: "custom"
  },
  navigateToMiniProgramAppIdList: preval`
      module.exports=(function() {
        const navigateToMiniProgramAppIdList = require('./config/navigateToMiniProgramAppIdList')
        return navigateToMiniProgramAppIdList;
      })()
    `
};
