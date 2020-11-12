import AV from '@_gen/utils/leancloud-storage/dist/av-weapp.js';
import Taro from "@tarojs/taro";

const Product = AV.Object.extend('Product');
const ProductSku = AV.Object.extend('ProductSku');
const ProductImage = AV.Object.extend('ProductImage');

// export async function createSku(params) {
//   // 构建对象
//   const sku = new ProductSku(params);
//   sku.set('name', params.name);
//   sku.set('value', params.value);
//   sku.set('is_common', params.is_common);

//   return new Promise((resolve, reject) => {
//     sku.save().then(res => {
//       // 成功保存之后，执行其他逻辑
//       resolve({
//         result: res,
//         code: 0,
//         msg: 'success',
//       })
//     }, error => {
//       // 异常处理
//       reject({
//         result: error,
//         code: -1,
//         msg: 'failed',
//       })
//     });
//   })
// }

// export async function updateSku(params) {
//   // 构建对象
//   const sku = AV.Object.createWithoutData('ProductSku', params.id);
//   const { values } = params
//   Object.keys(values).map(obj => {
//     sku.set(`${obj}`, values[obj]);
//     return obj
//   })

//   return new Promise((resolve, reject) => {
//     sku.save().then(res => {
//       // 成功保存之后，执行其他逻辑
//       resolve({
//         result: res,
//         code: 0,
//         msg: 'success',
//       })
//     }, error => {
//       // 异常处理
//       reject({
//         result: error,
//         code: -1,
//         msg: 'failed',
//       })
//     });
//   })
// }

export async function getSkuList(params) {
  const querySku = new AV.Query('ProductSku');
  querySku.equalTo('product_id', AV.Object.createWithoutData('Product', params.product_id));
  querySku.descending('updatedAt')
  return new Promise(resolve => {
    querySku.find().then(res => {
      resolve({
        result: JSON.parse(JSON.stringify(res)),
        code: 0,
        msg: 'success',
      })
    });
  })
}

// export async function createImage(params) {
//   // 构建对象
//   const productImage = new ProductImage(params);

//   Object.keys(params).map(obj => {
//     productImage.set(`${obj}`, params[obj]);
//     return obj
//   })
//   return new Promise((resolve, reject) => {
//     productImage.save().then(res => {
//       // 成功保存之后，执行其他逻辑
//       resolve({
//         result: res,
//         code: 0,
//         msg: 'success',
//       })
//     }, error => {
//       // 异常处理
//       reject({
//         result: error,
//         code: -1,
//         msg: 'failed',
//       })
//     });
//   })
// }
// export async function updateImage(params) {
//   // 构建对象
//   const image = AV.Object.createWithoutData('ProductImage', params.id);
//   const { values } = params
//   Object.keys(values).map(obj => {
//     image.set(`${obj}`, values[obj]);
//     return obj
//   })

//   console.warn(image);
//   return new Promise((resolve, reject) => {
//     image.save().then(res => {
//       // 成功保存之后，执行其他逻辑
//       resolve({
//         result: res,
//         code: 0,
//         msg: 'success',
//       })
//     }, error => {
//       // 异常处理
//       reject({
//         result: error,
//         code: -1,
//         msg: 'failed',
//       })
//     });
//   })
// }
// export async function uploadImage(params) {
//   // 构建对象
//   const image = AV.Object.createWithoutData('ProductImage', params.id);
//   // console.warn(image);

//   return new Promise((resolve, reject) => {
//     image.save().then(res => {
//       // 成功保存之后，执行其他逻辑
//       resolve({
//         result: res,
//         code: 0,
//         msg: 'success',
//       })
//     }, error => {
//       // 异常处理
//       reject({
//         result: error,
//         code: -1,
//         msg: 'failed',
//       })
//     });
//   })
// }
export async function getImageList(params) {
  const queryImage = new AV.Query('ProductImage');
  queryImage.equalTo('product_id', AV.Object.createWithoutData('Product', params.product_id));
  queryImage.descending('updatedAt')
  return new Promise(resolve => {
    queryImage.find().then(res => {
      resolve({
        result: JSON.parse(JSON.stringify(res)),
        code: 0,
        msg: 'success',
      })
    });
  })
}

// export async function createProduct(params) {
//   // 构建对象
//   const product = new Product(params);
//   product.set('card_name', params.card_name);
//   product.set('card_name_en', params.card_name_en);
//   product.set('card_desc', params.card_desc);
//   product.set('status', 1);
//   if (params.categoryLevel1) { product.set('categoryLevel1', AV.Object.createWithoutData('Category', params.categoryLevel1)); }
//   if (params.categoryLevel2) { product.set('categoryLevel2', AV.Object.createWithoutData('Category', params.categoryLevel2)); }

//   return new Promise((resolve, reject) => {
//     product.save().then(res => {
//       // 成功保存之后，执行其他逻辑
//       resolve({
//         result: res,
//         code: 0,
//         msg: 'success',
//       })
//     }, error => {
//       // 异常处理
//       reject({
//         result: error,
//         code: -1,
//         msg: 'failed',
//       })
//     });
//   })
// }

// export async function updateProduct(params) {
//   // 构建对象
//   const product = AV.Object.createWithoutData('Product', params.id);
//   const { values } = params
//   Object.keys(values).map(obj => {
//     product.set(`${obj}`, values[obj]);
//     return obj
//   })
//   if (values.categoryLevel1) { product.set('categoryLevel1', AV.Object.createWithoutData('Category', values.categoryLevel1)); }
//   if (values.categoryLevel2) { product.set('categoryLevel2', AV.Object.createWithoutData('Category', values.categoryLevel2)); }

//   return new Promise((resolve, reject) => {
//     product.save().then(res => {
//       // 成功保存之后，执行其他逻辑
//       resolve({
//         result: res,
//         code: 0,
//         msg: 'success',
//       })
//     }, error => {
//       // 异常处理
//       reject({
//         result: error,
//         code: -1,
//         msg: 'failed',
//       })
//     });
//   })
// }

export async function getProductList(params) {
  Taro.showLoading({ title: "加载中..." });

  const queryProduct = new AV.Query('Product');
  if (params.status && params.status > 0) {
    queryProduct.equalTo('status', params.status);
  }
  queryProduct.include('categoryLevel1')
  queryProduct.include('categoryLevel2')
  queryProduct.descending("createdAt");
  return new Promise(resolve => {
    queryProduct.find().then(res => {
      resolve({
        result: JSON.parse(JSON.stringify(res)),
        code: 0,
        msg: 'success',
      })
    }).finally(() => {
      Taro.hideLoading();
    });
  })
}

export async function getProductById(params) {
  Taro.showLoading({ title: "加载中..." });

  const queryProduct = new AV.Query('Product');
  return new Promise(resolve => {
    queryProduct.get(params.product_id).then(res => {
      resolve({
        result: JSON.parse(JSON.stringify(res)),
        code: 0,
        msg: 'success',
      })
    }).catch((err) => {
      console.log(err);
      
    }).finally(() => {
      Taro.hideLoading();
    });
  })
}

export async function getProductByJxId(params) {
  Taro.showLoading({ title: "加载中..." });

  const queryProduct = new AV.Query('Product');
  queryProduct.equalTo('jxId', Number(params.id));

  return new Promise(resolve => {
    queryProduct.first().then(res => {
      resolve({
        result: JSON.parse(JSON.stringify(res)),
        code: 0,
        msg: 'success',
      })
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      Taro.hideLoading();
    });
  })
}