import AV from '@_gen/utils/leancloud-storage/dist/av-weapp.js';
import Taro from "@tarojs/taro";

const Order = AV.Object.extend("Order");

export async function createOrder(params) {
  const order = new Order(params);
  Object.keys(params).map(keyname => {
    order.set(`${keyname}`, params[keyname]);
    return keyname;
  });

  return new Promise((resolve, reject) => {
    order.save().then(
      res => {
        // 成功保存之后，执行其他逻辑
        resolve({
          result: res,
          code: 0,
          msg: "success"
        });
      },
      error => {
        // 异常处理
        reject({
          result: error,
          code: -1,
          msg: "failed"
        });
      }
    );
  });
}

export async function getOrderListByUserId(status) {
  Taro.showLoading({ title: "加载中..." });

  const queryOrder = new AV.Query("Order");
  queryOrder.equalTo("user", AV.User.current());
  if (status) {
    queryOrder.equalTo("status", status);
  }
  queryOrder.limit(50);
  queryOrder.descending("createdAt");
  return new Promise(resolve => {
    queryOrder.find().then(res => {
      Taro.hideLoading();
      const result = res.map(obj => {
        return {
          ...JSON.parse(JSON.stringify(obj)),
          createdAt: obj.createdAt
        };
      });
      resolve({
        result,
        code: 0,
        msg: "success"
      });
    });
  });
}

export async function getOrderDetailByOrderId(orderId) {
  Taro.showLoading({ title: "加载中..." });

  const queryOrder = new AV.Query("Order");
  return new Promise(resolve => {
    queryOrder.get(orderId).then(res => {
      Taro.hideLoading();

      resolve({
        result: {
          ...JSON.parse(JSON.stringify(res)),
          createdAt: res.createdAt
        },
        code: 0,
        msg: "success"
      });
    });
  });
}

export async function getOrderCount(status) {
  const queryOrder = new AV.Query("Order");
  if (status) {
    queryOrder.equalTo("status", status);
  }
  queryOrder.equalTo("user", AV.User.current());

  return new Promise(resolve => {
    queryOrder.count().then(res => {
      resolve({
        result: res,
        code: 0,
        msg: "success"
      });
    });
  });
}


// export async function updateOrderStatus(params) {
//   Taro.showLoading({ title: "加载中..." });

//   const { id, status } = params;
//   // 构建对象
//   const order = AV.Object.createWithoutData("Order", id);
//   order.set("status", status);

//   return new Promise((resolve, reject) => {
//     order.save().then(
//       res => {
//         Taro.hideLoading();

//         // 成功保存之后，执行其他逻辑
//         resolve({
//           result: res,
//           code: 0,
//           msg: "success"
//         });
//       },
//       error => {
//         // 异常处理
//         reject({
//           result: error,
//           code: -1,
//           msg: "failed"
//         });
//       }
//     );
//   });
// }

// updateOrderStatus(id) {
//   const { orderStore } = this.props;
//   orderStore.updateOrderStatus({ id, status: 7 }).then(() => {
//     this.getOrderDetail();
//   });
// }
// cancelOrder(id, newStatus) {
//   this.updateOrderStatus(id, newStatus);
// }
// this.cancelOrder(orderDetail.objectId);
