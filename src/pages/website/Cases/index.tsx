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
  const web_cases = curBrand.web_cases || { web_cases: [] };

  return (
    <View>
      {web_cases.length > 0 && (
        <View className="com-brandWeb-section com-brandWeb-sectionClients">
          <View className="brandWeb-section-title">
            <Text>{curBrand.web_cases_title || "客户们说"}</Text>
          </View>
          <View className="com-brandWeb-sectionClients-body">
            {web_cases.length > 1 && (
              <Swiper
                style={{ width: "100%", height: "100%" }}
                indicatorColor="rgba(255,255,255,0.5)"
                indicatorActiveColor={curBrand.color_brand_dark || curBrand.color_brand}
                circular
                autoplay={false}
                onChange={e => {
                  setswiperCurrent(e.currentTarget.current)
                }}
                previousMargin="80rpx"
                nextMargin="80rpx"
                // easingFunction='easeInOutCubic'
              >
                {curBrand.web_cases.map((obj, index) => {
                  return (
                    <SwiperItem key={`${index + 1}`}>
                      <View className="com-brandWeb-sectionClients-content">
                        <Image
                          mode="aspectFill"
                          src={makeImgLink({
                            url: obj.img,
                            type: "jpg",
                          })}
                          className="com-brandWeb-sectionClients-avatar"
                        />
                        <View>
                          <Text className="com-brandWeb-sectionClients-title">{obj.name || "用户名"}</Text>
                          <Text className="com-brandWeb-sectionClients-position">{obj.title || "职位"}</Text>
                          <Text className="com-brandWeb-sectionClients-desc">{obj.desc || "描述"}</Text>
                        </View>
                      </View>
                    </SwiperItem>
                  );
                })}
              </Swiper>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

export default Index;
