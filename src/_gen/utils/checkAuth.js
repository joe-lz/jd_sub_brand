import AV from "@_gen/utils/leancloud-storage/dist/av-weapp.js";
import Taro from "@tarojs/taro";
import getPath from "@_gen/utils/getPath";
import { checkPhoneVeritied } from "./regx";
// 是否登录
export default ({ params, callback }) => {
  if (AV.User.current()) {
    checkPhoneVeritied({
      user: AV.User.current(),
      callback,
    });
  } else {
    Taro.showActionSheet({
      itemList: ["微信登录", "账号登录"],
    }).then(res => {
      if (res.tapIndex === 0) {
        // 微信登录
        AV.User.loginWithWeapp({
          preferUnionId: true,
        }).then(user => {
          if (user) {
            Taro.showToast({
              title: "登录成功",
              icon: "success",
              duration: 1000,
            });
            checkPhoneVeritied({ callback });
          }
        });
      } else {
        // 绑定已有用户
        const { type } = params || {};
        Taro.navigateTo({
          url: getPath({
            moduleName: "public",
            url: `/pages/auth/index`,
            params: {
              type,
            },
          }),
        });
      }
    });
  }
};
