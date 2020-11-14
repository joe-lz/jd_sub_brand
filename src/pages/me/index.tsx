import React, { Component } from "react";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { View, Button, Text, Navigator, Swiper, SwiperItem } from "@tarojs/components";
import { AtIcon } from "taro-ui";

import "./index.scss";
import Tabbar from "../index/tabbar";
import { getBrandByJxId, addToMyBrands } from "@_gen/service/brand";
import { getOrderCount } from "@_gen/service/order";
import getPath from "@_gen/utils/getPath";
import Touchable from "@_gen/components/Touchable";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curBrand: null,
      systemInfo: {},
      status1: 0,
      status3: 0,
      status4: 0,
    };
  }

  async componentDidMount() {
    let {
      params: { bId },
    } = getCurrentInstance().router;
    this.setState({ bId: Number(bId) });

    // 获取当前品牌
    const curBrand = await getBrandByJxId({ id: Number(bId) });
    this.setState({
      curBrand: curBrand.result,
      status1: (await getOrderCount(1)).result, // 待支付
      status3: (await getOrderCount(3)).result, // 待发货
      status4: (await getOrderCount(4)).result, // 已发货
      systemInfo: Taro.getSystemInfoSync(),
    });
  }

  _goDetail({ status }) {
    Taro.navigateTo({
      url: getPath({
        moduleName: "public",
        url: `/pages/order-lists/index`,
        params: {
          status,
        },
      }),
    });
  }

  renderOrders() {
    const { status1, status3, status4 } = this.state;
    return (
      <View className="brandcenter-ordermenus">
        <Button
          className="brandcenter-btn brandcenter-ordermenus-top"
          hoverClass="brandcenter-btn-hover"
          onClick={() => {
            this._goDetail({ status: 0 });
          }}
        >
          <Text className="brandcenter-ordermenus-top-title">订单管理</Text>
          <Text className="brandcenter-ordermenus-top-desc">全部订单</Text>
          <AtIcon prefixClass="icon" value="jichu_you_line" size="14" color="#6C7D95"></AtIcon>
        </Button>
        <View className="brandcenter-ordermenus-content">
          <Button
            className="brandcenter-btn brandcenter-ordermenus-item"
            hoverClass="brandcenter-btn-hover"
            onClick={() => {
              this._goDetail({ status: 1 });
            }}
          >
            <AtIcon prefixClass="icon" value="qianbao_line" size="26" color="#F05858"></AtIcon>
            <Text className="brandcenter-ordermenus-item-desc">待付款</Text>
            {status1 ? <Text className="brandcenter-btn-number">{status1}</Text> : null}
          </Button>
          <Button
            className="brandcenter-btn brandcenter-ordermenus-item"
            hoverClass="brandcenter-btn-hover"
            onClick={() => {
              this._goDetail({ status: 3 });
            }}
          >
            <AtIcon prefixClass="icon" value="zhizuo_line" size="26" color="#F05858"></AtIcon>
            <Text className="brandcenter-ordermenus-item-desc">制作中</Text>
            {status3 ? <Text className="brandcenter-btn-number">{status3}</Text> : null}
          </Button>
          <Button
            className="brandcenter-btn brandcenter-ordermenus-item"
            hoverClass="brandcenter-btn-hover"
            onClick={() => {
              this._goDetail({ status: 4 });
            }}
          >
            <AtIcon prefixClass="icon" value="kuaidi_line" size="26" color="#F05858"></AtIcon>
            <Text className="brandcenter-ordermenus-item-desc">待收货</Text>
            {status4 ? <Text className="brandcenter-btn-number">{status4}</Text> : null}
          </Button>
          <Button
            className="brandcenter-btn brandcenter-ordermenus-item"
            hoverClass="brandcenter-btn-hover"
            onClick={() => {
              this._goDetail({ status: 7 });
            }}
          >
            <AtIcon prefixClass="icon" value="tuikuan_line" size="26" color="#F05858"></AtIcon>
            {/* <Text className="brandcenter-ordermenus-item-desc">退款/取消</Text> */}
            <Text className="brandcenter-ordermenus-item-desc">取消</Text>
            {/* {status7 ? <Text className="brandcenter-btn-number">{status7}</Text>} : null*/}
          </Button>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View className="brandcenter">
        <View style="height:10px"></View>
        {this.renderOrders()}
        <View style="height:10px"></View>
        <View className="brandcenter-btn brandcenter-menuItem">
          <Navigator
            className="brandcenter-menuItem-content"
            target="miniProgram"
            open-type="navigate"
            app-id={WEAPP_APPID_TUGECAO}
            extra-data={{
              id: 134196,
              customData: {
                clientVersion: this.state.systemInfo.version,
                os: this.state.systemInfo.model,
                osVersion: this.state.systemInfo.system,
                // clientInfo: this.state.systemInfo.,
                // netType: this.state.systemInfo.,
                // imei: this.state.systemInfo.,
                // customInfo: this.state.systemInfo.,
              },
            }}
            version="release"
          >
            <Text className="">用户反馈</Text>
            <AtIcon prefixClass="icon" value="jichu_you_line" size="14" color="#6C7D95"></AtIcon>
          </Navigator>
        </View>
        <View className="brandcenter-btn brandcenter-menuItem">
          <Touchable opentype="contact" my-class="brandcenter-menuItem-content">
            <Text className="brandcenter-menuItem-title">联系客服</Text>
            <Text className="brandcenter-menuItem-desc">08:00-18:00</Text>
            <AtIcon prefixClass="icon" value="jichu_you_line" size="14" color="#6C7D95"></AtIcon>
          </Touchable>
        </View>
        <Tabbar currentIndex={2} bId={this.state.bId} />
      </View>
    );
  }
}

export default Index;
