import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component, useState, useEffect } from "react";
import { View, Button, Text, Navigator, Image, Input } from "@tarojs/components";
import { AtIcon } from "taro-ui";

import "./index.scss";
import AV from "@_gen/utils/leancloud-storage/dist/av-weapp.js";
import getPath from "@_gen/utils/getPath";
import checkAuth from "@_gen/utils/checkAuth";
import makeImgLink from "@_gen/utils/makeImgLink";

function Index(props) {
  const { value = 0, min = 1, max = 5000, onChange = () => {} } = props;
  const [inputVal, setinputVal] = useState(value || min);

  const _decrease = () => {
    let valNew = inputVal;
    if (inputVal > min) {
      valNew = inputVal - 1;
    }
    setinputVal(valNew);
    onChange(valNew);
  };

  const _increase = () => {
    let valNew = inputVal;
    if (inputVal < max) {
      valNew = inputVal + 1;
    }
    setinputVal(valNew);
    onChange(valNew);
  };

  const _onInput = e => {
    setinputVal(e.currentTarget.value);
  };

  const setVal = val => {
    val = Number(val);
    let realVal = min;
    if (val < min) {
      realVal = min;
    } else if (val > max) {
      realVal = max;
    } else {
      realVal = val;
    }
    if (val === 0) {
      realVal = min;
    }
    setinputVal(realVal);
    onChange(realVal);
  };

  const _onBlur = e => {
    setVal(e.currentTarget.value);
  };

  return (
    <View style={{ display: "inline-block" }}>
      <View className="com-counter">
        <Button
          className={`com-counter-button com-counter-button-left ${inputVal <= min ? "com-counter-button-disabled" : ''}`}
          hoverClass={inputVal > min && "com-counter-button-hover"}
          onClick={() => {
            _decrease();
          }}
        >
          -
        </Button>
        <Input className="com-counter-title" type="number" value={inputVal} onInput={_onInput.bind(this)} onBlur={_onBlur.bind(this)} />
        <Button
          className={`com-counter-button com-counter-button-right ${inputVal >= max && "com-counter-button-disabled"}`}
          hoverClass={inputVal < max ? "com-counter-button-hover" : ""}
          onClick={() => {
            _increase();
          }}
        >
          +
        </Button>
      </View>
    </View>
  );
}

export default Index;
