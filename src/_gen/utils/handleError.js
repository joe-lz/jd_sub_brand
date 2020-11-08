import leanerr from "@_gen/utils/leanerr";
import Taro from "@tarojs/taro";

// 处理leancloud错误
export const handleError = ({ error }) => {
  Taro.showToast({
    title: leanerr[`${Number(error.code)}`],
    icon: "none",
    duration: 2000
  });
};
