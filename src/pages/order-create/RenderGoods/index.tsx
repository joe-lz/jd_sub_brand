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
import Product from '@_gen/components/Product'

function Index(props) {
  const { orderProducts } = props;

  return (
    <View className="com-rendergoods-section">
      {orderProducts.map((obj, index) => {
        return (
          <Product
            key={`${index + 1}`}
            // productData={{
            //   product_id: obj.product_id,
            //   // sku: Object.values(obj.skuinfo).join(","),
            //   skuinfo: obj.skuinfo,
            //   number: obj.number
            // }}
            productData={obj}
            curBrand={obj.brand_id}
            borderbottom={index < orderProducts.length - 1}
          />
        );
      })}
    </View>
  );
}

export default Index;
