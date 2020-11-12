import AV from '@_gen/utils/leancloud-storage/dist/av-weapp.js';

const ShopCart = AV.Object.extend('ShopCart');


// 添加到购物车
export async function addCart(params) {
  return new Promise((resolve, reject) => {
    let {product_id, brand_id, user_id, company_id, skuinfo, number} = params
    product_id = AV.Object.createWithoutData('Product', product_id)
    brand_id = AV.Object.createWithoutData('Brand', brand_id)
    user_id = AV.Object.createWithoutData('User', user_id)
    company_id = AV.Object.createWithoutData('Company', company_id)
    // 先查询是否有相同sku在购物车
    const queryShopCart = new AV.Query('ShopCart');
    queryShopCart.equalTo('product_id', product_id);
    queryShopCart.equalTo('brand_id', brand_id);
    queryShopCart.equalTo('user_id', user_id);
    queryShopCart.equalTo('company_id', company_id);
    queryShopCart.equalTo('skuinfo', skuinfo);
    queryShopCart.equalTo('status', 1);
    queryShopCart.find().then(async cartlist => {
      if (cartlist.length > 0) {
        const item = JSON.parse(JSON.stringify(cartlist[0]))
        // 更新number
        const result = await updateCartById({
          id: item.objectId,
          values: {
            number: item.number + number
          }
        })
        resolve(result)
      } else {
        // 构建对象
        const shopcart = new ShopCart();
        shopcart.set('product_id', product_id);
        shopcart.set('brand_id', brand_id);
        shopcart.set('user_id', user_id);
        shopcart.set('company_id', company_id);
        shopcart.set('skuinfo', skuinfo);
        shopcart.set('number', number);
        shopcart.set('status', 1);
        shopcart.save().then(res => {
          // 成功保存之后，执行其他逻辑
          resolve({
            result: res,
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
      }
    });
  })
}


export async function updateCartById(params) {
  // 构建对象
  const ShopCartInstance = AV.Object.createWithoutData('ShopCart', params.id);
  const { values } = params;
  Object.keys(values).map(obj => {
    ShopCartInstance.set(`${obj}`, values[obj]);
    return obj;
  })

  return new Promise((resolve, reject) => {
    ShopCartInstance.save().then(res => {
      // 成功保存之后，执行其他逻辑
      resolve({
        result: res,
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

export async function getCartList() {
  const queryShopCart = new AV.Query('ShopCart');
  queryShopCart.equalTo('user_id', AV.User.current());
  queryShopCart.equalTo('status', 1);
  queryShopCart.include('product_id')
  queryShopCart.include('brand_id')
  queryShopCart.include('company_id')
  queryShopCart.limit(20)
  queryShopCart.descending('createdAt')
  return new Promise(resolve => {
    queryShopCart.find().then(res => {
      resolve({
        result: JSON.parse(JSON.stringify(res)),
        code: 0,
        msg: 'success',
      })
    });
  })
}

export async function getCartCount() {
  const queryShopCart = new AV.Query('ShopCart');
  queryShopCart.equalTo('user_id', AV.User.current());
  queryShopCart.equalTo('status', 1);

  return new Promise(resolve => {
    queryShopCart.count().then(res => {
      resolve({
        result: res,
        code: 0,
        msg: 'success',
      })
    });
  })
}
