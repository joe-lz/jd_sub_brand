import React, { Component } from "react";
import { View, Button, Text, Image } from "@tarojs/components";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { AtIcon } from "taro-ui";

import "./index.scss";
import AV from "@_gen/utils/leancloud-storage/dist/av-weapp.js";
import { getProductByJxId, getImageList, getSkuList } from "@_gen/service/product";
import { getBrandByJxId, addToMyBrands } from "@_gen/service/brand";
import { getCartCount, addCart } from "@_gen/service/cart";
import getPath from "@_gen/utils/getPath";
import checkAuth from "@_gen/utils/checkAuth";
import makeImgLink from "@_gen/utils/makeImgLink";
import FixedBottom from "@_gen/components/FixedBottom";
import Touchable from "@_gen/components/Touchable";
import JX_Button from "@_gen/components/Button";
import Footer from "@_gen/components/Footer";

import ImageSwiper from "./ImageSwiper";
import SelectModal from "./SelectModal";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productDetail: null,
      cartCount: 0,
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
      params: { type: 1 },
      callback: () => {
        this.setState({ showPopup: true });
        // 更新用户信息
        // userStore.updateCurUser({ company_id: curBrand.company_id.objectId });
      },
    });
  }

  _jumpToCart() {
    checkAuth({
      callback: () => {
        Taro.navigateTo({
          url: getPath({
            moduleName: "brand",
            url: "/pages/cart-list/index",
            params: {
              hidetab: true,
            },
          }),
        });
      },
    });
  }

  _handleSubmit() {
    const {
      windowWidth,
      current,
      showPopup,
      productDetail,
      imageList,
      skuList,
      curBrand,
      cartCount, //
      skuSelected,
      number,
    } = this.state;
    const curUser = AV.User.current().toJSON();
    // sku选择后
    if (Object.keys(skuSelected).length === skuList.length) {
      if (this.state.type === "addCart") {
        // 添加到购物车
        const params = {
          product_id: productDetail.objectId,
          brand_id: curBrand.objectId,
          user_id: curUser.objectId,
          company_id: curBrand.company_id.objectId,
          skuinfo: skuSelected,
          number,
        };
        addCart(params).then(async res => {
          if (res.code === 0) {
            Taro.showToast({
              title: "加入购物车",
              icon: "success",
              duration: 1000,
            });
            this.setState({ showPopup: false });
            const cartCount = (await getCartCount()).result;
            this.setState({ cartCount });
          } else {
            Taro.showToast({ title: "加入失败", icon: "none", duration: 1000 });
          }
        });
      } else {
        // 创建订单
        // 保存products
        const orderProducts = [
          {
            product_id: productDetail,
            brand_id: curBrand,
            // user_id: curUser,
            // company_id: curBrand.company_id,
            skuinfo: skuSelected,
            number: this.state.number,
          },
        ];
        this.setState({ showPopup: false });

        Taro.setStorageSync("orderProducts", orderProducts);
        Taro.navigateTo({
          url: getPath({
            moduleName: "brand",
            url: "/pages/order-create/index",
            // params: { data: JSON.stringify(orderProducts) },
          }),
        });
      }
    } else {
      Taro.showToast({ title: "请选择规格", icon: "none", duration: 1000 });
    }
  }

  render() {
    const {
      windowWidth,
      current,
      showPopup,
      productDetail,
      imageList,
      skuList,
      curBrand,
      cartCount, //
    } = this.state;

    return (
      <>
        {productDetail && (
          <View className="productdetail">
            <ImageSwiper
              productDetail={productDetail}
              imageList={imageList}
              skuList={skuList}
              curBrand={curBrand}
              handleCheckSkuSelect={this._handleCheckSkuSelect.bind(this)}
            />
            {productDetail && skuList ? (
              <SelectModal
                skuList={skuList}
                productDetail={productDetail}
                showPopup={showPopup}
                imgPreview={makeImgLink({
                  url: productDetail.preview.url,
                  type: "jpg",
                })}
                onPopupChange={val => {
                  this.setState({ showPopup: val.showPopup });
                }}
                onChange={({ skuSelected, number }) => {
                  this.setState({ skuSelected, number });
                }}
                onSubmit={() => {
                  this._handleSubmit();
                }}
              />
            ) : null}
            <View className="productdetail-section">
              <Text className="productdetail-section-title">商品详情</Text>
              <Image
                src={makeImgLink({
                  url: productDetail.detail_images ? productDetail.detail_images[0].hash : "",
                  type: "jpg_contain",
                })}
                mode="widthFix"
                lazyLoad
                className="productdetail-section-img"
              />
            </View>
            <Footer />
            <FixedBottom height={55} style={{}}>
              <Touchable opentype="contact" my-class="productdetail-operations-btn">
                <AtIcon prefixClass="icon" value="kefu_line" size="20" color="#000"></AtIcon>
                <Text className="productdetail-operations-btn-text">客服</Text>
              </Touchable>
              <Touchable my-class="productdetail-operations-btn" onClick={this._jumpToCart.bind(this)}>
                <AtIcon prefixClass="icon" value="gouwuche_line" size="20" color="#000"></AtIcon>
                <Text className="productdetail-operations-btn-text">购物车</Text>
                {cartCount ? <Text className="productdetail-operations-cartnumber">{cartCount}</Text> : ""}
              </Touchable>
              <View className="productdetail-operations-btngroup">
                <JX_Button
                  my-class="productdetail-operations-btngroup-item"
                  title="立即购买"
                  size="normal"
                  type="warning"
                  onClick={() => {
                    this._handleCheckSkuSelect();
                  }}
                />
                <JX_Button
                  my-class="productdetail-operations-btngroup-item"
                  title="加入购物车"
                  size="normal"
                  type="error"
                  onClick={() => {
                    this._handleCheckSkuSelect({ type: "addCart" });
                  }}
                />
              </View>
            </FixedBottom>
          </View>
        )}
      </>
    );
  }
}

export default Index;
