export const canUseWebP = () => {
  if (process.env.TARO_ENV === "weapp") {
    return true;
  }
  // eslint-disable-next-line no-undef
  const elem = document.createElement("canvas");
  if (elem.getContext && elem.getContext("2d")) {
    // was able or not to get WebP representation
    return elem.toDataURL("image/webp").indexOf("data:image/webp") === 0;
  }
  // very old browser like IE 8, canvas not supported
  return false;
};

export default ({ url, type }) => {
  let newUrl = url;
  if (canUseWebP() && type === "webp") {
    newUrl = `${REACT_APP_QINIU_URL}/${newUrl}?imageMogr2/format/webp/blur/1x0/quality/80|imageslim`;
  } else if (type === "jpg") {
    newUrl = `${REACT_APP_QINIU_URL}/${newUrl}?imageView2/1/w/800/h/800/format/jpg/q/80|imageslim`;
  } else if (type === "jpg_contain") {
    newUrl = `${REACT_APP_QINIU_URL}/${newUrl}?imageView2/0/format/jpg/interlace/1/q/80|imageslim`;
  } else if (type === "jpg_share") {
    newUrl = `${REACT_APP_QINIU_URL}/${newUrl}?imageView2/1/w/500/h/400/format/jpg/q/80|imageslim`;
  } else {
    newUrl = `${REACT_APP_QINIU_URL}/${newUrl}`;
  }
  return newUrl;
};

