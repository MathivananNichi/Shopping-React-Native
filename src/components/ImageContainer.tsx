import {
  Image,
  ImageBackground,
  ImageBackgroundProps,
  ImageProps,
  ImageStyle,
  StyleProp,
  StyleSheet,
} from "react-native";
import { appSizes } from "../themes";
import { ReactNode } from "react";

interface ImageContainerProps extends ImageProps {
  imageStyle?: StyleProp<ImageStyle>;
  netwrokImage?: string;
}

interface ImageBackgroundContainerProps extends ImageBackgroundProps {
  imageStyle?: StyleProp<ImageStyle>;
  netwrokImage?: string;
}
export const clothingUrl = {
  clothingUrl:
    "https://imgs.search.brave.com/aLNWKEuhEuOoEAnF0BbByWDEfpP16AwA_2tgmDubF3U/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMS8x/MS8xNS8wNS8yNS9i/b3V0aXF1ZS02Nzk2/Mzk5XzY0MC5qcGc",
  image: "https://4kwallpapers.com/images/walls/thumbs/12358.png",
};
export const ImageContainer = (props: ImageContainerProps) => {
  return (
    <Image
      {...props}
      source={{ uri: props.netwrokImage || clothingUrl.image }}
      style={[styles.image, props.imageStyle]}
    />
  );
};

export const ImageBackgroundContainer = (
  props: ImageBackgroundContainerProps,
) => {
  return (
    <ImageBackground
      {...props}
      source={{ uri: props.netwrokImage || clothingUrl.image }}
      style={[styles.image, props.imageStyle]}
    >
      {props.children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
    borderRadius: appSizes.borderRadiusRound,
  },
});
