import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function MessagesIcon({ size = 24, color = '#9f9f9f', ...props }) {
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
        d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8z"
        fill={color}
      />
    </Svg>
  );
}

export default MessagesIcon;
