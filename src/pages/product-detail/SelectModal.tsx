import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component, useState, useEffect } from "react";
import { View, Text, Swiper, SwiperItem, Image } from "@tarojs/components";
import { AtIcon } from "taro-ui";

import "./ImageSwiper.scss";
import Logo from "@_gen/components/Logo";
import AV from "@_gen/utils/leancloud-storage/dist/av-weapp.js";
import getPath from "@_gen/utils/getPath";
import checkAuth from "@_gen/utils/checkAuth";
import makeImgLink from "@_gen/utils/makeImgLink";
import { generateFilter } from "@_gen/utils/color";
import Price from "@_gen/components/Price";
import Touchable from "@_gen/components/Touchable";

function Index(props) {
  const [current, setcurrent] = useState(0);
  const {  } = props;
  return (
    <>
     
    </>
  );
}

export default Index;
