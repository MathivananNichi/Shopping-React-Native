import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const SVGComponent = (props:SvgProps) => (
  <Svg
    width={10}
    height={20}
    viewBox="0 0 10 20"
    fill="none"
    {...props}
  >
    <Path
      d="M3 20V14H0L3.05 6.3C3.21667 5.9 3.475 5.58333 3.825 5.35C4.175 5.11667 4.56667 5 5 5C5.43333 5 5.825 5.11667 6.175 5.35C6.525 5.58333 6.78333 5.9 6.95 6.3L10 14H7V20H3ZM5 4C4.45 4 3.97917 3.80417 3.5875 3.4125C3.19583 3.02083 3 2.55 3 2C3 1.45 3.19583 0.979167 3.5875 0.5875C3.97917 0.195833 4.45 0 5 0C5.55 0 6.02083 0.195833 6.4125 0.5875C6.80417 0.979167 7 1.45 7 2C7 2.55 6.80417 3.02083 6.4125 3.4125C6.02083 3.80417 5.55 4 5 4Z"
      fill={props.color||"#474556"}
    />
  </Svg>
);
export const WomenIcon = SVGComponent;
