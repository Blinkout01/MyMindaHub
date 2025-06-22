import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Pause, Play } from 'lucide-react';

interface BackgroundMusicProps {
  isPlaying?: boolean;
  volume?: number;
}

const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ 
  isPlaying = true, 
  volume = 0.3 
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(volume);
  const [isMuted, setIsMuted] = useState(false);

  // Free ambient music URL from Pixabay (royalty-free)
  const musicUrl = "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3";

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = currentVolume;
    audio.loop = true;

    if (isPlaying && !isMuted) {
      audio.play().catch(console.error);
      setIsAudioPlaying(true);
    } else {
      audio.pause();
      setIsAudioPlaying(false);
    }

    return () => {
      audio.pause();
    };
  }, [isPlaying, currentVolume, isMuted]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isAudioPlaying) {
      audio.pause();
      setIsAudioPlaying(false);
    } else {
      audio.play().catch(console.error);
      setIsAudioPlaying(true);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? currentVolume : 0;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setCurrentVolume(newVolume);
    if (audioRef.current && !isMuted) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border-2 border-purple-200">
        <div className="flex items-center space-x-3">
          {/* Music note animation */}
          <div className="text-2xl animate-bounce">🎵</div>
          
          {/* Play/Pause button */}
          <button
            onClick={togglePlayPause}
            className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-110"
          >
            {isAudioPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </button>

          {/* Mute button */}
          <button
            onClick={toggleMute}
            className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-110"
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </button>

          {/* Volume slider */}
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={currentVolume}
              onChange={handleVolumeChange}
              className="w-16 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Music info */}
          <div className="text-xs text-gray-600 max-w-24">
            <div className="font-medium">Calm Learning</div>
            <div className="text-purple-600">🎼 Peaceful Vibes</div>
          </div>
        </div>
      </div>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        preload="auto"
        onLoadStart={() => console.log('Loading calming music...')}
        onCanPlay={() => console.log('Music ready to play')}
        onError={(e) => console.error('Music loading error:', e)}
      >
        <source src={musicUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Custom slider styles */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, #8b5cf6, #ec4899);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, #8b5cf6, #ec4899);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default BackgroundMusic;