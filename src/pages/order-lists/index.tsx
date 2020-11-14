import React, { Component } from "react";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { View, Button, Text, Navigator, Swiper, SwiperItem, Image } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import dayjs from "dayjs";

import "./index.scss";
import Tabbar from "../index/tabbar";
import { getOrderListByUserId } from "@_gen/service/order";
import { getOrderCount } from "@_gen/service/order";
import getPath from "@_gen/utils/getPath";
import Touchable from "@_gen/components/Touchable";
import { orderMenu, orderStatus, orderStatusActions } from "@_gen/utils/constants";
import Product from "@_gen/components/Product";
import ProductCard from "@_gen/components/ProductCard";
import JX_Button from "@_gen/components/Button";

require("@src/images/icon_status_order.png");
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: null,
      orderLists: [],
    };
  }

  async componentDidMount() {
    let {
      params: { status },
    } = getCurrentInstance().router;
    this.getlist();
    orderMenu.map((obj, index) => {
      if (Number(status) === obj.status) {
        this.setState({ current: index });
      }
    });
  }

  async getlist() {
    let {
      params: { status },
    } = getCurrentInstance().router;
    const orderLists = (await getOrderListByUserId(Number(status) || 0)).result;
    this.setState({ orderLists: this.state.orderLists.concat(orderLists) });
  }

  jump2Detail(objectId) {
    Taro.navigateTo({
      url: getPath({
        moduleName: "brand",
        url: `/pages/order-detail/index`,
        params: {
          orderId: orderId,
        },
      }),
    });
  }

  async onMenuClcik(menuItem, index) {
    this.setState({ current: index });
    const orderLists = (await getOrderListByUserId(menuItem.status)).result;
    this.setState({ orderLists });
  }

  _renderProduct({ orderItem }) {
    const { products } = orderItem;
    return products.map((profuctItem, profuctItemIndex) => {
      return (
        <Product
          key={`${profuctItemIndex + 1}`}
          productData={profuctItem}
          onClick={this.jump2Detail.bind(this, orderItem.objectId)}
          borderbottom={profuctItemIndex !== products.length - 1}
        />
      );
    });
  }

  _renderProductCard({ orderItem }) {
    const { products } = orderItem;
    return products.map((profuctItem, profuctItemIndex) => {
      return (
        <ProductCard
          key={`${profuctItemIndex + 1}`}
          productData={profuctItem}
          onClick={this.jump2Detail.bind(this, orderItem.objectId)}
          borderbottom={profuctItemIndex !== products.length - 1}
        />
      );
    });
  }

  _renderAction({ orderItem }) {
    return orderStatus[orderItem.status].actions.map((item, itemIndex) => {
      const action = orderStatusActions[item];
      const params = { orderDetail: orderItem, action };
      if (action && action.title_en === "express") {
        return (
          <Navigator
            style="height: 30px;line-height:28px;border:1rpx solid #E9ECF0;border-radius: 8rpx;padding: 0 30rpx;font-size:28rpx;"
            target="miniProgram"
            open-type="navigate"
            app-id="wx6885acbedba59c14"
            path={`pages/result/result?nu=${orderItem.trans_no}&com=${orderItem.trans_com}&querysource=third_xcx`}
          >
            查看物流
          </Navigator>
        );
      }
      return (
        <JX_Button
          key={`${itemIndex + 1}`}
          my-class="orderlists-item-btn"
          title={action.title}
          type={action.type}
          size="small"
          onClick={this.handleAction.bind(this, params)}
        />
      );
    });
  }

  handleAction(params) {
    const { orderDetail, action } = params;
    if (action.title_en === "cancel") {
      this.jump2Detail(orderDetail.objectId);
    }
    if (action.title_en === "pay") {
      this.jump2Detail(orderDetail.objectId);
    }
    if (action.title_en === "express") {
      this.jump2Detail(orderDetail.objectId);
    }
    if (action.title_en === "buy_again") {
      Taro.redirectTo({ url: `/pages/index/index` });
    }
  }
  render() {
    const { orderLists } = this.state;
    return (
      <View className="orderlist">
        {orderLists && (
          <View className="orderlists">
            <View className="orderlists-nav">
              {orderMenu.map((obj, index) => {
                const isActive = index === this.state.current;
                return (
                  <View
                    className={`orderlists-nav-item ${isActive && "orderlists-nav-item-active"}`}
                    key={`${index + 1}`}
                    onClick={() => {
                      this.onMenuClcik(obj, index);
                    }}
                  >
                    <Text className="">{obj.title}</Text>
                  </View>
                );
              })}
            </View>
            {orderLists.length > 0 ? (
              <View className="orderlists-scrollview">
                {orderLists.map((orderItem, orderItemIndex) => {
                  return (
                    <View>
                      <View style="height: 10px;background:#F2F2F2;"></View>
                      <View className="orderlists-item" key={`${orderItemIndex + 1}`}>
                        <View className="orderlists-item-brief">
                          <Text className="orderlists-item-time">{dayjs(orderItem.createdAt).format("YYYY/MM/DD HH:mm")}</Text>
                          <Text
                            className="orderlists-item-status"
                            style={{
                              color: orderStatus[orderItem.status].color,
                            }}
                          >
                            {orderStatus[orderItem.status].statusTitle}
                          </Text>
                        </View>
                        {orderItem.productType === 2 ? this._renderProductCard({ orderItem }) : this._renderProduct({ orderItem })}
                        <View className="orderlists-item-operations">{this._renderAction({ orderItem })}</View>
                      </View>
                    </View>
                  );
                })}
              </View>
            ) : (
              <Image className="orderlists-empty" mode="aspectFit" src="../../images/icon_status_order.png" />
            )}
          </View>
        )}
      </View>
    );
  }
}

export default Index;
