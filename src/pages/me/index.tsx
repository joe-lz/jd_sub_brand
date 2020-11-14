import React, { Component } from "react";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { View, Button, Text, Navigator, Swiper, SwiperItem } from "@tarojs/components";

import "./index.scss";
import Tabbar from "../index/tabbar";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let {
      params: { bId },
    } = getCurrentInstance().router;
    this.setState({ bId: Number(bId) });
  }

  render() {
    return (
      <View className="index">
        <Swiper>
          <SwiperItem>123</SwiperItem>
          <SwiperItem>456</SwiperItem>
        </Swiper>
        <Tabbar currentIndex={2} bId={this.state.bId} />
      </View>
    );
  }
}

export default Index;
