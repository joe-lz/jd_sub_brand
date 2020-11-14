import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component, useState, useEffect } from "react";
import { View, Text, Swiper, SwiperItem, Image, Input } from "@tarojs/components";
import { AtIcon } from "taro-ui";

import "./SelectModal.scss";
import Logo from "@_gen/components/Logo";
import AV from "@_gen/utils/leancloud-storage/dist/av-weapp.js";
import getPath from "@_gen/utils/getPath";
import checkAuth from "@_gen/utils/checkAuth";
import makeImgLink from "@_gen/utils/makeImgLink";
import { generateFilter } from "@_gen/utils/color";
import Price from "@_gen/components/Price";
import Counter from "@_gen/components/Counter";
import Touchable from "@_gen/components/Touchable";
import JX_Button from "@_gen/components/Button";

function Index(props) {
  const [skuSelected, setskuSelected] = useState({});
  const [number, setnumber] = useState(1);

  const { productDetail, onChange, showPopup, imgPreview, onPopupChange, onSubmit, skuList } = props;
  useEffect(() => {
    if (productDetail.startup || Number(productDetail.startup)) {
      setnumber(Number(productDetail.startup));
    }
  }, []);

  const _handleSkuSelecte = ({ skuObj, valueObj }) => {
    skuSelected[skuObj.objectId] = valueObj;
    setskuSelected(skuSelected);
    onChange({ skuSelected, number });
  };

  return (
    <>
      <View className={`com-selectModal-popup ${showPopup ? "com-selectModal-popup-active" : ""}`} catchtouchmove="true">
        <View
          className={`com-selectModal-popup-placeholder ${showPopup && "com-selectModal-popup-placeholder-active"}`}
          onClick={() => {
            onPopupChange({ showPopup: false });
          }}
        ></View>
        <View className={`com-selectModal-popup-content ${showPopup && "com-selectModal-popup-content-active"}`}>
          <Touchable
            className="com-selectModal-popup-close"
            my-class="com-selectModal-popup-close"
            onClick={() => {
              onPopupChange({ showPopup: false });
            }}
          >
            <AtIcon prefixClass="icon" value="jichu_guanbi_line" size="16" color="#6C7D95"></AtIcon>
          </Touchable>
          <View style={{ padding: "15px" }}>
            <View className="com-selectModal-popup-top">
              <Image src={imgPreview} mode="aspectFill" className="com-selectModal-popup-top-image" />
              <View className="com-selectModal-popup-top-right">
                <Price size="large" value={productDetail.price_sale / 100} />
                <Text className="">
                  已选：{Object.values(skuSelected).join(" ")} {number}件
                </Text>
              </View>
            </View>
            <View style={{ paddingBottom: "15px", minHeight: "150px" }}>
              {skuList.map((skuObj, skuIndex) => {
                const valueArr = skuObj.value.split(",");
                return (
                  <View className="com-selectModal-popup-middle" key={`${skuIndex + 1}`}>
                    <Text className="com-selectModal-popup-middle-label">{skuObj.name}</Text>
                    <View className="com-selectModal-popup-middle-list">
                      {valueArr &&
                        valueArr.map((valueObj, valueIndex) => {
                          return (
                            <View
                              key={`${valueIndex + 1}`}
                              className={`com-selectModal-popup-middle-list-item ${skuSelected[skuObj.objectId] === valueObj &&
                                "com-selectModal-popup-middle-list-item-active"}`}
                              onClick={() => {
                                _handleSkuSelecte({ skuObj, valueObj });
                              }}
                            >
                              {valueObj}
                            </View>
                          );
                        })}
                    </View>
                  </View>
                );
              })}
              <View className="com-selectModal-popup-middle">
                <Text className="com-selectModal-popup-middle-label">数量</Text>
                <View className="com-selectModal-popup-middle-list">
                  <Counter
                    value={productDetail.startup ? Number(productDetail.startup) : number}
                    min={Number(productDetail.startup)}
                    onChange={value => {
                      setnumber(value);
                      onChange({
                        skuSelected: skuSelected,
                        number: value,
                      });
                    }}
                  />
                  <Text className="com-selectModal-popup-counterDesc">{productDetail.startup}件起购</Text>
                </View>
              </View>
            </View>
            <JX_Button
              className="com-selectModal-operations-btngroup-item"
              title="确定"
              size="normal"
              type="error"
              onClick={() => {
                onSubmit();
              }}
            />
          </View>
        </View>
      </View>
    </>
  );
}

export default Index;
