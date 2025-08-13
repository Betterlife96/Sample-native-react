import React from 'react';
import { Svg, Path } from 'react-native-svg';

interface CartIconProps {
  fill?: string;
  width?: number;
  height?: number;
}

const CartIcon: React.FC<CartIconProps> = ({ fill = '#000', width = 24, height = 24 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
        stroke={fill}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M20 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
        stroke={fill}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
        stroke={fill}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
};

export default CartIcon;
