import * as React from "react";
import Svg, { Polygon, SvgProps } from "react-native-svg";
const SVGComponent = (props: SvgProps) => (
  <Svg
    fill={props.color ?? "#000000"}
    height="800px"
    width="800px"
    id="Layer_1"
    viewBox="0 0 512 512"
    {...props}
  >
    <Polygon points="437.3,30 202.7,339.3 64,200.7 0,264.7 213.3,478 512,94 " />
  </Svg>
);
export const Tick = SVGComponent;
