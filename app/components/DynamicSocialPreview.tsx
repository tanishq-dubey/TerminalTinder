import React from 'react';
import { ColorScheme } from '../utils/colorSchemes';

interface DynamicSocialPreviewProps {
  scheme: ColorScheme;
}

const DynamicSocialPreview: React.FC<DynamicSocialPreviewProps> = ({ scheme }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1200"
      height="630"
      viewBox="0 0 1200 630"
    >
      <rect width="1200" height="630" fill={scheme.colors.primary.background} />
      <text
        x="50%"
        y="40%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="60"
        fontWeight="bold"
        fill={scheme.colors.primary.foreground}
      >
        {scheme.name}
      </text>
      <text
        x="50%"
        y="55%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="30"
        fill={scheme.colors.primary.foreground}
      >
        Terminal Tinder Color Scheme
      </text>
      <g transform="translate(500, 400) scale(0.5)">
        {/* Replace this with your actual app logo SVG path */}
        <path
          d="M0,0 L100,0 L100,100 L0,100 Z"
          fill={scheme.colors.normal.blue}
        />
        <path
          d="M25,25 L75,25 L75,75 L25,75 Z"
          fill={scheme.colors.normal.green}
        />
      </g>
    </svg>
  );
};

export default DynamicSocialPreview;