import Taro, { Component } from "@tarojs/taro";

/**
 *
 * 上传文件到七牛云
 * @param {*} token 七牛Token
 * @param {*} url 上传目标地址
 * @param {*} file 文件
 * @param {*} name 文件名
 * @returns
 */
export const uploadToQiniu = ({ token, url, file, name }) => {
  return new Promise((resolve, reject) => {
    Taro.uploadFile({
      url: url, // 开发者服务器 url
      filePath: file, // 要上传文件资源的路径
      name: 'file', // 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容,
      formData: {
        token,
        key: name
      },
      success: res => {
        if (res.statusCode === 200) {
          resolve(name)
        } else {
          reject(res)
        }
      },
      fail: res => {
        reject(res)
      },
      complete: () => { }
    })
  })
}
