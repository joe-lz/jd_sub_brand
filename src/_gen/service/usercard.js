/*
 * @Description: 用户名片（用户品牌信息）
 * @Author: bangdong.chen
 * @Date: 2020-05-20 22:17:11
 * @LastEditors: bangdong.chen
 * @LastEditTime: 2020-05-30 17:55:52
 * @FilePath: /fe-taro-jinxi/src/services/usercard.js
 */
import Taro from "@tarojs/taro";
import AV from '@_gen/utils/leancloud-storage/dist/av-weapp.js';

export async function getUserCard(params) {
  const queryUserCard = new AV.Query('UserCard');
  queryUserCard.equalTo('userbrand', AV.Object.createWithoutData('UserBrand', params.userbrandid))
  queryUserCard.equalTo('user', AV.Object.createWithoutData('User', params.userid))
  queryUserCard.descending('createdAt')
  queryUserCard.include('card')

  return new Promise(resolve => {
    queryUserCard.find().then((res) => {
      resolve({
        result: JSON.parse(JSON.stringify(res)),
        code: 0,
        msg: 'success',
      });
    });
  })
}
