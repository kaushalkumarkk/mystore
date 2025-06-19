import React from 'react';
import { MdShoppingCart } from 'react-icons/md';

interface NoDataScreenProps {
  message?: string;
  height?: string;
  icon?: React.ReactNode;
  iconSize?: number;
}

const NoDataScreen: React.FC<NoDataScreenProps> = ({
  message = 'No data available.',
  height = '300px',
  icon,
  iconSize = 80,
}) => {
  return (
    <div
      className="flex flex-col items-center justify-center text-gray-500"
      style={{ height }}
    >
      <div className="mb-4 text-purple-500">
        {icon || <MdShoppingCart size={iconSize} />}
      </div>
      <p className="text-lg text-center">{message}</p>
    </div>
  );
};

export default NoDataScreen;
