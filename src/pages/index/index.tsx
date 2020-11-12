import React, { Component } from "react";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { View, Button, Text, Navigator, Swiper, SwiperItem, Image } from "@tarojs/components";

import "./index.scss";
import Tabbar from "@_gen/components/Tabbar";
require("@src/images/tabbar/icon1_light.png");
require("@src/images/tabbar/icon1_light_active.png");
require("@src/images/tabbar/icon2_light.png");
require("@src/images/tabbar/icon2_light_active.png");
require("@src/images/tabbar/icon3_light.png");
require("@src/images/tabbar/icon3_light_active.png");

import Item from "./item";
require("@src/images/icon_shop_tag_left.jpg");
require("@src/images/icon_shop_tag_right.jpg");
import { getProductList } from "@_gen/service/product";
import { getBrandByJxId, addToMyBrands } from "@_gen/service/brand";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      productlistsAll: [],
      curBrand: null,
    };
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
    // 获取全部商品
    const productlistsAll = await getProductList({ status: 3 });
    this.setState({
      productlistsAll: productlistsAll.result,
      bId,
    });
    // 获取当前品牌
    const curBrand = await getBrandByJxId({ id: bId });
    this.setState({ curBrand: curBrand.result });
    // 添加到我的品牌
    await addToMyBrands({
      brand_id: curBrand.result.objectId,
      type: 1,
    });
  }

  onShareAppMessage(res) {
    return {
      title: "鲸典设计",
      path: "/pages/index/index",
    };
  }

  render() {
    const arr = [1];
    const { productlistsAll, bId, curBrand } = this.state;
    return (
      <View className="brandshop">
        {arr.map((item, sectionIndex) => {
          return (
            <View className="brandshop-section" key={`${sectionIndex + 1}`}>
              <View className="brandshop-section-title">
                <Image className="brandshop-section-title-icon" src="../../images/icon_shop_tag_left.jpg" />
                <Text className="brandshop-section-title">专属推荐</Text>
                <Image className="brandshop-section-title-icon" src="../../images/icon_shop_tag_right.jpg" />
              </View>
              <View className="brandshop-section-lists">
                {productlistsAll.map((productItem, productIndex) => {
                  const { preview } = productItem;
                  return <Item key={`${productIndex + 1}`} productItem={productItem} bId={bId} curBrand={curBrand} />;
                })}
              </View>
            </View>
          );
        })}

        <Tabbar
          onChange={index => {
            // this.setState({
            //   currentIndex: index,
            // });
          }}
          current={this.state.currentIndex}
          color="#000"
          activeColor="#F05858"
          list={[
            {
              pagePath: "pages/index/index",
              text: "品牌商城",
              iconPath: "../../images/tabbar/icon1_light.png",
              selectedIconPath: "../../images/tabbar/icon1_light_active.png",
            },
            {
              pagePath: "pages/me/index",
              text: "购物车",
              iconPath: "../../images/tabbar/icon2_light.png",
              selectedIconPath: "../../images/tabbar/icon2_light_active.png",
            },
            {
              pagePath: "pages/me/index",
              text: "我的",
              iconPath: "../../images/tabbar/icon3_light.png",
              selectedIconPath: "../../images/tabbar/icon3_light_active.png",
            },
          ]}
        />
      </View>
    );
  }
}

export default Index;
