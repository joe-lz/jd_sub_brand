import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component, useState, useEffect } from "react";
import { View, Button, Text, Navigator, Image } from "@tarojs/components";
import { AtIcon } from "taro-ui";

import "./index.scss";
import AV from "@_gen/utils/leancloud-storage/dist/av-weapp.js";
import getPath from "@_gen/utils/getPath";
import checkAuth from "@_gen/utils/checkAuth";
import makeImgLink from "@_gen/utils/makeImgLink";
import Touchable from "@_gen/components/Touchable";

function Index(props) {
  const { price_product = [] } = props;
  return (
    <View className="com-renderprice-section com-renderprice-section2">
      <View className="com-renderprice-menu-item com-renderprice-menu-item2">
        <Text className="" style={{ flex: 1 }}>
          商品金额
        </Text>
        <Text className="com-renderprice-menu-item2-price">¥{price_product / 100}</Text>
      </View>
      <View className="com-renderprice-menu-item com-renderprice-menu-item2">
        <Text className="" style={{ flex: 1 }}>
          运费
        </Text>
        <Text className="com-renderprice-menu-item2-price">¥0</Text>
      </View>
      <View className="com-renderprice-menu-item com-renderprice-menu-item3">
        <Text className="" style={{ flex: 1, textAlign: "right" }}>
          实付款：
        </Text>
        <Text className="com-renderprice-menu-item2-price">¥{price_product / 100}</Text>
      </View>
    </View>
  );
}

export default Index;
