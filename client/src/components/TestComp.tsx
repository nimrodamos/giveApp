import React from "react";

const InstagramMockup: React.FC = () => {
  const imageSrc = "../../Media/Logo.jpeg"; // Replace with your image path in public folder

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="relative w-80 h-[550px] bg-black rounded-[40px] shadow-2xl overflow-hidden">
        {/* Phone Header */}
        <div className="absolute top-0 w-full h-12 bg-white flex justify-between items-center px-4">
          <span className="text-lg font-bold">Instagram</span>
          <div className="flex space-x-3">
            <div className="w-5 h-5 rounded-full bg-gray-300"></div>
            <div className="w-5 h-5 rounded-full bg-gray-300"></div>
          </div>
        </div>

        {/* Phone Image Content */}
        <div className="absolute top-12 w-full h-[400px] bg-gray-300 flex justify-center items-center">
          <img
            src={imageSrc}
            alt="User Uploaded"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Bottom Action Bar */}
        <div className="absolute bottom-0 w-full h-16 bg-white flex justify-around items-center border-t">
          <div className="w-6 h-6 rounded-full bg-gray-300"></div>
          <div className="w-6 h-6 rounded-full bg-gray-300"></div>
          <div className="w-6 h-6 rounded-full bg-gray-300"></div>
          <div className="w-6 h-6 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default InstagramMockup;