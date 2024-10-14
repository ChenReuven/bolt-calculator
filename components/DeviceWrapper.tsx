import React from 'react';

interface DeviceWrapperProps {
  children: React.ReactNode;
}

const DeviceWrapper: React.FC<DeviceWrapperProps> = ({ children }) => {
  return (
    <div className="relative w-full h-full">
      {/* iPhone wrapper for small screens */}
      <div className="sm:hidden">
        <div className="mx-auto w-[320px] h-[568px] bg-black rounded-[60px] p-4 shadow-xl">
          <div className="w-full h-full bg-white rounded-[36px] overflow-hidden">
            {children}
          </div>
        </div>
      </div>

      {/* Tablet wrapper for medium screens */}
      <div className="hidden sm:block lg:hidden">
        <div className="mx-auto w-[768px] h-[1024px] bg-gray-800 rounded-[40px] p-4 shadow-xl">
          <div className="w-full h-full bg-white rounded-[20px] overflow-hidden">
            {children}
          </div>
        </div>
      </div>

      {/* No wrapper for large screens */}
      <div className="hidden lg:block">
        {children}
      </div>
    </div>
  );
};

export default DeviceWrapper;