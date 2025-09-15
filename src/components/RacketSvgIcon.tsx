import React from 'react';

interface RacketSvgIconProps {
  className?: string;
}

const RacketSvgIcon: React.FC<RacketSvgIconProps> = ({ className = "w-6 h-6" }) => {
  return (
    <svg 
      className={className}
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M12 2C10.9 2 10 2.9 10 4V8C10 9.1 10.9 10 12 10C13.1 10 14 9.1 14 8V4C14 2.9 13.1 2 12 2Z" 
        fill="currentColor"
      />
      <path 
        d="M12 10C8.69 10 6 12.69 6 16C6 19.31 8.69 22 12 22C15.31 22 18 19.31 18 16C18 12.69 15.31 10 12 10ZM12 20C9.79 20 8 18.21 8 16C8 13.79 9.79 12 12 12C14.21 12 16 13.79 16 16C16 18.21 14.21 20 12 20Z" 
        fill="currentColor"
      />
      <path 
        d="M12 14C10.9 14 10 14.9 10 16C10 17.1 10.9 18 12 18C13.1 18 14 17.1 14 16C14 14.9 13.1 14 12 14Z" 
        fill="currentColor"
      />
    </svg>
  );
};

export default RacketSvgIcon;