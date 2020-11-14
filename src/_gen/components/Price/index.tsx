import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component } from "react";
import { View, Button, Text, Navigator, Image } from "@tarojs/components";
import { AtIcon } from "taro-ui";

import "./index.scss";
import AV from "@_gen/utils/leancloud-storage/dist/av-weapp.js";
import getPath from "@_gen/utils/getPath";
import checkAuth from "@_gen/utils/checkAuth";
import makeImgLink from "@_gen/utils/makeImgLink";

function Index(props) {
  const {
    value = 164.95,
    size = "normal", //normal, large
    style,
    iconStyle,
    textStyle,
  } = props;
  
  return (
    <Text className={`com-price com-price-${size}`} style={style}>
      <Text className={`com-price-icon`} style={iconStyle}>
        ¥
      </Text>
      <Text className={`com-price-value`} style={textStyle}>
        {value}
      </Text>
    </Text>
  );
}

export default Index;
