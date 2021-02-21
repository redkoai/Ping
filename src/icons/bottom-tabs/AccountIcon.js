import * as React from 'react';
import Svg, { Path, G, Circle } from 'react-native-svg';

function AccountIcon({ size = 24, color = '#9f9f9f', ...props }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path fill="none" d="M0 0h24v24H0z" />
      <G transform="translate(-313 -777)" fill={color}>
        <Path d="M333 797v-2a4 4 0 00-4-4h-8a4 4 0 00-4 4v2" />
        <Circle cx={4} cy={4} r={4} transform="translate(321 781)" />
      </G>
    </Svg>
  );
}

export default AccountIcon;
