import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component } from "react";
import { View, Button, Text, Navigator, Image } from "@tarojs/components";
import { observer, inject } from "mobx-react";

import "./index.scss";
import { generateFilter } from "@_gen/utils/color";
import makeImgLink from "@_gen/utils/makeImgLink";

function Index(props) {
  const { iconColor, iconSrc, style = {} } = props;
  const filterStyle = iconColor ? { filter: generateFilter(iconColor) } : {};
  const calStyle = {
    ...filterStyle,
  };

  // <View
  //   className={classnames(`logo`)}
  //   style={style}
  // >
  //   <Image
  //     className={classnames(`logo-img`)}
  //     style={calStyle}
  //     mode='aspectFit'
  //     src={makeImgLink({ url: iconSrc })}
  //   />
  // </View>
  return (
    <Image
      className="com-logo-img"
      style={{
        ...style,
        ...calStyle,
      }}
      mode="widthFix"
      src={makeImgLink({ url: iconSrc })}
    />
  );
}

export default Index;
