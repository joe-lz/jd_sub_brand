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
  const [invoiceInfo, setinvoiceInfo] = useState();
  const { onChange } = props;

  const _chooseInvoice = () => {
    Taro.chooseInvoiceTitle().then(res => {
      if (res) {
        setinvoiceInfo(res);
        onChange(res);
      }
    });
  };

  return (
    <Touchable
      my-class="com-renderinvoice-menu-item"
      onClick={() => {
        _chooseInvoice();
      }}
    >
      <Text className="" style={{ flex: 1 }}>
        发票信息
      </Text>
      {!invoiceInfo && (
        <View className="com-renderinvoice-menu-item-invoice">
          <Text className="com-renderinvoice-menu-item-invoice-desc">不开发票</Text>
        </View>
      )}
      {Boolean(invoiceInfo && Number(invoiceInfo.type) === 1) && (
        <View className="com-renderinvoice-menu-item-invoice">
          <Text className="com-renderinvoice-menu-item-invoice-desc">{invoiceInfo.title}</Text>
        </View>
      )}
      {Boolean(invoiceInfo && Number(invoiceInfo.type) === 0) && (
        <View className="com-renderinvoice-menu-item-invoice">
          <Text className="com-renderinvoice-menu-item-invoice-desc">{invoiceInfo.title}</Text>
          <Text className="com-renderinvoice-menu-item-invoice-desc">{invoiceInfo.taxNumber}</Text>
        </View>
      )}
      <AtIcon prefixClass="icon" value="jichu_you_line" size="14" color="#6C7D95"></AtIcon>
    </Touchable>
  );
}

export default Index;
