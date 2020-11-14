import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component } from "react";
import { View, Button, Text, Navigator, Image } from "@tarojs/components";
import { AtIcon } from "taro-ui";

import "./index.scss";
import AV from "@_gen/utils/leancloud-storage/dist/av-weapp.js";
import getPath from "@_gen/utils/getPath";
import checkAuth from "@_gen/utils/checkAuth";
import makeImgLink from "@_gen/utils/makeImgLink";
import Touchable from "@_gen/components/Touchable";
import Logo from "@_gen/components/Logo";
import { generateFilter } from "@_gen/utils/color";

function Index(props) {
  const { productData, onClick } = props;

  return (
    <Touchable
      my-class="com-productcard"
      borderbottom={false}
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px 15px",
      }}
      onClick={
        onClick
          ? () => {
              onClick();
            }
          : null
      }
    >
      <View className="com-productcard-logo">
        <Image
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
          src={makeImgLink({
            url: productData && productData.curUserCard.front_img,
            type: "jpg_contain",
          })}
          mode="aspectFit"
        ></Image>
      </View>
      <View style={{ flex: 1 }}>
        <View className="com-productcard-middle">
          <View className="com-productcard-middle-content">
            <Text className="com-productcard-middle-title">{productData && productData.curUserCard.card.name}</Text>
          </View>
        </View>
        <View className="com-productcard-middle">
          <Text className="">{productData.texture}</Text>
        </View>
        <View className="com-productcard-middle">
          <View className="com-productcard-middle-content">
            <Text className="com-productcard-middle-content-price">￥{productData.price / 100}</Text>
          </View>
          <View className="com-productcard-middle-right">
            <Text className="">x{productData.number}</Text>
          </View>
        </View>
      </View>
    </Touchable>
  );
}

export default Index;
