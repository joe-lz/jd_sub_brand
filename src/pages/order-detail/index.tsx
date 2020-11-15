import React, { Component } from "react";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { View, Button, Text, Navigator, Swiper, SwiperItem, Image } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import dayjs from "dayjs";
import AV from "@_gen/utils/leancloud-storage/dist/av-weapp.js";

import "./index.scss";
import Tabbar from "../index/tabbar";
import { getOrderDetailByOrderId } from "@_gen/service/order";
import { getOrderCount } from "@_gen/service/order";
import getPath from "@_gen/utils/getPath";
import Touchable from "@_gen/components/Touchable";
import Product from "@_gen/components/Product";
import ProductCard from "@_gen/components/ProductCard";
import JX_Button from "@_gen/components/Button";
import { orderMenu, orderStatus, orderStatusActions } from "@_gen/utils/constants";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countText: "",
    };
  }

  async componentDidMount() {
    this.getOrderDetail();
  }

  getOrderDetail() {
    const {
      params: { orderId },
    } = getCurrentInstance().router;

    getOrderDetailByOrderId(orderId).then(res => {
      const orderDetail = res.result;
      this.setState({ orderDetail }, () => {
        if (orderDetail.status === 1) {
          const msTime = dayjs(orderDetail.createdAt).valueOf() + 1000 * 60 * 15 - Math.floor(Date.now());
          const time = Math.floor(msTime / 1000);
          if (time > 0) {
            this.countDown(time);
          } else {
            this.orderTimoutClose();
          }
        }
      });
    });
  }

  orderTimoutClose() {
    const { orderDetail } = this.state;
    Taro.showLoading({ title: "加载中..." });
    AV.Cloud.run("orderTimoutClose", { id: orderDetail.objectId })
      .then(() => {
        this.getOrderDetail();
      })
      .finally(() => {
        Taro.hideLoading();
      });
  }

  // 倒计时15分钟
  countDown(time) {
    let newTime = time;
    const timer = setInterval(() => {
      newTime = newTime - 1;
      if (newTime > 1) {
        const mintes = Math.floor(newTime / 60);
        const seconds = newTime % 60;
        const countText = `${mintes}分${seconds}秒后订单将会关闭，请及时支付`;
        this.setState({ countText });
      } else {
        clearInterval(timer);
        this.orderTimoutClose();
      }
    }, 1000);
  }

  _renderAction() {
    let { orderDetail } = this.state;

    return orderStatus[orderDetail.status].actions.map((item, itemIndex) => {
      const action = orderStatusActions[item];

      if (action && action.title_en === "express") {
        return (
          <Navigator
            style="height: 30px;line-height:28px;border:1rpx solid #E9ECF0;border-radius: 8rpx;padding: 0 30rpx;font-size:28rpx;"
            target="miniProgram"
            open-type="navigate"
            app-id="wx6885acbedba59c14"
            path={`pages/result/result?nu=${orderDetail.trans_no}&com=${orderDetail.trans_com}&querysource=third_xcx`}
          >
            查看物流
          </Navigator>
        );
      }
      return (
        <JX_Button
          key={`${itemIndex + 1}`}
          my-class="orderdetail-operations-btn"
          title={action.title}
          type={action.type}
          size="small"
          onClick={() => {
            this.handleAction({ orderDetail, action });
          }}
        />
      );
    });
  }

  _renderStatusBar() {
    let { orderDetail } = this.state;
    const curStatus = orderStatus[orderDetail.status];
    const title = orderDetail.status === 1 ? `待付款：￥${orderDetail.amount / 100}` : curStatus.statusTitle;
    const desc = orderDetail.status === 1 ? this.state.countText : curStatus.statusDesc;

    return (
      <View className="orderdetail-block orderdetail-status">
        <Text className="orderdetail-status-title">{title}</Text>
        <Text className="orderdetail-status-desc">{desc}</Text>
      </View>
    );
  }

  _renderProduct({ products, orderDetail }) {
    return products.map((profuctItem, profuctItemIndex) => {
      return <Product key={`${profuctItemIndex + 1}`} productData={profuctItem} borderbottom={profuctItemIndex !== products.length - 1} />;
    });
  }

  _renderProductCard({ products, orderDetail }) {
    return products.map((profuctItem, profuctItemIndex) => {
      return (
        <ProductCard key={`${profuctItemIndex + 1}`} productData={profuctItem} borderbottom={profuctItemIndex !== products.length - 1} />
      );
    });
  }

  handleAction({ orderDetail, action }) {
    if (action.title_en === "cancel") {
      // 注意：无论用户点击确定还是取消，Promise 都会 resolve。
      Taro.showModal({
        title: "提醒",
        content: "确认取消订单吗",
      }).then(res => {
        if (res.confirm) {
          Taro.showLoading({ title: "加载中..." });
          AV.Cloud.run("orderCancel", { id: orderDetail.objectId })
            .then(actionRes => {
              if (actionRes.code === 0) {
                this.getOrderDetail();
                Taro.showToast({
                  title: "取消成功",
                  icon: "success",
                  duration: 1000,
                });
              } else {
                Taro.showToast({
                  title: "操作失败",
                  icon: "none",
                  duration: 1000,
                });
              }
            })
            .finally(() => {
              Taro.hideLoading();
            });
        }
      });
    }
    if (action.title_en === "pay") {
      const params = {
        orderId: orderDetail.objectId,
        prepayId: orderDetail.prepayId,
      };
      AV.Cloud.run("orderPayAgain", params)
        .then(data => {
          const payparams = {
            appId: data.appId,
            nonceStr: data.nonceStr,
            package: data.package,
            paySign: data.paySign,
            signType: data.signType,
            timeStamp: data.timeStamp,
          };

          wx.requestPayment({
            ...payparams,
            success: payResult => {
              // 支付成功
              console.log({ payResult });
              Taro.showToast({
                title: "支付成功",
                icon: "success",
                duration: 1000,
              });
              // 更新
              this.getOrderDetail();
            },
            fail: payError => {
              console.log({ payError });
              Taro.showToast({
                title: "支付失败",
                icon: "none",
                duration: 1000,
              });
            },
          });
        })
        .catch(error => {
          console.warn({ error });
          // 错误处理
        });
    }
    if (action.title_en === "express") {
    }
    if (action.title_en === "buy_again") {
      Taro.redirectTo({ url: `/pages/index/index` });
    }
  }

  render() {
    const { orderDetail } = this.state;
    return (
      <View className="orderlist">
        {orderDetail && (
          <View className="orderdetail">
            {this._renderStatusBar()}
            <View className="orderdetail-block orderdetail-address">
              <AtIcon prefixClass="icon" value="location" size="24" color="black"></AtIcon>
              <View className="orderdetail-address-content">
                <View className="orderdetail-address-userinfo">
                  <Text className="orderdetail-address-username">{orderDetail.address.userName}</Text>
                  <Text className="orderdetail-address-mobile">{orderDetail.address.telNumber}</Text>
                </View>
                <Text className="orderdetail-address-location">
                  {`${orderDetail.address.provinceName} ${orderDetail.address.cityName} ${orderDetail.address.countyName} ${orderDetail.address.detailInfo}`}
                </Text>
              </View>
            </View>
            <View className="orderdetail-block orderdetail-productInfo">
              {orderDetail.productType === 2
                ? this._renderProductCard({ products: orderDetail.products })
                : this._renderProduct({ products: orderDetail.products })}
              <View className="orderdetail-productInfo-bottom">
                <View className="orderdetail-productInfo-menu">
                  <Text className="">商品金额</Text>
                  <Text className="orderdetail-productInfo-menu-desc">￥{orderDetail.price_product / 100}</Text>
                </View>
                <View className="orderdetail-productInfo-menu">
                  <Text className="">运费</Text>
                  <Text className="orderdetail-productInfo-menu-desc">￥{orderDetail.price_transportation / 100}</Text>
                </View>
              </View>
              <View className="orderdetail-productInfo-price">
                <Text className="">实付款：</Text>
                <Text className="orderdetail-productInfo-price-value">￥{orderDetail.amount / 100}</Text>
              </View>
            </View>
            <View className="orderdetail-block orderdetail-orderInfo">
              <View className="orderdetail-orderInfo-lists orderdetail-orderInfo-border">
                <View className="orderdetail-orderInfo-item">
                  <Text className="orderdetail-orderInfo-label">订单编号</Text>
                  <Text className="orderdetail-orderInfo-label-desc">：{orderDetail.objectId}</Text>
                </View>
                <View className="orderdetail-orderInfo-item">
                  <Text className="orderdetail-orderInfo-label">下单时间</Text>
                  <Text className="orderdetail-orderInfo-label-desc">：{dayjs(orderDetail.createdAt).format("YYYY/MM/DD HH:mm")}</Text>
                </View>
                {!!orderDetail && !!orderDetail.payType && (
                  <View className="orderdetail-orderInfo-item">
                    <Text className="orderdetail-orderInfo-label">支付方式</Text>
                    <Text className="orderdetail-orderInfo-label-desc">：{orderDetail ? orderDetail.payType : ""}</Text>
                  </View>
                )}
              </View>
              {orderDetail && orderDetail.invoice && (
                <View className="orderdetail-orderInfo-lists">
                  <View className="orderdetail-orderInfo-item">
                    <Text className="orderdetail-orderInfo-label">发票类型</Text>
                    <Text className="orderdetail-orderInfo-label-desc">：纸质发票 快递邮寄</Text>
                  </View>
                  <View className="orderdetail-orderInfo-item">
                    <Text className="orderdetail-orderInfo-label">发票抬头</Text>
                    <Text className="orderdetail-orderInfo-label-desc">：{orderDetail.invoice.title}</Text>
                  </View>
                  <View className="orderdetail-orderInfo-item">
                    <Text className="orderdetail-orderInfo-label">税号</Text>
                    <Text className="orderdetail-orderInfo-label-desc">：{orderDetail.invoice.taxNumber}</Text>
                  </View>
                  <View className="orderdetail-orderInfo-item">
                    <Text className="orderdetail-orderInfo-label">发票内容</Text>
                    <Text className="orderdetail-orderInfo-label-desc">：商品明细</Text>
                  </View>
                  <View className="orderdetail-orderInfo-item">
                    <AtIcon prefixClass="icon" value="yuan_xinxi_line" size="14" color="#A7B6C9"></AtIcon>
                    <Text className="" style={{ color: "#A7B6C9", paddingLeft: "2px" }}>
                      发票一般在完成订单后1-2工作日内邮寄出，请耐心等待
                    </Text>
                  </View>
                </View>
              )}
            </View>
            <View className="orderdetail-operations">
              <View className="orderdetail-operations-content">
                <Touchable opentype="contact" my-class="orderdetail-operations-left">
                  <AtIcon prefixClass="icon" value="kefu_line" size="20" color="black"></AtIcon>
                </Touchable>
                <View className="orderdetail-operations-right">{this._renderAction({ orderDetail })}</View>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default Index;
