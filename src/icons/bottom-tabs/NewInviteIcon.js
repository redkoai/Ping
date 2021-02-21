import * as React from 'react';
import Svg, { Path, G } from 'react-native-svg';

function NewInviteIcon({ size = 24, color = '#9f9f9f', ...props }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path fill="none" d="M0 0h24v24H0z" />
      <G fill="none" stroke={color} strokeLinecap="round" strokeWidth={2}>
        <Path d="M12 6v12M6 12h12" />
      </G>
    </Svg>
  );
}

export default NewInviteIcon;
