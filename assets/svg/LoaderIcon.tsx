import * as React from "react";
import Svg, { SvgProps, Path, Rect } from "react-native-svg";

const LoaderIcon = (props: SvgProps) => (
  <Svg
    width={90}
    height={90}
    fill="none"
    {...props}
  >
    <Rect width={90} height={90} fill="#fff" rx={18.699} />
    <Path
      fill="#1472FF"
      fillRule="evenodd"
      d="M37.776 34.42a4.475 4.475 0 0 1 4.475-4.476h4.476a4.475 4.475 0 0 1 4.475 4.475v.306a72.81 72.81 0 0 1 4.139.499c2.169.324 3.693 2.211 3.693 4.35V44.1c0 1.806-1.094 3.509-2.888 4.105a36.888 36.888 0 0 1-11.657 1.878c-4.071 0-7.99-.66-11.656-1.878-1.795-.596-2.889-2.299-2.889-4.105v-4.525c0-2.14 1.524-4.027 3.694-4.351a72.81 72.81 0 0 1 4.138-.499v-.306Zm11.188 0v.135a73.829 73.829 0 0 0-8.95 0v-.136a2.238 2.238 0 0 1 2.237-2.237h4.476a2.238 2.238 0 0 1 2.238 2.237ZM44.49 46.726a1.119 1.119 0 1 0 0-2.238 1.119 1.119 0 0 0 0 2.238Z"
      clipRule="evenodd"
    />
    <Path
      fill="#1472FF"
      d="M31.063 54.036v-4.17c.332.182.688.338 1.064.463a39.122 39.122 0 0 0 12.362 1.992c4.314 0 8.472-.699 12.363-1.992.376-.125.73-.281 1.063-.464v4.171c0 2.166-1.562 4.07-3.764 4.362-3.161.42-6.387.636-9.662.636-3.275 0-6.5-.216-9.662-.636-2.202-.293-3.764-2.196-3.764-4.362Z"
    />
  </Svg>
)
export default LoaderIcon;
