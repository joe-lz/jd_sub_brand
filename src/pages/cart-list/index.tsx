import React, { Component } from "react";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { View, Button, Text, Navigator, Swiper, Image } from "@tarojs/components";

import "./index.scss";
import Tabbar from "../index/tabbar";
import { getCartList } from "@_gen/service/cart";
import Touchable from "@_gen/components/Touchable";
import JX_Button from "@_gen/components/Button";
import Price from "@_gen/components/Price";
import CartItem from "./item";
import getPath from "@_gen/utils/getPath";

require("@src/images/icon_status_cart.png");
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLists: [],
      price_total: 0,
      cartlist: [],
    };
  }

  async componentDidMount() {
    let {
      params: { hidetab, bId },
    } = getCurrentInstance().router;
    this.setState({
      hidetab: Boolean(hidetab),
      bId,
    });
    await this.getlist();
  }

  async getlist() {
    const res_cartlist = await getCartList();
    this.setState({
      cartlist: res_cartlist.result,
    });
  }

  // 选择item，删除item，增加减少数量
  async _onItemSelectChange(cartItem) {
    // 选择item
    if (cartItem) {
      const { selectedLists } = this.state;
      let selectedListsNew = [];

      if (selectedLists.filter(obj => obj.objectId === cartItem.objectId).length === 0) {
        selectedListsNew = selectedLists.concat([cartItem]);
      } else {
        selectedLists.map(obj => {
          if (obj.objectId !== cartItem.objectId) {
            selectedListsNew.push(obj);
          }
          return obj;
        });
      }
      this.setState({ selectedLists: selectedListsNew }, () => {
        this.calTotal();
      });
    } else {
      // 删除，改变数量
      await this.getlist();
      let { selectedLists, cartlist } = this.state;
      cartlist.map(obj_cartlist => {
        selectedLists = selectedLists.map(obj_selectedLists => {
          if (obj_cartlist.objectId === obj_selectedLists.objectId) {
            obj_selectedLists.number = obj_cartlist.number;
          }
          return obj_selectedLists;
        });
      });
      this.calTotal();
    }
  }

  onDelete(cartItem) {
    // 从selectedLists删除
    let { selectedLists } = this.state;
    const newArr = [];
    selectedLists.map(obj_selectedLists => {
      if (cartItem.objectId !== obj_selectedLists.objectId) {
        newArr.push(obj_selectedLists);
      }
    });
    this.setState({ selectedLists: newArr }, async () => {
      await this._onItemSelectChange();
    });
  }

  // 计算总价
  calTotal() {
    const { cartlist, selectedLists } = this.state;
    let price_total = 0;
    selectedLists.map(obj => {
      price_total = price_total + obj.product_id.price_sale * obj.number;
    });
    this.setState({ price_total });
  }

  handleCreateOrder() {
    const { selectedLists } = this.state;
    if (selectedLists.length === 0) {
      return;
    }
    // 保存products
    const orderProducts = [];
    selectedLists.map(obj => {
      orderProducts.push({
        cartItem_id: obj.objectId,
        product_id: obj.product_id,
        brand_id: obj.brand_id,
        // user_id: curUser,
        // company_id: obj.brand_id.company_id,
        skuinfo: obj.skuinfo,
        number: obj.number,
      });
      return obj;
    });

    Taro.setStorageSync("orderProducts", orderProducts);
    Taro.navigateTo({
      url: getPath({
        moduleName: "brand",
        url: "/pages/order-create/index",
        // params: { data: JSON.stringify(orderProducts) },
      }),
    });
  }

  render() {
    const { cartlist, selectedLists, price_total } = this.state;
    return (
      <View className="brandcart">
        {cartlist && cartlist.length > 0 && (
          <View className="brandcart-content">
            {cartlist.map((cartItem, index) => {
              const checked = selectedLists.filter(obj => obj.objectId === cartItem.objectId).length > 0;
              return (
                <CartItem
                  key={`${index + 1}`}
                  cartItem={cartItem}
                  onItemSelectChange={value => {
                    this._onItemSelectChange(value);
                  }}
                  onDelete={val => {
                    this.onDelete(val);
                  }}
                  checked={checked}
                  isLast={false}
                />
              );
            })}
          </View>
        )}
        {cartlist && cartlist.length === 0 && (
          <Image className="brandcart-empty" mode="aspectFit" src="../../images/icon_status_cart.png" />
        )}
        {cartlist && cartlist.length > 0 && (
          <View className={`brandcart-bottom${this.state.hidetab ? 2 : 1}`}>
            <View className={`brandcart-bottom${this.state.hidetab ? 2 : 1}-content`}>
              <Text className="brandcart-bottom-title">总计：</Text>
              <Price value={price_total / 100} />
              <JX_Button
                my-class="brandcart-submit-btn"
                title={selectedLists.length ? `去结算 (${selectedLists.length})` : "去结算"}
                type="error"
                onClick={() => {
                  this.handleCreateOrder();
                }}
              />
            </View>
          </View>
        )}
        {this.state.hidetab ? null : <Tabbar currentIndex={1} bId={this.state.bId} />}
      </View>
    );
  }
}

export default Index;
