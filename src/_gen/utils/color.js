import hexToFilter from "@_gen/utils/hex2filter";

export const generateFilter = (iconColor) => {
  if (iconColor === "white" || iconColor.toLowerCase() === "#fff" || iconColor.toLowerCase() === "#ffffff") {
    return "brightness(0) invert(1)";
  }
  if (iconColor === "black" || iconColor.toLowerCase() === "#000" || iconColor.toLowerCase() === "#000000" || !iconColor) {
    return "brightness(0)";
  }
  return hexToFilter(iconColor).filter;
};

export const getImageSize = ({ url, callback }) => {
  const img = new Image();
  img.src = url;
  if (img.complete) {
    callback(img.width, img.height);
  } else {
    img.onload = () => {
      callback(img.width, img.height);
      img.onload = null;
    };
  }
};
