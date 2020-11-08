import AV from '@_gen/utils/leancloud-storage/dist/av-weapp.js';
import getPath from '@_gen/utils/getPath';
import Taro from "@tarojs/taro";

// 是否验证手机号
export const checkPhoneVeritied = ({ callback }) => {
  AV.User.become(AV.User.current()._sessionToken).then(
    () => {
      const userResult = JSON.parse(JSON.stringify(AV.User.current())); 
      if (userResult && userResult.mobilePhoneVerified) {
        callback();
      } else {
        Taro.navigateTo({
          url: getPath({
            moduleName: 'public',
            url: `/pages/auth/index`,
            params: {
              type: 2
            }
          })
        });
      }
    },
    (error) => {
      console.log(error);
      
    }
  )
};