import * as React from 'react';
import { X } from 'lucide-react';

interface InfoPoint {
  id: string;
  x: number; // percentage
  y: number; // percentage
  title: string;
  content: string;
  emoji: string;
}

interface ClickableInfographicProps {
  title: string;
  backgroundImage: string;
  infoPoints: InfoPoint[];
  onAllPointsViewed?: () => void;
}

const ClickableInfographic: React.FC<ClickableInfographicProps> = ({
  title,
  backgroundImage,
  infoPoints,
  onAllPointsViewed
}: ClickableInfographicProps) => {
  const [selectedPoint, setSelectedPoint] = React.useState<InfoPoint | null>(null);
  const [viewedPoints, setViewedPoints] = React.useState<Set<string>>(new Set());

  const handlePointClick = (point: InfoPoint) => {
    setSelectedPoint(point);
    const newViewedPoints = new Set(viewedPoints);
    newViewedPoints.add(point.id);
    setViewedPoints(newViewedPoints);

    if (newViewedPoints.size === infoPoints.length && onAllPointsViewed) {
      setTimeout(() => onAllPointsViewed(), 1000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-purple-800 mb-2">{title}</h3>
        <p className="text-lg text-gray-600">Click on the glowing points to learn more! ✨</p>
      </div>

      <div className="relative">
        {/* Background Image */}
        <div 
          className="relative w-full h-96 rounded-2xl overflow-hidden border-4 border-purple-300 shadow-xl"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Overlay for better contrast */}
          <div className="absolute inset-0 bg-black/20"></div>

          {/* Info Points */}
          {infoPoints.map((point: InfoPoint) => (
            <button
              key={point.id}
              onClick={() => handlePointClick(point)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-4 border-white shadow-xl transition-all duration-300 hover:scale-125 ${
                viewedPoints.has(point.id)
                  ? 'bg-green-400'
                  : selectedPoint
                    ? 'bg-yellow-400'
                    : 'bg-yellow-400 animate-bounce'
              }`}
              style={{
                left: `${point.x}%`,
                top: `${point.y}%`
              }}
              disabled={!!selectedPoint}
            >
              <div className="text-2xl">{point.emoji}</div>
              {/* Ripple effect */}
              {!selectedPoint && !viewedPoints.has(point.id) && (
                <div className="absolute inset-0 rounded-full border-4 border-white animate-ping opacity-75"></div>
              )}
            </button>
          ))}

          {/* Progress indicator */}
          <div className="absolute top-4 right-4 bg-white/90 rounded-full px-4 py-2 font-bold text-purple-800">
            {viewedPoints.size}/{infoPoints.length} explored! 🎯
          </div>
        </div>

        {/* Info Modal */}
        {selectedPoint && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full border-4 border-purple-300 shadow-2xl">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-4xl">{selectedPoint.emoji}</div>
                  <h4 className="text-2xl font-bold text-purple-800">{selectedPoint.title}</h4>
                </div>
                <button
                  onClick={() => setSelectedPoint(null)}
                  className="text-gray-500 hover:text-gray-700 p-1"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {selectedPoint.content}
              </p>
              
              <button
                onClick={() => setSelectedPoint(null)}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-full font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
              >
                Got it! 👍
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Completion message */}
      {viewedPoints.size === infoPoints.length && (
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-6 border-3 border-green-300 animate-pulse">
            <div className="text-4xl mb-2">🎉</div>
            <h4 className="text-xl font-bold text-green-800 mb-2">Amazing Explorer!</h4>
            <p className="text-gray-700">You've discovered all the information points! 🌟</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClickableInfographic;