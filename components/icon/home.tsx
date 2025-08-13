import React from 'react';
import { Svg, Path } from 'react-native-svg';

interface HomeIconProps {
  fill?: string;
  width?: number;
  height?: number;
}

const HomeIcon: React.FC<HomeIconProps> = ({ fill = '#000', width = 24, height = 24 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
        stroke={fill}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M9 22V12h6v10"
        stroke={fill}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
};

export default HomeIcon;
