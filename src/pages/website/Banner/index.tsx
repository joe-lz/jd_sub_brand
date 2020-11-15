import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component, useState, useEffect } from "react";
import { View, Button, Text, Navigator, Image, Swiper, SwiperItem } from "@tarojs/components";
import { AtIcon } from "taro-ui";

import "./index.scss";
import AV from "@_gen/utils/leancloud-storage/dist/av-weapp.js";
import getPath from "@_gen/utils/getPath";
import checkAuth from "@_gen/utils/checkAuth";
import makeImgLink from "@_gen/utils/makeImgLink";
import Logo from '@_gen/components/Logo'
import JX_Button from '@_gen/components/Button'

function Index(props) {
  const [swiperCurrent, setswiperCurrent] = useState(0);

  useEffect(() => {}, []);
  const { curBrand = {} } = props;
  let web_banners = curBrand.web_banners || { web_banners: [] };
  return (
    <View className="com-brandWeb-banner">
      {web_banners.length > 1 && (
        <Swiper
          style={{ width: "100%", height: "100%" }}
          indicatorColor="rgba(255,255,255,0.5)"
          indicatorActiveColor={curBrand.color_brand_dark || curBrand.color_brand}
          indicatorDots
          autoplay={false}
          onChange={e => {
            setswiperCurrent(e.currentTarget.current)
          }}
        >
          {web_banners.map((obj, index) => {
            return (
              <SwiperItem key={`${index + 1}`}>
                <View
                  className="com-brandWeb-banner-item"
                  style={{
                    backgroundImage: `url(${makeImgLink({ url: obj, type: "jpg" })})`,
                  }}
                ></View>
              </SwiperItem>
            );
          })}
        </Swiper>
      )}
      {web_banners.length > 1 && (
        <View className="com-brandWeb-banner-dots">
          {web_banners.map((obj, index) => {
            return (
              <View
                className={`${index === swiperCurrent ? "com-brandWeb-banner-dots-item-active" : ""} com-brandWeb-banner-dots-item`}
                style={index === swiperCurrent ? { backgroundColor: curBrand.color_brand_dark || curBrand.color_brand } : {}}
                key={`${index + 1}`}
              ></View>
            );
          })}
        </View>
      )}
      {web_banners.length === 1 && (
        <View
          className="com-brandWeb-banner-item"
          style={{
            backgroundImage: `url(${makeImgLink({ url: web_banners[0], type: "jpg" })})`,
          }}
        ></View>
      )}
      <View className="com-brandWeb-banner-content">
        <Logo
          style={{
            width: "200px",
            height: "100px",
          }}
          iconSrc={curBrand.logo_triple_horizontal_pure || curBrand.logo_triple_horizontal}
          iconColor="white"
        />
        <JX_Button
          style={{
            padding: "0 30px",
            backgroundColor: curBrand.color_brand_dark || curBrand.color_brand,
          }}
          title="联系我们"
          size="normal"
          type="warning"
          ghost
          onClick={() => {
            Taro.makePhoneCall({
              phoneNumber: curBrand.telNumber || curBrand.telephone,
            });
          }}
        />
      </View>
    </View>
  );
}

export default Index;
