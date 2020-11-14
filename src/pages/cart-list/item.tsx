import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component, useState, useEffect } from "react";
import { View, Button, Text, Navigator, Image, Input, Checkbox } from "@tarojs/components";
import { AtSwipeAction } from "taro-ui";

import "./item.scss";
import AV from "@_gen/utils/leancloud-storage/dist/av-weapp.js";
import getPath from "@_gen/utils/getPath";
import checkAuth from "@_gen/utils/checkAuth";
import makeImgLink from "@_gen/utils/makeImgLink";
import Touchable from "@_gen/components/Touchable";
import JX_Button from "@_gen/components/Button";
import Price from "@_gen/components/Price";
import Counter from "@_gen/components/Counter";
import Logo from "@_gen/components/Logo";
import { updateCartById } from "@_gen/service/cart";
import { generateFilter } from "@_gen/utils/color";

function Index(props) {
  let {
    cartItem = {},
    isLast = false,
    checked = false,
    onItemSelectChange = () => {}, //
    onDelete = () => {},
  } = props;
  const { product_id, brand_id, skuinfo } = cartItem;
  const [selectedId, setselectedId] = useState();

  return (
    <View className="com-brandcart">
      <AtSwipeAction
        isOpened={cartItem.objectId === selectedId}
        onOpened={() => {
          setselectedId(cartItem.objectId);
        }}
        autoClose
        onClick={e => {
          Taro.showLoading({ title: "删除中..." });
          updateCartById({
            id: cartItem.objectId,
            values: { status: 2 },
          }).then(() => {
            onDelete(cartItem);
            Taro.hideLoading();
            Taro.showToast({
              title: "删除成功",
              icon: "success",
              duration: 1000,
            });
          });
        }}
        options={[
          {
            text: "删除",
            style: {
              backgroundColor: "#F05858",
              color: "white",
            },
          },
        ]}
      >
        <View className="com-brandcart-item">
          <Checkbox
            className="com-brandcart-radio com-brandcart-item-radio"
            value={cartItem}
            checked={checked}
            color={"#F05858"}
            onClick={() => {
              onItemSelectChange(cartItem);
            }}
          ></Checkbox>
          <View className={`com-brandcart-item-content ${!isLast ? "com-brandcart-item-border" : ""}`}>
            <Navigator
              className="com-brandcart-item-img"
              url={`/packages/brand/pages/product-detail/index?bId=${brand_id.jxId}&pId=${product_id.jxId}`}
            >
              <Image
                src={makeImgLink({
                  url: product_id.preview.url,
                  type: "jpg",
                })}
                mode="aspectFill"
                className="com-brandcart-item-img-content"
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
                  ...(product_id.preview.logo_pure
                    ? {
                        filter: generateFilter(product_id.preview.logo_color),
                      }
                    : {}),
                }}
                iconSrc={brand_id && brand_id[product_id.preview.logo_type]}
              />
            </Navigator>
            <View className="com-brandcart-item-body">
              <Text className="com-brandcart-item-body-title">{cartItem.product_id.card_name}</Text>
              <View className="com-brandcart-item-body-info">
                <Text className="com-brandcart-item-body-sku">{`已选：${Object.values(skuinfo).join("/")}`}</Text>
              </View>
              <View className="com-brandcart-item-body-operation">
                <Price size="normal" value={product_id.price_sale / 100} />
                <Counter
                  value={cartItem.number}
                  min={Number(product_id.startup)}
                  onChange={value => {
                    Taro.showLoading({ title: "加载中..." });
                    updateCartById({
                      id: cartItem.objectId,
                      values: { number: value },
                    }).then(() => {
                      onItemSelectChange();
                      Taro.hideLoading();
                    });
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </AtSwipeAction>
    </View>
  );
}

export default Index;
