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

    };
  }

  async componentDidMount() {

  }

  renderOrders() {
    return (
      <View className="orderlist">
      
      </View>
    );
  }
}

export default Index;
