/*
 * @Description: brandService
 * @Author: bangdong.chen
 * @Date: 2020-03-07 16:00:24
 * @LastEditors: bangdong.chen
 * @LastEditTime: 2020-08-15 16:01:52
 * @FilePath: /fe-taro-jinxi/src/services/brand.js
 */
import AV from '@_gen/utils/leancloud-storage/dist/av-weapp.js';
import Taro from "@tarojs/taro";

const Brand = AV.Object.extend('Brand');

export async function getBrandById(params) {
  const queryBrand = new AV.Query('Brand');
  return new Promise((resolve) => {
    queryBrand.get(params.id).then((res) => {
      resolve({
        result: JSON.parse(JSON.stringify(res)),
        code: 0,
        msg: 'success',
      });
    });
  });
}

export async function getBrandByJxId(params) {
  Taro.showLoading({ title: "加载中..." });

  const queryBrand = new AV.Query('Brand');
  queryBrand.equalTo('jxId', Number(params.id));
  return new Promise((resolve) => {
    queryBrand.first().then((res) => {
      Taro.hideLoading();
      resolve({
        result: JSON.parse(JSON.stringify(res)),
        code: 0,
        msg: 'success',
      });
    });
  });
}


// export async function getBrandListByCompany(params) {
//   const queryBrand = new AV.Query('Brand');
//   queryBrand.equalTo('company_id', AV.Object.createWithoutData('Company', params.company_id));
//   queryBrand.descending('updatedAt')

//   return new Promise(resolve => {
//     queryBrand.find().then(res => {
//       resolve({
//         result: res,
//         code: 0,
//         msg: 'success',
//       })
//     });
//   })
// }

export async function getBrandListAll() {
  Taro.showLoading({ title: "加载中..." });

  const queryBrand = new AV.Query('Brand');
  queryBrand.include('company_id')
  queryBrand.descending('createdAt')  

  return new Promise(resolve => {
    queryBrand.find().then(res => {
      resolve({
        result: JSON.parse(JSON.stringify(res)),
        code: 0,
        msg: 'success',
      })
    }).catch((err) => {
      console.log({err});
    }).finally(() => {
      Taro.hideLoading();
    });
  })
}

// 添加我的品牌/我访问过的品牌
export async function addToMyBrands(params) {
  const {brand_id, type} = params
  return new Promise((resolve, reject) => {
    // 是否已经存在
    const MyBrands = AV.Object.extend('MyBrands');

    const queryMyBrands = new AV.Query('MyBrands');
    const brandInstance = AV.Object.createWithoutData('Brand', brand_id);
    queryMyBrands.equalTo('brand_id', brandInstance);
    queryMyBrands.equalTo('user_id', AV.User.current());

    queryMyBrands.find().then(resMyBrands => {
      if (!(resMyBrands.length > 0)) {
        // 添加
        const mybrands = new MyBrands();
        mybrands.set('brand_id', brandInstance);
        mybrands.set('user_id', AV.User.current());
        mybrands.set('type', type);
        mybrands.save().then(res => {
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
      } else {
        if (type === 1) {
          // 更新
          const curBrand = resMyBrands[0];
          curBrand.set('type', type);
          curBrand.save().then(res => {
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
        } else {
          resolve({
            result: JSON.parse(JSON.stringify(resMyBrands)),
            code: 0,
            msg: 'success',
          })
        }
      }
    }).catch((err) => {
      console.log({ err });
    }).finally(() => {
    });
  })
}

export async function getMyBrands() {
  Taro.showLoading({ title: "加载中..." });

  const queryMyBrands = new AV.Query('MyBrands');
  queryMyBrands.equalTo('user_id', AV.User.current());
  queryMyBrands.equalTo('type', 1);
  queryMyBrands.include("brand_id");
  queryMyBrands.include("userbrand_id");
  queryMyBrands.descending('createdAt')

  return new Promise(resolve => {
    queryMyBrands.find().then(res => {
      resolve({
        result: JSON.parse(JSON.stringify(res)),
        code: 0,
        msg: 'success',
      })
    }).catch((err) => {
      console.log({ err });
    }).finally(() => {
      Taro.hideLoading();
    });
  })
}

export async function getMyBrandsVisit() {
  Taro.showLoading({ title: "加载中..." });

  const queryMyBrands = new AV.Query('MyBrands');
  queryMyBrands.equalTo('user_id', AV.User.current());
  queryMyBrands.equalTo('type', 2);
  queryMyBrands.include('brand_id')
  queryMyBrands.descending('createdAt')

  return new Promise(resolve => {
    queryMyBrands.find().then(res => {
      resolve({
        result: JSON.parse(JSON.stringify(res)),
        code: 0,
        msg: 'success',
      })
    }).catch((err) => {
      console.log({ err });
    }).finally(() => {
      Taro.hideLoading();
    });
  })
}

// 获取mybrand by params
export async function updateCurMyBrands(params) {
  const queryMyBrands = new AV.Query("MyBrands");
  queryMyBrands.equalTo("user_id", AV.User.current());
  queryMyBrands.equalTo("brand_id", AV.Object.createWithoutData('Brand', params.brand_id));

  return new Promise(resolve => {
    queryMyBrands
      .first()
      .then(res => {
        res.set('userbrand_id', AV.Object.createWithoutData('UserBrand', params.userbrand_id))
        res.save()
        resolve({
          result: JSON.parse(JSON.stringify(res)),
          code: 0,
          msg: "success"
        });
      })
      .catch(err => {
        console.log({ err });
      })
      .finally(() => {
      });
  });
}