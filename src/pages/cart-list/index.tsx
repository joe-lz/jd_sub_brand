import React, { Component } from "react";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { View, Button, Text, Navigator, Swiper, SwiperItem } from "@tarojs/components";

import "./index.scss";
import Tabbar from "../index/tabbar";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 1,
    };
  }

  componentDidMount() {
    let {
      params: { hidetab, bId },
    } = getCurrentInstance().router;
    this.setState({
      hidetab: Boolean(hidetab),
      bId,
    });
  }

  render() {
    return (
      <View className="index">
        <View className="index"></View>
        {this.state.hidetab ? null : <Tabbar currentIndex={1} bId={this.state.bId} />}
      </View>
    );
  }
}

export default Index;
