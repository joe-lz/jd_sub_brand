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

require("./bg-address-line.jpg");
function Index(props) {
  const { onChange } = props;
  const [address, setaddress] = useState();

  const _chooseAddress = () => {
    Taro.chooseAddress().then((res) => {
      setaddress(res);
      onChange(res);
    });
  };

  return (
    <Touchable
      my-class="com-renderaddress"
      onClick={() => {
        _chooseAddress();
      }}
    >
      {address ? (
        <View className="com-renderaddress-content">
          <View className="com-renderaddress-content-left" style={{ flex: 1 }}>
            <Text className="com-renderaddress-content-title">{`${address.userName} ${address.telNumber}`}</Text>
            <Text className="com-renderaddress-content-desc">{`${address.provinceName} ${address.cityName} ${address.countyName} ${address.detailInfo}`}</Text>
          </View>
          <AtIcon prefixClass="icon" value="jichu_you_line" size="14" color="#6C7D95"></AtIcon>
        </View>
      ) : (
        <View className="com-renderaddress-content">
          <AtIcon prefixClass="icon" value="jichu_jia_line" size="20" color="#F05858"></AtIcon>
          <Text className="" style={{ flex: 1, paddingLeft: "15px" }}>
            请添加收货地址
          </Text>
          <AtIcon prefixClass="icon" value="jichu_you_line" size="14" color="#6C7D95"></AtIcon>
        </View>
      )}
      <Image className="com-renderaddress-bg" src="./bg-address-line.jpg"></Image>
    </Touchable>
  );
}

export default Index;
