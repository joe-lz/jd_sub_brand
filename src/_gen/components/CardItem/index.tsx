import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component, useState, useEffect } from "react";
import { View, Button, Text, Navigator, Image } from "@tarojs/components";
import { AtIcon } from "taro-ui";

import "./index.scss";
import AV from "@_gen/utils/leancloud-storage/dist/av-weapp.js";
import getPath from "@_gen/utils/getPath";
import checkAuth from "@_gen/utils/checkAuth";
import makeImgLink from "@_gen/utils/makeImgLink";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animationMain: null, //正面
      animationBack: null, //背面
    };
    this.animation_main = null;
    this.animation_back = null;
  }

  async componentDidMount() {}

  rotateFn(id) {
    this.animation_main = Taro.createAnimation({
      duration: 400,
      timingFunction: "linear",
    });
    this.animation_back = Taro.createAnimation({
      duration: 400,
      timingFunction: "linear",
    });
    // 点击正面

    if (id == 1) {
      this.animation_main.rotateY(180).step();
      this.animation_back.rotateY(0).step();
      this.setState({
        animationMain: this.animation_main.export(),
        animationBack: this.animation_back.export(),
      });
    }
    // 点击背面
    else {
      this.animation_main.rotateY(0).step();
      this.animation_back.rotateY(-180).step();
      this.setState({
        animationMain: this.animation_main.export(),
        animationBack: this.animation_back.export(),
      });
    }
  }

  rotateFn_Ver(id) {
    this.animation_main = Taro.createAnimation({
      duration: 400,
      timingFunction: "linear",
    });
    this.animation_back = Taro.createAnimation({
      duration: 400,
      timingFunction: "linear",
    });
    // 点击正面

    if (id == 1) {
      this.animation_main.rotateX(180).step();
      this.animation_back.rotateX(0).step();
      this.setState({
        animationMain: this.animation_main.export(),
        animationBack: this.animation_back.export(),
      });
    }
    // 点击背面
    else {
      this.animation_main.rotateX(0).step();
      this.animation_back.rotateX(-180).step();
      this.setState({
        animationMain: this.animation_main.export(),
        animationBack: this.animation_back.export(),
      });
    }
  }

  render() {
    let { cardItem } = this.props;
    const { card_width, card_height } = cardItem || {};
    return (
      <View className={`${card_width > card_height ? "com-cardItem-main_ver" : "com-cardItem-main"}`}>
        <View
          className="com-cardItem-body com-cardItem-body1"
          style={{
            backgroundImage: `url(${makeImgLink({
              url: cardItem && cardItem.front_img,
              type: "jpg_contain",
            })})`,
          }}
          animation={this.state.animationMain}
          onClick={() => {
            if (card_width > card_height) {
              this.rotateFn_Ver(1);
            } else {
              this.rotateFn(1);
            }
          }}
        ></View>
        <View
          className={`com-cardItem-body ${card_width > card_height ? "com-cardItem-body2_ver" : "com-cardItem-body2"}`}
          animation={this.state.animationBack}
          style={{
            backgroundImage: `url(${makeImgLink({
              url: cardItem && cardItem.back_img,
              type: "jpg_contain",
            })})`,
          }}
          onClick={() => {
            if (card_width > card_height) {
              this.rotateFn_Ver(2);
            } else {
              this.rotateFn(2);
            }
          }}
        ></View>
      </View>
    );
  }
}

export default Index;
