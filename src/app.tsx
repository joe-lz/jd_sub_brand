import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component } from "react";
import { Provider } from "mobx-react";

import "./app.scss";
import store from "./store";
import AV from "@_gen/utils/leancloud-storage/dist/av-weapp.js";
// 初始化leancloud应用
AV.init({
  appId: REACT_APP_LEAN_APPID,
  appKey: REACT_APP_LEAN_KEY,
  serverURLs: REACT_APP_LEAN_SERVER,
});

class App extends Component {
  componentWillMount() {
    let NODE_ENV = process.env.NODE_ENV;
    const { getStorageSync, setStorageSync } = Taro;
    Taro.getStorageSync = (storageKey) => {
      return getStorageSync(`${NODE_ENV}_${storageKey}`);
    };
    Taro.setStorageSync = (storageKey, value) => {
      setStorageSync(`${NODE_ENV}_${storageKey}`, value);
    };
  }

  componentDidMount() {
    if (process.env.NODE_ENV !== "production") {
      wx.onAccelerometerChange((res) => {
        if (res.x > 3) {
          Taro.showModal({
            title: "扫码结果",
            content: `${JSON.stringify(this.$router.params)}`,
            showCancel: true,
            cancelText: "测试页面",
          }).then((modalres) => {
            if (modalres.confirm) {
              console.log("用户点击确定");
            } else if (modalres.cancel) {
              Taro.navigateTo({
                url: "/packages/public/pages/test/index",
              });
            }
          });
        }
      });
    }
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 就是要渲染的页面
  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default App;
