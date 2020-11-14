import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component, useState, useEffect } from "react";
import { View, Button, Text, Navigator, Image, Input } from "@tarojs/components";
import { AtIcon } from "taro-ui";

import "./index.scss";
import AV from "@_gen/utils/leancloud-storage/dist/av-weapp.js";
import getPath from "@_gen/utils/getPath";
import checkAuth from "@_gen/utils/checkAuth";
import makeImgLink from "@_gen/utils/makeImgLink";

function Index(props) {
  const {
    style,
    title = "我是按钮",
    className,
    onClick = () => {},
    ghost = false,
    size = "normal", // small normal large
    type = "normal", // normal
    openType = null,
    disabled = false,
  } = props;

  // size
  const sizeMap = {
    small: { height: 30, fontSize: 14, radius: 4 },
    normal: { height: 40, fontSize: 14, radius: 4 },
    large: { height: 44, fontSize: 16, radius: 6 },
  };
  const curSize = sizeMap[size];
  return (
    <Button
      className={`com-button com-button-${type} ${ghost ? "com-button-border" : ""} ${props["my-class"]}`}
      style={{
        height: `${curSize.height}px`,
        lineHeight: `${curSize.height - 2}px`,
        borderRadius: `${curSize.radius}px`,
        ...style,
      }}
      hoverClass={style ? "" : "com-button-${type}-hover"}
      onClick={() => {
        onClick();
      }}
      type={type}
      disabled={disabled}
      open-type={openType}
    >
      <Text
        className="com-button-title"
        style={{
          fontSize: `${curSize.fontSize}px`,
        }}
      >
        {title}
      </Text>
    </Button>
  );
}

export default Index;
