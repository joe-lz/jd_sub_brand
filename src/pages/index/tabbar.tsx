import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component } from "react";
import { View, Button, Text, Navigator, Image } from "@tarojs/components";
import { AtIcon } from "taro-ui";

import "./index.scss";
import Tabbar from "@_gen/components/Tabbar";

function Index(props) {
  return (
    <Tabbar
      onChange={index => {
        // this.setState({
        //   currentIndex: index,
        // });
      }}
      current={props.currentIndex}
      color="#000"
      activeColor="#F05858"
      list={[
        {
          pagePath: `pages/index/index?bId=${props.bId}`,
          text: "品牌商城",
          iconPath: "../../images/tabbar/icon1_light.png",
          selectedIconPath: "../../images/tabbar/icon1_light_active.png",
        },
        {
          pagePath: `pages/cart-list/index?bId=${props.bId}`,
          text: "购物车",
          iconPath: "../../images/tabbar/icon2_light.png",
          selectedIconPath: "../../images/tabbar/icon2_light_active.png",
        },
        {
          pagePath: `pages/me/index?bId=${props.bId}`,
          text: "我的",
          iconPath: "../../images/tabbar/icon3_light.png",
          selectedIconPath: "../../images/tabbar/icon3_light_active.png",
        },
      ]}
    />
  );
}

export default Index;
