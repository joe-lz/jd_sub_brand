export const orderStatusActions = {
  1: {
    title: '取消订单',
    title_en: 'cancel',
    type: 'normal',
  },
  2: {
    title: '微信支付',
    title_en: 'pay',
    type: 'error',
  },
  3: {
    title: '查看物流',
    title_en: 'express',
    type: 'normal',
  },
  4: {
    title: '再次购买',
    title_en: 'buy_again',
    type: 'normal',
  },
}

export const orderStatus = {
  1: {
    title: "待支付",
    color: "#F05858",
    actions: [1, 2],
    statusTitle: "待支付",
    statusDesc: "30分钟后该订单将关闭",
  },
  2: {
    // title: "处理中", 
    // color: "#F39C15",
    // actions: [4],
    // statusTitle: "待支付",
    // statusDesc: "30分钟后该订单将关闭",
  },
  3: {
    title: "待发货",
    color: "#F39C15",
    actions: [4],
    statusTitle: "商品紧锣密鼓制作中...",
    statusDesc: "我们将尽快发货",
  },
  4: {
    title: "已发货",
    color: "#F39C15",
    actions: [3, 4],
    statusTitle: "已发货",
    statusDesc: "快递将尽快送达",
  },
  5: {
    title: "已收货",
    color: "#0BB353",
    actions: [3, 4],
    statusTitle: "已收货",
    statusDesc: "感谢您的信任和支持~",
  },
  6: {
    title: "已关闭",
    color: "#A7B6C9",
    actions: [4],
    statusTitle: "已关闭",
    statusDesc: "未按时付款，交易自动关闭",
  },
  7: {
    title: "已取消",
    color: "#A7B6C9",
    actions: [4],
    statusTitle: "已取消",
    statusDesc: "您主动取消该订单",
  },
};

export const orderMenu = [
  {
    title: "全部",
    status: 0,
  },
  {
    title: "待付款",
    status: 1,
  },
  {
    title: "制作中",
    status: 3,
  },
  {
    title: "待收货",
    status: 4,
  },
  {
    // title: "退款/取消",
    title: "取消",
    status: 7
  }
];
