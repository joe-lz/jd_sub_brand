/*
 * @Description: 描述
 * @Author: bangdong.chen
 * @Date: 2020-03-16 21:00:14
 * @LastEditors: bangdong.chen
 * @LastEditTime: 2020-03-16 21:00:57
 * @FilePath: /fe-taro-jinxi/src/utils/chunk.js
 */

export default (arr, size) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
}
