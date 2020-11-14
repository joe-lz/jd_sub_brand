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
  return (
    <View className="com-tabfooter">
      <AtIcon prefixClass="icon" value="logo" size="18" color="#A7B6C9" className="com-tabfooter-icon"></AtIcon>
      <Text className="com-tabfooter-title">鲸喜科技</Text>
      <Text>技术支持</Text>
    </View>
  );
}

export default Index;
