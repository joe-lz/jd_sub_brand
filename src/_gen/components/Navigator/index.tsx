import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component, useState, useEffect } from "react";
import { View, Button, Text, Navigator, Image } from "@tarojs/components";
import { AtIcon } from "taro-ui";

import "./index.scss";
import AV from "@_gen/utils/leancloud-storage/dist/av-weapp.js";
import getPath from "@_gen/utils/getPath";
import checkAuth from "@_gen/utils/checkAuth";
import makeImgLink from "@_gen/utils/makeImgLink";
import * as utils from "@_gen/utils";

function Index(props) {
  let {
    colorBg = "white",
    borderBottom = true,
    colorText, //
    onHistoryback = () => {},
    title = "我的标题",
  } = props;

  const [newOnHistoryback, setnewOnHistoryback] = useState();
  const [leftIconName, setleftIconName] = useState("");

  useEffect(() => {
    let newOnHistoryback = onHistoryback;
    let leftIconName = "";
    const pages = Taro.getCurrentPages();
    let current_page = pages.length > 0 ? pages[pages.length - 1].route : null;
    if (current_page) {
      const NORMAL_ENTRY = "pages/index/index";
      if (pages.length === 1 && current_page === NORMAL_ENTRY) {
        // scene 0 常规入口页  个性化title、个人中
        newOnHistoryback = null;
      }
      if (pages.length === 1 && current_page !== NORMAL_ENTRY) {
        // scene 1 非常规入口页 回首页
        newOnHistoryback = () => {
          Taro.redirectTo({ url: "/pages/index/index" });
        };
        leftIconName = "shouye_line";
      }
      if (pages.length > 1) {
        // scene 2 嵌套页面  返回 + 回首页
        newOnHistoryback = () => {
          Taro.navigateBack({ delta: 1 });
        };
        leftIconName = "jichu_zuo_line";
      }
    }
    setnewOnHistoryback(() => {
      return newOnHistoryback;
    });
    setleftIconName(leftIconName);
  }, []);

  return (
    <View
      className={`com-navigator ${borderBottom ? "com-navigator-border" : ""} ${props["my-class"]}`}
      style={{
        height: `${utils.NavBarHeight}px`,
        backgroundColor: colorBg,
      }}
    >
      <View className="com-navigator-statusbar" style={{ height: `${utils.StatusBarHeight}px` }}></View>
      {/* content */}
      <View className="com-navigator-content" style={{ height: "44px" }}>
        {newOnHistoryback ? (
          <View
            className="com-navigator-content-left"
            onClick={() => {
              newOnHistoryback();
            }}
          >
            <View className="com-navigator-content-left-icon">
              <AtIcon prefixClass="icon" value={leftIconName} size="16" color={colorText || "black"}></AtIcon>
            </View>
          </View>
        ) : null}
        <Text className="com-navigator-h4" style={{ color: colorText || "black" }}>
          {title}
        </Text>
      </View>
    </View>
  );
}

export default Index;
