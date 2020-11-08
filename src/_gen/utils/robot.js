import Taro from "@tarojs/taro";

export default async function robot({user}) {
  try {
    await Taro.request({
      method: "post",
      url: `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=2b49e3b5-070b-451a-a50c-73734a52cfba`,
      data: {
        msgtype: "markdown",
        markdown: {
          content: `小程序<font color='green'>${
            process.env.NODE_ENV === "production" ? "生产环境" : "测试环境"
          }</font>收到一个业务了解申请，请客服同学尽快联系哦！！
          > 用户名：${user.username}
          > 电话：${user.mobilePhoneNumber}
      `
        }
      }
    });
  } catch (error) {
    console.warn(`problem with request: ${error}`);
  }
}
