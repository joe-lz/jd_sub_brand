import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component, useState, useEffect } from "react";
import { View, Button, Text, Navigator, Image, Swiper, SwiperItem } from "@tarojs/components";
import { AtIcon } from "taro-ui";

import "./index.scss";
import AV from "@_gen/utils/leancloud-storage/dist/av-weapp.js";
import getPath from "@_gen/utils/getPath";
import checkAuth from "@_gen/utils/checkAuth";
import makeImgLink from "@_gen/utils/makeImgLink";
import Touchable from "@_gen/components/Touchable";

function Index(props) {
  useEffect(() => {}, []);
  const { curBrand = {} } = props;
  const openLocation = () => {
    if (curBrand && curBrand.address_latitude && curBrand.address_longitude) {
      Taro.openLocation({
        latitude: Number(curBrand.address_latitude),
        longitude: Number(curBrand.address_longitude),
        name: `${curBrand.address}`,
        scale: 12,
      });
    }
  };

  return (
    <View className="com-brandWeb-section com-brandWeb-sectionContact">
      <View className="com-brandWeb-sectionContact-content">
        <View className="brandWeb-section-title">
          <Text>联系我们</Text>
        </View>
        <View className="com-brandWeb-sectionContact-body">
          {!!(curBrand && (curBrand.telNumber || curBrand.telephone)) && (
            <Touchable
              my-class="com-brandWeb-sectionContact-body-item com-brandWeb-sectionContact-body-border"
              onClick={() => {
                Taro.makePhoneCall({
                  phoneNumber: curBrand.telNumber || curBrand.telephone,
                });
              }}
            >
              <View className="com-brandWeb-sectionContact-body-item-icon">
                <AtIcon prefixClass="icon" value="dianhua" size="20" color="#6C7D95"></AtIcon>
              </View>
              <Text className="com-brandWeb-sectionContact-body-item-title">{curBrand.telNumber || curBrand.telephone}</Text>
              <View className="com-brandWeb-sectionContact-body-item-icon-right">
                <AtIcon prefixClass="icon" value="jichu_you_line" size="14" color="#6C7D95"></AtIcon>
              </View>
            </Touchable>
          )}
          {!!(curBrand && curBrand.email) && (
            <Touchable
              my-class="com-brandWeb-sectionContact-body-item com-brandWeb-sectionContact-body-border"
              onClick={() => {
                Taro.setClipboardData({
                  data: curBrand.email,
                });
              }}
            >
              <View className="com-brandWeb-sectionContact-body-item-icon">
                <AtIcon prefixClass="icon" value="youxiang" size="20" color="#6C7D95"></AtIcon>
              </View>
              <Text className="com-brandWeb-sectionContact-body-item-title">{curBrand.email}</Text>
              <View className="com-brandWeb-sectionContact-body-item-icon-right">
                <AtIcon prefixClass="icon" value="jichu_you_line" size="14" color="#6C7D95"></AtIcon>
              </View>
            </Touchable>
          )}
          {!!(curBrand && curBrand.address) && (
            <Touchable
              my-class="com-brandWeb-sectionContact-body-item"
              onClick={() => {
                openLocation();
              }}
            >
              <View className="com-brandWeb-sectionContact-body-item-icon">
                <AtIcon prefixClass="icon" value="weizhi_fill" size="20" color="#6C7D95"></AtIcon>
              </View>
              <Text className="com-brandWeb-sectionContact-body-item-title">{curBrand.address}</Text>
              {Boolean(curBrand && curBrand.address_latitude && curBrand.address_longitude) && (
                <View className="com-brandWeb-sectionContact-body-item-icon-right">
                  <AtIcon prefixClass="icon" value="jichu_you_line" size="14" color="#6C7D95"></AtIcon>
                </View>
              )}
            </Touchable>
          )}
        </View>
      </View>
    </View>
  );
}

export default Index;
