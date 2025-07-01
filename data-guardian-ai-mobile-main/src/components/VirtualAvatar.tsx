
import React, { useState, useEffect } from 'react';
import { Zap, Power, Eye, Brain } from 'lucide-react';

const VirtualAvatar = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentExpression, setCurrentExpression] = useState('normal');
  const [eyeMovement, setEyeMovement] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // 模拟AI虚拟形象的动画状态
    const interval = setInterval(() => {
      setIsAnimating(prev => !prev);
      
      // 随机切换表情
      const expressions = ['normal', 'thinking', 'speaking', 'happy', 'analyzing'];
      setCurrentExpression(expressions[Math.floor(Math.random() * expressions.length)]);
      
      // 模拟眼球移动
      setEyeMovement({
        x: Math.random() * 4 - 2,
        y: Math.random() * 2 - 1
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getAvatarStyle = () => {
    let baseStyle = "w-14 h-14 rounded-full flex items-center justify-center relative transition-all duration-500 border-3 ";
    
    if (isAnimating) {
      baseStyle += "animate-pulse scale-110 ";
    }
    
    switch (currentExpression) {
      case 'thinking':
        return baseStyle + "bg-gradient-to-br from-blue-400 via-cyan-500 to-blue-600 border-blue-300 shadow-xl shadow-blue-500/60";
      case 'speaking':
        return baseStyle + "bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 border-green-300 shadow-xl shadow-green-500/60";
      case 'analyzing':
        return baseStyle + "bg-gradient-to-br from-purple-400 via-violet-500 to-purple-600 border-purple-300 shadow-xl shadow-purple-500/60";
      case 'happy':
        return baseStyle + "bg-gradient-to-br from-yellow-400 via-orange-500 to-yellow-600 border-yellow-300 shadow-xl shadow-yellow-500/60";
      default:
        return baseStyle + "bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 border-cyan-300 shadow-xl shadow-cyan-500/60";
    }
  };

  const renderDigitalHuman = () => {
    return (
      <div className="relative w-full h-full">
        {/* 数字人头部轮廓 - 更立体的设计 */}
        <div className="absolute inset-1 bg-white/30 rounded-full backdrop-blur-sm border border-white/40"></div>
        
        {/* 面部特征容器 */}
        <div className="absolute inset-2 rounded-full overflow-hidden">
          {/* 眼睛部分 - 更真实的眼睛设计 */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {/* 左眼 */}
            <div className="relative w-2 h-1.5 bg-white rounded-full flex items-center justify-center">
              <div 
                className={`w-1 h-1 bg-gray-800 rounded-full transition-transform duration-200 ${
                  currentExpression === 'thinking' ? 'animate-pulse' : ''
                }`}
                style={{
                  transform: `translate(${eyeMovement.x}px, ${eyeMovement.y}px)`
                }}
              >
                <div className="w-0.5 h-0.5 bg-white rounded-full absolute top-0 left-0"></div>
              </div>
            </div>
            {/* 右眼 */}
            <div className="relative w-2 h-1.5 bg-white rounded-full flex items-center justify-center">
              <div 
                className={`w-1 h-1 bg-gray-800 rounded-full transition-transform duration-200 ${
                  currentExpression === 'thinking' ? 'animate-pulse' : ''
                }`}
                style={{
                  transform: `translate(${eyeMovement.x}px, ${eyeMovement.y}px)`
                }}
              >
                <div className="w-0.5 h-0.5 bg-white rounded-full absolute top-0 left-0"></div>
              </div>
            </div>
          </div>
          
          {/* 鼻子 */}
          <div className="absolute top-3.5 left-1/2 transform -translate-x-1/2">
            <div className="w-0.5 h-1 bg-white/60 rounded-full"></div>
          </div>
          
          {/* 嘴部表情 - 更丰富的表情变化 */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
            {currentExpression === 'speaking' ? (
              <div className="w-3 h-1.5 bg-white rounded-full animate-pulse flex items-center justify-center">
                <div className="w-1 h-0.5 bg-gray-300 rounded-full"></div>
              </div>
            ) : currentExpression === 'happy' ? (
              <div className="w-3 h-1 bg-white rounded-b-full"></div>
            ) : currentExpression === 'thinking' ? (
              <div className="w-2 h-0.5 bg-white rounded-full"></div>
            ) : (
              <div className="w-2 h-0.5 bg-white rounded-full"></div>
            )}
          </div>
        </div>
        
        {/* AI状态指示器 */}
        <div className="absolute -top-1 -right-1">
          {currentExpression === 'analyzing' ? (
            <div className="w-5 h-5 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center animate-spin">
              <Brain className="w-2.5 h-2.5 text-white" />
            </div>
          ) : currentExpression === 'speaking' || isAnimating ? (
            <div className="w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
              <Zap className="w-2 h-2 text-white" />
            </div>
          ) : (
            <div className="w-3 h-3 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
              <Power className="w-1.5 h-1.5 text-white" />
            </div>
          )}
        </div>
        
        {/* 数据流效果 */}
        {currentExpression === 'analyzing' && (
          <div className="absolute inset-0 rounded-full">
            <div className="absolute top-1 left-2 w-1 h-1 bg-cyan-300 rounded-full animate-ping"></div>
            <div className="absolute top-3 right-2 w-0.5 h-0.5 bg-blue-300 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-2 left-3 w-0.5 h-0.5 bg-purple-300 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          </div>
        )}
        
        {/* 能量光环效果 */}
        {isAnimating && (
          <>
            <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping"></div>
            <div className="absolute inset-1 rounded-full border border-white/30 animate-pulse"></div>
          </>
        )}
        
        {/* 呼吸光效 */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent animate-pulse"></div>
      </div>
    );
  };

  return (
    <div className={getAvatarStyle()}>
      {renderDigitalHuman()}
    </div>
  );
};

export default VirtualAvatar;
