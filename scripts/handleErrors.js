/*
 * @Description: handleErrors
 * @Author: bangdong.chen
 * @Date: 2020-03-03 16:15:52
 * @LastEditors: bangdong.chen
 * @LastEditTime: 2020-03-03 16:16:31
 */
const notify = require("gulp-notify");

module.exports = function handleErrors(errorObject, callback) {
  notify
    .onError(
      errorObject
        .toString()
        .split(": ")
        .join(":\n")
    )
    .apply(this, arguments);
  if (typeof this.emit === "function") {
    this.emit("end");
  }
}