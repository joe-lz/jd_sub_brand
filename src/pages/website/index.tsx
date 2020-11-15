import React, { Component } from "react";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { View, Button, Text, Navigator, ScrollView } from "@tarojs/components";
import { AtIcon } from "taro-ui";

import "./index.scss";
import Tabbar from "../index/tabbar";
import { getBrandByJxId, addToMyBrands } from "@_gen/service/brand";
import { getOrderCount } from "@_gen/service/order";
import getPath from "@_gen/utils/getPath";
import Touchable from "@_gen/components/Touchable";
import JX_Navigator from "@_gen/components/Navigator";
import Banner from "./Banner";
import Introduction from "./Introduction";
import Products from "./Products";
import Advantage from "./Advantage";
import Honors from "./Honors";
import Cases from "./Cases";
import Clients from "./Clients";
import Contactus from "./Contactus";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curBrand: null,
      scrollTop: 0,
      colorBg: "transparent",
      colorText: "white",
      borderBottom: false,
      title: "",
    };
  }

  componentWillMount() {
    Taro.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"],
    });
  }

  async componentDidMount() {
    let {
      params: { scene, bId },
    } = getCurrentInstance().router;
    if (scene) {
      const newScene = decodeURIComponent(scene).split(",");
      if (newScene && newScene.length === 2) {
        bId = newScene[0];
      }
    }

    // 获取当前品牌
    const curBrand = (await getBrandByJxId({ id: bId })).result;
    this.setState({ curBrand });
    // 添加到我的品牌
    await addToMyBrands({
      brand_id: curBrand.objectId,
      type: 2,
    });
    // Taro.setNavigationBarTitle({ title: `「${curBrand.title}」官网` });
    this.setState({ title: `「${curBrand.title}」官网`, colorText: 'white' });
  }

  onScroll(e) {
    const { scrollTop } = e.detail;
    const { curBrand } = this.state;
    this.setState({
      scrollTop,
      colorBg: scrollTop > 100 ? "white" : "trasnparent",
      borderBottom: scrollTop > 100 ? true : false,
      colorText: scrollTop > 100 ? "black" : "white",
      // title: scrollTop > 100 ? (curBrand.title_short || curBrand.title) : ''
    });
    // if (scrollTop > 100) {
    //   this.navigator.setTitle({ title: curBrand.title_short || curBrand.title });
    // } else {
    //   this.navigator.setTitle({ title: "" });
    // }
    let frontColor = "#ffffff";
    if (scrollTop > 100) {
      frontColor = "#000000";
    } else {
      frontColor = "#ffffff";
    }
    Taro.setNavigationBarColor({
      frontColor,
      backgroundColor: "#ffffff",
      animation: {
        duration: 200,
        timingFunc: "easeIn",
      },
    });
  }

  render() {
    const { curBrand, colorBg, colorText, borderBottom } = this.state;
    return (
      <>
        {curBrand && (
          <ScrollView
            scrollY
            className="brandWeb"
            onScroll={e => {
              this.onScroll(e);
            }}
          >
            <JX_Navigator
              my-class="brandWeb-navigator"
              ref={e => {
                this.navigator = e;
              }}
              title={this.state.title}
              colorBg={colorBg}
              colorText={colorText}
              borderBottom={borderBottom}
            />
            <Banner curBrand={curBrand} />
            <Introduction curBrand={curBrand} />
            <Products curBrand={curBrand} />
            <Advantage curBrand={curBrand} />
            <Honors curBrand={curBrand} />
            <Cases curBrand={curBrand} />
            <Clients curBrand={curBrand} />
            <Contactus curBrand={curBrand} />
          </ScrollView>
        )}
      </>
    );
  }
}

export default Index;
