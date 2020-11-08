import React, { Component } from "react";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { View, Button, Text, Navigator, Swiper, SwiperItem } from "@tarojs/components";

import "./index.scss";
import Tabbar from "@_gen/components/Tabbar";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
    };
  }

  componentDidMount() {}

  onShareAppMessage(res) {
    return {
      title: "鲸典设计",
      path: "/pages/index/index",
    };
  }

  render() {
    return (
      <View className="index">
        <Swiper>
          <SwiperItem>123</SwiperItem>
          <SwiperItem>456</SwiperItem>
        </Swiper>
        <Tabbar
          onChange={index => {
            // this.setState({
            //   currentIndex: index,
            // });
          }}
          current={this.state.currentIndex}
          color="#000"
          activeColor="#F05858"
          list={[
            {
              pagePath: "pages/index/index",
              text: "品牌商城",
              iconPath: "../../images/tabbar/icon1_light.png",
              selectedIconPath: "../../images/tabbar/icon1_light_active.png",
            },
            {
              pagePath: "pages/me/index",
              text: "购物车",
              iconPath: "../../images/tabbar/icon2_light.png",
              selectedIconPath: "../../images/tabbar/icon2_light_active.png",
            },
            {
              pagePath: "pages/me/index",
              text: "我的",
              iconPath: "../../images/tabbar/icon3_light.png",
              selectedIconPath: "../../images/tabbar/icon3_light_active.png",
            },
          ]}
        />
      </View>
    );
  }
}

export default Index;
