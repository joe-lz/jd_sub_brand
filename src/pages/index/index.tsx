import React, { Component } from "react";
import { View, Button, Text, Navigator } from "@tarojs/components";
import { observer, inject } from "mobx-react";

import "./index.scss";

type PageStateProps = {
  store: {};
};

interface Index {
  props: PageStateProps;
}

@inject("store")
@observer
class Index extends Component {
  componentDidMount() {
    console.log(this.props);
  }

  onShareAppMessage(res) {
    return {
      title: "鲸典设计",
      path: "/pages/index/index"
    };
  }

  render() {
    return (
      <View className="index">index</View>
    );
  }
}

export default Index;
