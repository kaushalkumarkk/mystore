import React from 'react';

interface LoadingProps {
  type?: 'text' | 'card' | 'circle' | 'block'; 
  fullHeight?: boolean;
  height?: string;
  width?: string;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({
  type = 'text',
  fullHeight = false,
  height = 'auto',
  width = '100%',
  className = '',
}) => {
  const baseClass = 'animate-pulse bg-gray-200 rounded';

  const getSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className={`space-y-4 p-4 border rounded-md shadow-md ${baseClass}`}>
            <div className="h-40 bg-gray-300 rounded w-full"></div>
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        );
      case 'circle':
        return <div className={`w-16 h-16 rounded-full ${baseClass}`}></div>;
      case 'block':
        return (
          <div className={`${baseClass}`} style={{ height: height || '200px', width: width || '100%' }} />
        );
      case 'text':
      default:
        return (
          <div className="space-y-3">
            <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
            <div className="h-4 w-full bg-gray-300 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
          </div>
        );
    }
  };

  return (
    <div
      className={`w-full flex items-center justify-center ${fullHeight ? 'h-screen' : ''}`}
      style={{ height, width }}
    >
      <div className={`w-full ${className}`}>
        {getSkeleton()}
      </div>
    </div>
  );
};

export default Loading;
