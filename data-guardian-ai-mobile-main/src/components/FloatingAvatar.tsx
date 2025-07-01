
import React from 'react';
import VirtualAvatar from './VirtualAvatar';

interface FloatingAvatarProps {
  onAvatarClick: () => void;
}

const FloatingAvatar: React.FC<FloatingAvatarProps> = ({ onAvatarClick }) => {
  return (
    <div className="fixed bottom-20 right-4 z-50">
      <div 
        className="relative cursor-pointer transform transition-all duration-300 hover:scale-110 active:scale-95"
        onClick={onAvatarClick}
      >
        {/* 外圈光环动画 */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 opacity-20 animate-pulse"></div>
        
        {/* AI助手图标容器 */}
        <div className="relative w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg flex items-center justify-center">
          <VirtualAvatar />
          
          {/* 消息提示点 */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">3</span>
          </div>
        </div>
        
        {/* 悬停提示 */}
        <div className="absolute -top-10 -left-8 bg-white px-3 py-1 rounded-lg shadow-md text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          AI数智助手
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
          </div>
        </div>

        {/* 呼吸动画环 */}
        <div className="absolute inset-0 rounded-full border-2 border-blue-300 animate-ping opacity-75"></div>
      </div>
    </div>
  );
};

export default FloatingAvatar;
