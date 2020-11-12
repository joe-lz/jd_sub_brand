import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component } from "react";
import { View, Button, Text, Navigator, Image } from "@tarojs/components";
import { AtIcon } from "taro-ui";

import "./index.scss";
import Logo from "@_gen/components/Logo";
import AV from "@_gen/utils/leancloud-storage/dist/av-weapp.js";
import getPath from "@_gen/utils/getPath";
import checkAuth from "@_gen/utils/checkAuth";
import makeImgLink from "@_gen/utils/makeImgLink";
import { generateFilter } from "@_gen/utils/color";
import Price from '@_gen/components/Price'

function Index(props) {
  const itemWidth = (Taro.getSystemInfoSync().windowWidth - 30 - 15) / 2;

  let { curBrand, productItem, bId } = props;
  productItem = productItem || {};
  let preview = productItem.preview || {};
  return (
    <View className="">
      <Navigator
        url={getPath({
          moduleName: "brand",
          url: "/pages/product-detail/index",
          params: {
            bId: bId,
            pId: productItem.jxId,
          },
        })}
        className="com-brandshopItem"
        style={{ width: `${itemWidth}px` }}
      >
        <View className="com-brandshopItem-img" style={{ height: `${itemWidth}px` }}>
          <Image
            src={makeImgLink({
              url: preview ? preview.url : "",
              type: "jpg",
            })}
            mode="aspectFill"
          ></Image>
          <Logo
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 10,
              top: `${preview.logo_top}%`,
              left: `${preview.logo_left}%`,
              width: `${preview.logo_size}%`,
              height: `${preview.logo_size}%`,
              transform: `rotate3d(${preview.logo_rotate_x}, ${preview.logo_rotate_y}, ${preview.logo_rotate_z}, ${preview.logo_rotate_deg}deg)`,
              ...(preview.logo_pure ? { filter: generateFilter(preview.logo_color) } : {}),
            }}
            iconSrc={curBrand ? curBrand[preview.logo_type] : ""}
          />
        </View>
        <View className="com-brandshopItem-bottom">
          <Text className="com-brandshopItem-bottom-title">{productItem.card_name}</Text>
          <Price value={productItem.price_sale / 100} style={{}} iconStyle={{ fontSize: "14px" }} textStyle={{ fontSize: "14px" }} />
        </View>
      </Navigator>
    </View>
  );
}

export default Index;
