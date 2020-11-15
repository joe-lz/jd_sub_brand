import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component, useState, useEffect } from "react";
import { View, Button, Text, Navigator, Image, Swiper, SwiperItem } from "@tarojs/components";
import { AtModal } from "taro-ui";

import "./index.scss";
import AV from "@_gen/utils/leancloud-storage/dist/av-weapp.js";
import getPath from "@_gen/utils/getPath";
import checkAuth from "@_gen/utils/checkAuth";
import makeImgLink from "@_gen/utils/makeImgLink";

function Index(props) {
  const [isOpened, setisOpened] = useState(false);

  useEffect(() => {}, []);
  const { curBrand = {} } = props;
  return (
    <>
      {curBrand.web_desc_img && (
        <View className="com-brandWeb-section com-brandWeb-sectionIntro">
          <AtModal
            isOpened={isOpened}
            title="公司简介"
            confirmText="确认"
            onConfirm={() => {
              setisOpened(false);
            }}
            content={curBrand.web_desc_content}
          />
          <View
            className="com-brandWeb-sectionIntro-content"
            onClick={() => {
              setisOpened(true);
            }}
          >
            <View className="brandWeb-section-title">
              <Text>公司简介</Text>
            </View>
            <View className="com-brandWeb-sectionIntro-body">
              <Image
                src={makeImgLink({
                  url: curBrand ? curBrand.web_desc_img : "",
                  type: "jpg",
                })}
                mode="aspectFill"
              />
              <Text className="com-brandWeb-sectionIntro-body-desc">{curBrand.web_desc_content}</Text>
              <Text className="com-brandWeb-sectionIntro-body-btn">展开</Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
}

export default Index;
