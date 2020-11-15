import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component, useState, useEffect } from "react";
import { View, Button, Text, Navigator, Image, Swiper, SwiperItem } from "@tarojs/components";
import { AtIcon } from "taro-ui";

import "./index.scss";
import AV from "@_gen/utils/leancloud-storage/dist/av-weapp.js";
import getPath from "@_gen/utils/getPath";
import checkAuth from "@_gen/utils/checkAuth";
import makeImgLink from "@_gen/utils/makeImgLink";

function Index(props) {
  const [swiperCurrent, setswiperCurrent] = useState(0);

  useEffect(() => {}, []);
  const { curBrand = {} } = props;
  const web_superiority = curBrand.web_superiority || { web_superiority: [] };

  return (
    <View>
      {web_superiority.length > 0 && (
        <View className="com-brandWeb-section com-brandWeb-sectionAdvantage">
          <View className="brandWeb-section-title">
            <Text>{curBrand.web_superiority_title || "公司优势"}</Text>
          </View>
          <View className="com-brandWeb-sectionAdvantage-body">
            <Swiper
              style={{ width: "100%", height: "100%" }}
              indicatorColor="rgba(255,255,255,0.5)"
              indicatorActiveColor={curBrand.color_brand_dark || curBrand.color_brand}
              circular
              autoplay={false}
              onChange={e => {
                setswiperCurrent(e.currentTarget.current);
              }}
              previousMargin="50rpx"
              nextMargin="150rpx"
            >
              {web_superiority.length > 0 &&
                web_superiority.map((obj, index) => {
                  return (
                    <SwiperItem key={`${index + 1}`}>
                      <View
                        className="com-brandWeb-sectionAdvantage-imgcontent"
                        style={{
                          backgroundImage: `url(${makeImgLink({
                            url: obj.img,
                            type: "jpg",
                          })})`,
                        }}
                      >
                        <View className="com-brandWeb-sectionAdvantage-imgcontent-text">
                          <Text className="com-brandWeb-sectionAdvantage-title">{obj.title}</Text>
                          <Text className="com-brandWeb-sectionAdvantage-desc">{obj.desc}</Text>
                        </View>
                      </View>
                    </SwiperItem>
                  );
                })}
            </Swiper>
          </View>
        </View>
      )}
    </View>
  );
}

export default Index;
