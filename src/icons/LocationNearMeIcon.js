import { heightPercentageToDP, widthPercentageToDP } from 'ping/util/scaler';

import React from 'react';
import Svg, { Path } from 'react-native-svg';

function LocationNearMeIcon({ size = 16, color = '#777', ...props }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path fill="none" d="M0 0h24v24H0z" />
      <Path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98z" fill="#303033" />
    </Svg>
  );
}

export default LocationNearMeIcon;
