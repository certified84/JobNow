import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export const EmptyNotifications = (props: SvgProps) => (
  <Svg
    width={241}
    height={202}
    fill="none"
    {...props}
  >
    <Path
      fill="#F0F0F0"
      fillRule="evenodd"
      d="M167 0H0v97h32v30l33.41-30H167V0Z"
      clipRule="evenodd"
    />
    <Path
      fill="#ADADAF"
      d="M105 15h46v6h-46zM32 26h119v6H32zM32 37h119v6H32z"
    />
    <Path
      fill="#DBDBDB"
      fillRule="evenodd"
      d="M74 75h167v97h-32v30l-33.409-30H74V75Z"
      clipRule="evenodd"
    />
    <Path
      fill="#ADADAF"
      d="M144 99H98v6h46zM217 110H98v6h119zM217 121H98v6h119z"
    />
  </Svg>
)
