/*
 * @Description: 用户名片（用户品牌信息）
 * @Author: bangdong.chen
 * @Date: 2020-05-20 22:17:11
 * @LastEditors: bangdong.chen
 * @LastEditTime: 2020-11-15 17:24:29
 * @FilePath: /fe-taro-jinxi/src/services/userbrand.js
 */
import Taro from "@tarojs/taro";
import AV from '@_gen/utils/leancloud-storage/dist/av-weapp.js';

export async function getUserBrand(params) {
  const queryUserBrand = new AV.Query('UserBrand');
  queryUserBrand.equalTo('user', AV.User.current());
  queryUserBrand.equalTo("bId", params.bId);
  queryUserBrand.include("user");
  queryUserBrand.include("brand");
  queryUserBrand.descending('createdAt')

  return new Promise(resolve => {
    queryUserBrand.find().then((res) => {
      resolve({
        result: JSON.parse(JSON.stringify(res)),
        code: 0,
        msg: 'success',
      });
    });
  })
}

export async function getUserBrandByJxId(params) {
  Taro.showLoading({ title: "加载中..." });
  const queryUserBrand = new AV.Query('UserBrand');
  queryUserBrand.equalTo('jxId', Number(params.id));
  queryUserBrand.include("user");
  queryUserBrand.include("brand");
  return new Promise((resolve) => {
    queryUserBrand.first().then((res) => {
      Taro.hideLoading();
      resolve({
        result: JSON.parse(JSON.stringify(res)),
        code: 0,
        msg: 'success',
      });
    });
  });
}

export async function createUserBrand(params) {
  const UserBrand = AV.Object.extend('UserBrand');
  const Instants = new UserBrand({
    user: AV.User.current(),
    bId: params.bId,
    brand: AV.Object.createWithoutData('Brand', params.brand),
  });
  return new Promise((resolve, reject) => {
    Instants.save().then(res => {
      // 成功保存之后，执行其他逻辑
      resolve({
        result: JSON.parse(JSON.stringify(res)),
        code: 0,
        msg: 'success',
      })
    }, error => {
      // 异常处理
      reject({
        result: error,
        code: -1,
        msg: 'failed',
      })
    });
  })
}

export async function updateUserBrand({ params, curUserBrand }) {
  const Instance = AV.Object.createWithoutData('UserBrand', curUserBrand.objectId);
  Object.keys(params).map(obj => {
    Instance.set(`${obj}`, params[obj]);
    return obj;
  })

  return new Promise((resolve, reject) => {
    Instance.save().then(res => {
      // 成功保存之后，执行其他逻辑
      resolve({
        result: JSON.parse(JSON.stringify(res)),
        code: 0,
        msg: 'success',
      })
    }, error => {
      // 异常处理
      reject({
        result: error,
        code: -1,
        msg: 'failed',
      })
    });
  })
}

