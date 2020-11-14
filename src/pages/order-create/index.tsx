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
      params: { data },
    } = getCurrentInstance().router;
    console.log(data);
    
  }

  render() {
    return (
      <View className="index">
      </View>
    );
  }
}

export default Index;
