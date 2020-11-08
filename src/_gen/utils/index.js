/*
 * @Description: utils
 * @Author: bangdong.chen
 * @Date: 2020-03-01 02:24:13
 * @LastEditors: bangdong.chen
 * @LastEditTime: 2020-09-25 09:15:43
 * @FilePath: /fe-taro-jinxi/src/utils/index.js
 */
import Taro from "@tarojs/taro";

export const StatusBarHeight = Taro.getSystemInfoSync().statusBarHeight;
export const NavBarHeight = StatusBarHeight + 44;

