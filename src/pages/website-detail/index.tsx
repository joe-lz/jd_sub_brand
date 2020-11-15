import React, { Component } from "react";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { View, Button, Text, Navigator, Swiper, SwiperItem, RichText } from "@tarojs/components";
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
    this.state = {};
  }

  async componentDidMount() {
    Taro.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"],
    });
  }

  onShareAppMessage(res) {
    return {
      title: `产品详情`,
      // path: `/packages/brand/pages/index/index?bId=${curBrand.jxId}`
      // imageUrl: imgSrc,
    };
  }

  onShareTimeline(res) {
    return {
      title: `产品详情`,
    };
  }

  render() {
    let {
      params: { data },
    } = getCurrentInstance().router;
    return (
      <View className="brandWeb-sectionProducts-detailPage">
        <RichText nodes={data} />
      </View>
    );
  }
}

export default Index;
