import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component, useState, useEffect } from "react";
import { View, Button, Text, Navigator, Image } from "@tarojs/components";
import { AtIcon } from "taro-ui";

import "./index.scss";
import AV from "@_gen/utils/leancloud-storage/dist/av-weapp.js";
import getPath from "@_gen/utils/getPath";
import checkAuth from "@_gen/utils/checkAuth";
import makeImgLink from "@_gen/utils/makeImgLink";
import { uploadToQiniu } from "@_gen/utils/qiniu";

function Index(props) {
  const [qiniuToken, setqiniuToken] = useState();
  const { renderContent, onChange } = props;

  const _getUploadToken = async () => {
    const data = await AV.Cloud.run("getQiniuToken", {});
    // 调用成功，得到成功的应答 data
    setqiniuToken(data);
    return data;
  };

  const _chooseImage = async () => {
    const qiniuToken_res = await _getUploadToken();
    Taro.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
    })
      .then(res => {
        console.log(res);
        // 开始上传
        uploadToQiniu({
          token: qiniuToken_res,
          url: REACT_APP_QINIU_SERVER,
          file: res.tempFilePaths[0],
          name: `card_avatar/${Date.now()}_${Math.floor(Math.random() * 1000000000000)}`,
        }).then(keyname => {
          // 保存到用户信息中
          onChange(keyname);
        });
      })
      .catch(error => {
        console.log({ error });
        Taro.showToast({ title: "更新头像失败", icon: "none", duration: 1000 });
      });
  };

  return <View onClick={_chooseImage.bind(this)}>{renderContent}</View>;
}

export default Index;
