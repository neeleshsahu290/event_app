import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// Screen dimensions
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

// Screen dimensions in percent
export const hp = (percent: number) => (height * percent) / 100;
export const wp = (percent: number) => (width * percent) / 100;