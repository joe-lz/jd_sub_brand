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
  const { onClick, borderbottom, productData } = props;
  const { product_id, brand_id } = productData || {};

  return (
    <Touchable
      my-class="com-productinfo"
      borderbottom={borderbottom}
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
      {product_id && (
        <View className="com-productinfo-logo">
          <Image
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
            }}
            src={makeImgLink({
              url: product_id.preview.url,
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
              top: `${product_id.preview.logo_top}%`,
              left: `${product_id.preview.logo_left}%`,
              width: `${product_id.preview.logo_size}%`,
              height: `${product_id.preview.logo_size}%`,
              transform: `rotate3d(${product_id.preview.logo_rotate_x}, ${product_id.preview.logo_rotate_y}, ${product_id.preview.logo_rotate_z}, ${product_id.preview.logo_rotate_deg}deg)`,
              ...(product_id.preview.logo_pure ? { filter: generateFilter(product_id.preview.logo_color) } : {}),
            }}
            iconSrc={brand_id && brand_id[product_id.preview.logo_type]}
          />
        </View>
      )}
      {product_id && (
        <View style={{ flex: 1 }}>
          <View className="com-productinfo-middle">
            <View className="com-productinfo-middle-content">
              <Text className="com-productinfo-middle-title">{product_id.card_name}</Text>
            </View>
          </View>
          <View className="com-productinfo-middle">
            <Text className="com-productinfo-middle-desc">{Object.values(productData.skuinfo).join("、")}</Text>
          </View>
          <View className="com-productinfo-middle">
            <View className="com-productinfo-middle-content">
              <Text className="com-productinfo-middle-content-price">￥{product_id.price_sale / 100}</Text>
            </View>
            <View className="com-productinfo-middle-right">
              <Text className="com-productinfo-middle-desc">x{productData.number}</Text>
            </View>
          </View>
        </View>
      )}
    </Touchable>
  );
}

export default Index;
