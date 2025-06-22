import React, { useState, useEffect } from 'react';
import { MessageCircle, ChevronRight } from 'lucide-react';

interface AvatarProps {
  name: string;
  message: string;
  emotion?: 'happy' | 'excited' | 'thinking' | 'encouraging';
  onNext?: () => void;
  showNext?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ 
  name, 
  message, 
  emotion = 'happy', 
  onNext, 
  showNext = false 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getAvatarEmoji = () => {
    switch (emotion) {
      case 'excited': return '🤩';
      case 'thinking': return '🤔';
      case 'encouraging': return '💪';
      default: return '😊';
    }
  };

  const getAvatarColor = () => {
    switch (emotion) {
      case 'excited': return 'from-yellow-400 to-orange-400';
      case 'thinking': return 'from-purple-400 to-blue-400';
      case 'encouraging': return 'from-green-400 to-blue-400';
      default: return 'from-pink-400 to-purple-400';
    }
  };

  return (
    <div className={`flex items-start space-x-4 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {/* Avatar */}
      <div className="relative">
        <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${getAvatarColor()} flex items-center justify-center text-2xl animate-bounce border-4 border-white shadow-xl`}>
          {getAvatarEmoji()}
        </div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
      </div>

      {/* Speech Bubble */}
      <div className="relative flex-1">
        <div className="bg-white rounded-2xl p-4 shadow-xl border-3 border-purple-200 relative">
          {/* Speech bubble tail */}
          <div className="absolute left-0 top-4 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white transform -translate-x-2"></div>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <MessageCircle className="h-4 w-4 text-purple-600" />
                <span className="font-bold text-purple-800">{name}</span>
              </div>
              <p className="text-gray-700 leading-relaxed">{message}</p>
            </div>
            
            {showNext && onNext && (
              <button
                onClick={onNext}
                className="ml-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-110 shadow-lg"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Avatar;