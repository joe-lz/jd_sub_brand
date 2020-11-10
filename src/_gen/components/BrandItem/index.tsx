import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component } from "react";
import { View, Button, Text, Navigator, Image } from "@tarojs/components";
import { AtIcon } from "taro-ui";

import "./index.scss";
import Logo from "../Logo";
import AV from "@_gen/utils/leancloud-storage/dist/av-weapp.js";
import getPath from "@_gen/utils/getPath";
import checkAuth from "@_gen/utils/checkAuth";
import makeImgLink from "@_gen/utils/makeImgLink";

function Index(props) {
  const { hideCard = false, brandItem = {}, mybrand = {} } = props;
  return (
    <View
      className={`com-brandItem com-brandItem-${props.platform}`}
      style={{
        background: `linear-gradient(315deg, ${brandItem.color_brand_light} 0%,${brandItem.color_brand_dark} 100%)`,
      }}
    >
      <View className="com-brandItem-top">
        <Logo
          style={{
            width: "200px",
            height: "60px",
            margin: "0 auto",
          }}
          iconSrc={brandItem.logo_triple_horizontal_pure || brandItem.logo_triple_horizontal}
          iconColor="white"
        />
      </View>
      <View className="com-brandItem-bottom">
        <Navigator
          className="com-brandItem-bottom-item"
          url={getPath({
            moduleName: "brand",
            url: `/pages/index/index`,
            params: {
              bId: brandItem.jxId,
            },
          })}
        >
          <View className="com-brandItem-bottom-item-icon">
            <AtIcon prefixClass="icon" value="qianbao_line" size="20" color="white"></AtIcon>
          </View>
          <Text className="com-brandItem-bottom-item-desc">专属商城</Text>
        </Navigator>
        <Navigator
          className="com-brandItem-bottom-item"
          url={getPath({
            moduleName: "public",
            url: `/pages/webview/index`,
            params: {
              // bId: brandItem.jxId,
              // brandId: brandItem.objectId,
              brandTitle: brandItem.title,
              url: encodeURIComponent(`${REACT_APP_FRONT}/brand/vis/${brandItem.objectId}?header=none`),
            },
          })}
        >
          <View className="com-brandItem-bottom-item-icon">
            <AtIcon prefixClass="icon" value="zhizuo_line" size="20" color="white"></AtIcon>
          </View>
          <Text className="com-brandItem-bottom-item-desc">品牌管理</Text>
        </Navigator>
        <Navigator
          className="com-brandItem-bottom-item"
          url={getPath({
            moduleName: "brand",
            // url: `/pages/webviewShare/index?bId=${brandItem.jxId}&&brand_id=${brandItem.objectId}&&url=${REACT_APP_FRONT}/official/${brandItem.objectId}`,
            url: `/pages/website/index`,
            params: {
              bId: brandItem.jxId,
            },
          })}
        >
          <View className="com-brandItem-bottom-item-icon">
            <AtIcon prefixClass="icon" value="shouye_line" size="20" color="white"></AtIcon>
          </View>
          <Text className="com-brandItem-bottom-item-desc">官网</Text>
        </Navigator>
      </View>
      {!hideCard && mybrand && (
        <Navigator
          className="com-brandItem-card"
          url={getPath({
            moduleName: "card",
            url: `/pages/index/index`,
            params: {
              bId: brandItem.jxId,
            },
          })}
        >
          <View className="com-brandItem-card-left">
            <View
              className="com-brandItem-card-left-avatar"
              style={
                mybrand.userbrand_id && mybrand.userbrand_id.avatar
                  ? {
                      backgroundImage: `url(${makeImgLink({
                        url: mybrand.userbrand_id.avatar,
                        type: "jpg",
                      })})`,
                    }
                  : {}
              }
            >
              {(!mybrand || !mybrand.userbrand_id || !mybrand.userbrand_id.avatar) && (
                <AtIcon prefixClass="icon" value="camera" size="24" color="#6C7D95"></AtIcon>
              )}
            </View>
          </View>
          <View className="com-brandItem-card-middle">
            <Text className="com-brandItem-p">
              {mybrand.userbrand_id && mybrand.userbrand_id.username ? mybrand.userbrand_id.username : "专属个人电子名片"}
            </Text>
            <Text className="com-brandItem-desc`, `com-brandItem-card-middle-desc">
              {mybrand.userbrand_id && mybrand.userbrand_id.position ? mybrand.userbrand_id.position : "信息传递更便捷"}
            </Text>
          </View>
          <View className="com-brandItem-card-right">
            <Text className="com-brandItem-desc">
              {mybrand.userbrand_id && mybrand.userbrand_id.username && mybrand.userbrand_id.position ? "查看名片" : "去完善"}
            </Text>
            <AtIcon prefixClass="icon" value="jichu_you_line" size="14" color="#6C7D95"></AtIcon>
          </View>
        </Navigator>
      )}
    </View>
  );
}

export default Index;
