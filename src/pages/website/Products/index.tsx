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
  let web_products = curBrand.web_products || { web_products: [] };

  return (
    <View>
      {web_products.length > 0 && (
        <View className="com-brandWeb-section com-brandWeb-sectionProducts">
          <View className="brandWeb-section-title">
            <Text>{curBrand.web_products_title || "核心产品"}</Text>
          </View>
          <View className="com-brandWeb-sectionProducts-body">
            {web_products.length > 1 && (
              <Swiper
                style={{ width: "100%", height: "100%" }}
                indicatorColor="rgba(255,255,255,0.5)"
                indicatorActiveColor={curBrand.color_brand_dark || curBrand.color_brand}
                circular
                autoplay={false}
                onChange={e => {
                  setswiperCurrent(e.currentTarget.current);
                }}
                previousMargin="100rpx"
                nextMargin="100rpx"
                // easingFunction='easeInOutCubic'
              >
                {web_products.map((obj, index) => {
                  return (
                    <SwiperItem key={`${index + 1}`}>
                      <View className="com-brandWeb-sectionProducts-imgcontent">
                        <Image
                          mode="aspectFill"
                          src={makeImgLink({
                            url: obj.img,
                            type: "jpg",
                          })}
                          className={`com-brandWeb-sectionProducts-img ${index !== swiperCurrent &&
                            "com-brandWeb-sectionProducts-img-small"}`}
                        />
                      </View>
                      {index === swiperCurrent && (
                        <View>
                          <View className="com-brandWeb-sectionProducts-itemtitle">
                            <Text className="com-brandWeb-sectionProducts-title">{obj.title}</Text>
                            {obj.detailPage && (
                              <View className="com-brandWeb-sectionProducts-title-desc">
                                <Text
                                  onClick={() => {
                                    Taro.navigateTo({
                                      url: getPath({
                                        moduleName: "brand",
                                        url: "/pages/website-detail/index",
                                        params: {
                                          data: obj.detailPage,
                                        },
                                      }),
                                    });
                                  }}
                                >
                                  查看详情
                                </Text>
                                <AtIcon prefixClass="icon" value="jichu_you_line" size="12" color="#266eff"></AtIcon>
                              </View>
                            )}
                          </View>
                          <Text className="com-brandWeb-sectionProducts-desc">{obj.desc}</Text>
                        </View>
                      )}
                    </SwiperItem>
                  );
                })}
              </Swiper>
            )}
            {web_products.length > 1 && (
              <View className="com-brandWeb-sectionProducts-dots">
                {web_products.map((obj, index) => {
                  return (
                    <View
                      className={`${index === swiperCurrent &&
                        "com-brandWeb-sectionProducts-dots-item-active"} com-brandWeb-sectionProducts-dots-item`}
                      style={index === swiperCurrent ? { backgroundColor: curBrand.color_brand_dark || curBrand.color_brand } : {}}
                      key={`${index + 1}`}
                    ></View>
                  );
                })}
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

export default Index;
