import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function EventsIcon({ size = 24, color = '#9f9f9f', ...props }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path fill="none" d="M0 0h24v24H0z" />
      <Path fill="none" d="M4 4h16v16H4z" />
      <Path
        d="M6 9v9h12V9zm11-3h2a.945.945 0 011 1v12a.945.945 0 01-1 1H5a.945.945 0 01-1-1V7a.945.945 0 011-1h2V5a.945.945 0 011-1 .945.945 0 011 1v1h6V5a1 1 0 012 0zm-1 10h-2v-2h2zm-3 0h-2v-2h2zm3-3h-2v-2h2zm-3 0h-2v-2h2zm-3 3H8v-2h2z"
        fill={color}
        fillRule="evenodd"
      />
    </Svg>
  );
}

export default EventsIcon;
