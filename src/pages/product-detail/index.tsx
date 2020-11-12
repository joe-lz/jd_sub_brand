import React, { Component } from "react";
import { View, Button, Text } from "@tarojs/components";
import Taro, { getCurrentInstance } from "@tarojs/taro";

import "./index.scss";
import { getProductByJxId, getImageList, getSkuList } from "@_gen/service/product";
import { getBrandByJxId, addToMyBrands } from "@_gen/service/brand";
import { getCartCount } from "@_gen/service/cart";
import getPath from "@_gen/utils/getPath";
import checkAuth from "@_gen/utils/checkAuth";

import ImageSwiper from "./ImageSwiper";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productDetail: null,
      cartCount: null,
      imageList: null,
      skuList: null,
      curBrand: null,

      windowWidth: Taro.getSystemInfoSync().windowWidth,
      current: 0,
      showPopup: false,
      skuSelected: {},
      type: null, // addCart, null
      number: 1,
    };
  }

  async componentWillMount() {
    let {
      params: { scene, pId, bId },
    } = getCurrentInstance().router;
    // 从二维码过来
    if (scene) {
      const newScene = decodeURIComponent(scene).split(",");
      if (newScene && newScene.length === 2) {
        bId = newScene[0];
        pId = newScene[1];
      }
    }
    // 获取商品详情
    const productDetail = (await getProductByJxId({ id: pId })).result;
    // 获取购物车数量
    const cartCount = (await getCartCount()).result;
    // 获取图片列表
    const imageList = (await getImageList({ product_id: productDetail.objectId })).result;
    // 获取sku
    const skuList = (await getSkuList({ product_id: productDetail.objectId })).result;
    // 获取当前品牌
    const curBrand = (await getBrandByJxId({ id: bId })).result;
    // 添加到我的品牌
    await addToMyBrands({ brand_id: curBrand.objectId, type: 1 });
    const params = {
      productDetail,
      cartCount,
      imageList,
      skuList,
      curBrand,
    };
    console.log(params);
    this.setState(params);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onShareAppMessage(res) {
    let {
      params: { scene, pId, bId },
    } = getCurrentInstance().router;
    // 从二维码过来
    if (scene) {
      const newScene = decodeURIComponent(scene).split(",");
      if (newScene && newScene.length === 2) {
        bId = newScene[0];
        pId = newScene[1];
      }
    }
    const { productDetail, curBrand } = this.state;
    return {
      title: `「${productDetail.card_name}」来自${curBrand.title}的品牌商城`,
      path: getPath({
        moduleName: "brand",
        url: "/pages/product-detail/index",
        params: {
          bId: bId,
          pId: productDetail.jxId,
        },
      }),
    };
  }

  _handleCheckSkuSelect(params) {
    const { type } = params || {};
    this.setState({ type });
    checkAuth({
      callback: () => {
        this.setState({ showPopup: true });
        // userStore.updateCurUser({ company_id: curBrand.company_id.objectId });
      },
    });
  }

  render() {
    return (
      <View className="brandshop">
        <ImageSwiper
          productDetail={this.state.productDetail}
          imageList={this.state.imageList}
          skuList={this.state.skuList}
          curBrand={this.state.curBrand}
          handleCheckSkuSelect={this._handleCheckSkuSelect.bind(this)}
        />
      </View>
    );
  }
}

export default Index;
