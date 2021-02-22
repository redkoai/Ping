import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function HomeIcon({ size = 24, color = '#9f9f9f', ...props }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path fill="none" d="M0 0h24v24H0z" />
      <Path
        d="M10.041 19.039v-4.8h3.913v4.8a.972.972 0 00.978.961h2.935a.972.972 0 00.978-.961v-6.724h1.663a.475.475 0 00.323-.836l-8.178-7.234a1 1 0 00-1.311 0l-8.178 7.234a.477.477 0 00.323.836H5.15v6.725a.972.972 0 00.978.961h2.935a.972.972 0 00.978-.962z"
        fill={color}
      />
    </Svg>
  );
}

export default HomeIcon;
