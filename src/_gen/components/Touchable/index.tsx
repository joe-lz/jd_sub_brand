import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component } from "react";
import { View, Button, Text, Navigator, Image } from "@tarojs/components";
import { AtIcon } from "taro-ui";

import "./index.scss";
import AV from "@_gen/utils/leancloud-storage/dist/av-weapp.js";
import getPath from "@_gen/utils/getPath";
import checkAuth from "@_gen/utils/checkAuth";
import makeImgLink from "@_gen/utils/makeImgLink";

function Index(props) {
  const { className, style, onClick, opentype, borderbottom } = props;

  return (
    <Button
      className={`com-touchable ${borderbottom ? "com-touchable-borderbottom" : ""} ${props['my-class']}`}
      style={style}
      hoverClass={onClick ? "com-touchable-hover" : null}
      onClick={() => {
        onClick ? onClick() : null;
      }}
      open-type={opentype}
      // target={this.props.target}
      // app-id={this.props['app-id']}
      // extra-data={this.props['extra-data']}
      // version={this.props.version}
    >
      {props.children}
    </Button>
  );
}

export default Index;
