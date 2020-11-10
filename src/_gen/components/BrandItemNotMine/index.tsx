import Taro from "@tarojs/taro";
import React, { Component } from "react";
import { View, Text, Navigator } from "@tarojs/components";
import { AtIcon } from "taro-ui";

import "./index.scss";
import Logo from "../Logo";
import getPath from "@_gen/utils/getPath";

function Index(props) {
  const { brandItem = {} } = props;
  return (
    <View
      className={`com-brandItemNotMine com-brandItemNotMine-${props.platform}`}
      style={{
        background: `linear-gradient(315deg, ${brandItem.color_brand_light} 0%,${brandItem.color_brand_dark} 100%)`,
      }}
    >
      <Navigator
        className="com-brandItemNotMine-top`, `com-brandItemNotMine-top2"
        // url={getPath({
        //   url: `/pages/webviewShare/index?bId=${brandItem.jxId}&&brand_id=${brandItem.objectId}&&url=${REACT_APP_FRONT}/official/${brandItem.objectId}`,
        //   moduleName: 'public'
        // })}
        url={getPath({
          moduleName: "brand",
          // url: `/pages/webviewShare/index?bId=${brandItem.jxId}&&brand_id=${brandItem.objectId}&&url=${REACT_APP_FRONT}/official/${brandItem.objectId}`,
          url: `/pages/website/index`,
          params: {
            bId: brandItem.jxId,
          },
        })}
      >
        <Logo
          style={{
            width: "200px",
            height: "60px",
            margin: "0 auto",
          }}
          iconSrc={brandItem.logo_triple_horizontal_pure || brandItem.logo_triple_horizontal}
          iconColor="white"
        />
      </Navigator>
    </View>
  );
}

export default Index;
