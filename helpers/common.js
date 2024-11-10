import { Dimensions } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

export const wp = (percentage) => {
  const width = deviceWidth;
  return (percentage * width) / 100;
};

export const hp = (percentage) => {
  const height = deviceHeight;
  return (percentage * height) / 100;
};

export const getColumnCount = () => {
  if (deviceWidth >= 1024) {
    return 4;
  } else if (deviceWidth >= 768) {
    return 3;
  } else {
    return 2;
  }
};

export const getImageSize = (width, height) => {
  if (width > height) {
    return 250;
  } else if (width < height) {
    return 300;
  }else{
    return 200;
  }
};

export const capilatize = (str) => {
  return str.replace(/\b\w/g, l => l.toUpperCase());
};
