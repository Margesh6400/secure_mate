import React from 'react';

interface LogoProps {
  className?: string;
  isScrolled?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = '', isScrolled = false }) => {
  const primaryColor = isScrolled ? '#ffffff' : '#1a202c'; // You can adjust these colors based on your theme
  const accentColor = '#4F46E5'; // Your accent color

  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M20 4L4 12L20 20L36 12L20 4Z"
        fill={accentColor}
      />
      <path
        d="M4 20L20 28L36 20"
        stroke={primaryColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 28L20 36L36 28"
        stroke={primaryColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Logo;
