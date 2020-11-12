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
  const windowWidth = Taro.getSystemInfoSync().windowWidth;
  const { productDetail, imageList, skuList, curBrand, handleCheckSkuSelect } = props;
  console.log(props);

  const imageListArr = [];
  if (imageList) {
    imageList.map(item => {
      if (item) {
        item.img_url.map(obj => {
          imageListArr.push(obj);
        });
      }
    });
  }

  return (
    <>
      {productDetail && imageList && skuList && curBrand && (
        <View className="com-ImageSwiper-section">
          <View className="com-ImageSwiper-swiperwrapper" style={{ height: `${windowWidth}px` }}>
            {imageListArr.length > 1 && (
              <View className="com-ImageSwiper-swiperwrapper-dots">
                {imageListArr.map((obj, index) => {
                  return (
                    <View
                      key={`${index + 1}`}
                      className={`com-ImageSwiper-swiperwrapper-dot ${current === index && "com-ImageSwiper-swiperwrapper-dot-active"}`}
                    ></View>
                  );
                })}
              </View>
            )}
            <Swiper
              style={{ width: "100%", height: "100%" }}
              duration={300}
              current={current}
              onChange={e => {
                setcurrent(e.currentTarget.current);
              }}
            >
              {imageListArr.map((obj, index) => {
                return (
                  <SwiperItem key={`${index + 1}`}>
                    <Image
                      style={{ position: "relative" }}
                      src={makeImgLink({
                        url: obj.url,
                        type: "jpg",
                      })}
                      mode="aspectFill"
                      className="com-ImageSwiper-swiperwrapper-image"
                    ></Image>
                    <Logo
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: 10,
                        top: `${obj.logo_top}%`,
                        left: `${obj.logo_left}%`,
                        width: `${obj.logo_size}%`,
                        height: `${obj.logo_size}%`,
                        transform: `rotate3d(${obj.logo_rotate_x}, ${obj.logo_rotate_y}, ${obj.logo_rotate_z}, ${obj.logo_rotate_deg}deg)`,
                        ...(obj.logo_pure ? { filter: generateFilter(obj.logo_color) } : {}),
                      }}
                      iconSrc={curBrand && curBrand[obj.logo_type]}
                    />
                  </SwiperItem>
                );
              })}
            </Swiper>
          </View>
          <View className="com-ImageSwiper-info">
            <Text className="com-ImageSwiper-info-title">{productDetail.title}</Text>
            <Text className="com-ImageSwiper-info-tag">优选</Text>
            <Text className="com-ImageSwiper-info-desc" style={{ display: "block" }}>
              {productDetail.desc}
            </Text>
            <Price size="large" value={productDetail.price_sale / 100} />
          </View>
          <Touchable
            onClick={() => {
              handleCheckSkuSelect();
            }}
          >
            <View className="com-ImageSwiper-choose">
              <Text className="" style={{ paddingRight: "30px" }}>
                规格
              </Text>
              <Text className="" style={{ flex: 1 }}>
                请选择：
                {skuList &&
                  skuList.map((obj, index) => {
                    return <Text key={`${index + 1}`}>{`${obj.name}、`}</Text>;
                  })}
              </Text>
              <AtIcon prefixClass="icon" value="jichu_you_line" size="14" color="#6C7D95"></AtIcon>
            </View>
          </Touchable>
        </View>
      )}
    </>
  );
}

export default Index;
