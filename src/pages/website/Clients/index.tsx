import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component, useState, useEffect } from "react";
import { View, Button, Text, Navigator, Image, Swiper, SwiperItem } from "@tarojs/components";
import { AtIcon } from "taro-ui";

import "./index.scss";
import AV from "@_gen/utils/leancloud-storage/dist/av-weapp.js";
import getPath from "@_gen/utils/getPath";
import checkAuth from "@_gen/utils/checkAuth";
import chunk from "@_gen/utils/chunk";
import makeImgLink from "@_gen/utils/makeImgLink";

function Index(props) {
  const [swiperCurrent, setswiperCurrent] = useState(0);

  useEffect(() => {}, []);
  const { curBrand = {} } = props;
  const web_clients = curBrand.web_clients || { web_clients: [] };
  const itemArray = chunk(web_clients, 8);

  return (
    <View>
      {web_clients.length > 0 && (
        <View className="com-brandWeb-section com-brandWeb-sectionCases">
          <View className="brandWeb-section-title">
            <Text>{curBrand.web_clients_title || "他们也在用"}</Text>
          </View>
          <View className="com-brandWeb-sectionCases-body">
            <Swiper
              style={{ width: "100%", height: "100%" }}
              indicatorColor="rgba(255,255,255,0.5)"
              indicatorActiveColor={curBrand ? curBrand.color_brand_dark || curBrand.color_brand : "black"}
              // circular
              autoplay={false}
              onChange={e => {
                setswiperCurrent(e.currentTarget.current);
              }}
            >
              {itemArray.map((obj, index) => {
                return (
                  <SwiperItem key={`${index + 1}`}>
                    <View className="com-brandWeb-sectionCases-imgcontent">
                      {obj.map((item, itemIndex) => {
                        return (
                          <View key={`$${itemIndex + 1}`} className="com-brandWeb-sectionCases-imgItem">
                            <Image
                              mode="aspectFit"
                              src={makeImgLink({
                                url: item,
                                type: "jpg_contain",
                              })}
                              className="com-brandWeb-sectionCases-img"
                            />
                          </View>
                        );
                      })}
                    </View>
                  </SwiperItem>
                );
              })}
            </Swiper>
            <View className="com-brandWeb-sectionCases-dots">
              {itemArray.map((obj, index) => {
                return (
                  <View
                    className={`${index === swiperCurrent &&
                      "com-brandWeb-sectionCases-dots-item-active"} com-brandWeb-sectionCases-dots-item`}
                    style={
                      index === swiperCurrent
                        ? { backgroundColor: curBrand ? curBrand.color_brand_dark || curBrand.color_brand : "black" }
                        : {}
                    }
                    key={`${index + 1}`}
                  ></View>
                );
              })}
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

export default Index;
