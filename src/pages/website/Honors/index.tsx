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
  const web_honours = curBrand.web_honours || { web_honours: [] };

  return (
    <View>
      {web_honours.length > 0 && (
        <View className="com-brandWeb-section com-brandWeb-sectionHonors">
          <View className="brandWeb-section-title">
            <Text>{curBrand.web_honours_title || "品牌荣誉"}</Text>
          </View>
          <View className="com-brandWeb-sectionHonors-body">
            <Swiper
              style={{ width: "100%", height: "100%" }}
              indicatorColor="rgba(255,255,255,0.5)"
              indicatorActiveColor={curBrand.color_brand_dark || curBrand.color_brand}
              circular
              autoplay={false}
              onChange={e => {
                setswiperCurrent(e.currentTarget.current);
              }}
              previousMargin="180rpx"
              nextMargin="180rpx"
              // easingFunction='easeInOutCubic'
            >
              {web_honours.map((obj, index) => {
                return (
                  <SwiperItem key={`${index + 1}`}>
                    <View className="com-brandWeb-sectionHonors-imgcontent">
                      <Image
                        mode="aspectFill"
                        src={makeImgLink({
                          url: obj.img,
                          type: "jpg",
                        })}
                        className={`com-brandWeb-sectionHonors-img ${index !== swiperCurrent && "com-brandWeb-sectionHonors-img-small"}`}
                      />
                    </View>
                    {index === swiperCurrent && (
                      <View>
                        <Text className="com-brandWeb-sectionHonors-desc">{obj.title}</Text>
                      </View>
                    )}
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
