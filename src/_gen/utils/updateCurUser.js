import Taro from "@tarojs/taro";
import AV from "@_gen/utils/leancloud-storage/dist/av-weapp.js";
import getPath from "@_gen/utils/getPath";
import { getCurUserProfile } from "@_gen/service/user";

export default async (params = {}) => {
  const { needLogin = true } = params;
  let curUser = AV.User.current() ? AV.User.current().toJSON() : null;
  let curUserProfile = null;
  if (!curUser && needLogin) {
    // 未登录，跳转到登录页面
    Taro.navigateTo({
      url: getPath({
        moduleName: "public",
        url: `/pages/auth/index`,
        params: {},
      }),
    });
    return;
  }
  const { company_id } = params || {};
  if (company_id) {
    let response = await getCurUserProfile({ company_id });
    if (response.result && response.result.length > 0) {
      curUserProfile = response.result[0];
    } else {
      response = await createUserProfile({ company_id });
      curUserProfile = response.result;
    }
  }
  return { curUser, curUserProfile };
};
