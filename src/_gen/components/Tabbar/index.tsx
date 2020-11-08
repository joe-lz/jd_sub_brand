import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Button, Text, CoverView, CoverImage } from "@tarojs/components";

import "./index.scss";
import getPath from "@_gen/utils/getPath";

function Index(props) {
  return (
    <CoverView className="bottom-tab">
      <CoverView className="bottom-tab-content">
        {props.list.map((item, index) => {
          const isSelect = index === props.current;
          return (
            <CoverView
              className={`bottom-tab-item ${isSelect ? "bottom-tab-item-active" : ""}`}
              onClick={() => {
                props.onChange(index);
                Taro.redirectTo({
                  url: getPath({
                    moduleName: "brand",
                    url: `/${item.pagePath}`,
                    params: {},
                  }),
                });
              }}
              data-path={item.pagePath}
              key={item.text}
            >
              <CoverImage className="bottom-tab-item-img" src={isSelect ? item.selectedIconPath : item.iconPath} />
              <CoverView
                className="bottom-tab-item-text"
                style={{
                  color: isSelect ? props.activeColor : props.color,
                }}
              >
                {item.text}
              </CoverView>
            </CoverView>
          );
        })}
      </CoverView>
    </CoverView>
  );
}

export default Index;
