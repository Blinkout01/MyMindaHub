import React from 'react';
import { Gamepad2, ExternalLink } from 'lucide-react';

const InteractiveGames = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <h1 className="text-4xl font-bold text-purple-800">Interactive Games</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Have fun while learning about mental health! These interactive games help you practice 
          what you've learned in a fun and engaging way.
        </p>
      </div>

      {/* Game Card */}
      <div className="card mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-purple-700 mb-2">Mental Health Adventure</h2>
            <p className="text-gray-600">
              Focus Your Mind is a fast-paced game that challenges your focus and quick thinking. 
              <br></br>
              Pick the color of the word—not what it says. Stay alert—every second counts!
            </p>
          </div>
          <a
            href="https://view.genially.com/684232f5327c1a78234b753c/interactive-content-focus-your-mind"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center space-x-2"
          >
            <ExternalLink className="h-5 w-5" />
            <span>Open in New Tab</span>
          </a>
        </div>

        {/* Game Preview Image */}
        <a
          href="https://view.genial.ly/684232f5327c1a78234b753c"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <img
            src="/images/FocusYourMind.png"
            alt="Mental Health Adventure Game Thumbnail"
            className="w-full rounded-lg shadow-md border-2 border-purple-200 hover:opacity-90 transition duration-300"
          />
        </a>
      </div>

      {/* Learning Goals and Game Tips Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card bg-gradient-to-br from-blue-50 to-purple-50 text-center p-4">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold mb-2 text-purple-700">Learning Goals</h3>
          <ul className="text-gray-600 space-y-2">
            <li>• Enhance concentration and attention to detail.</li>
            <li>• Improve cognitive flexibility</li>
            <li>• Raise reaction time and decision-making skills under pressure.</li>
            <li>• Develop visual perception and color recognition accuracy</li>
          </ul>
        </div>

        <div className="card bg-gradient-to-br from-green-50 to-blue-50 text-center p-4">
          <div className="text-4xl mb-4">💡</div>
          <h3 className="text-xl font-semibold mb-2 text-purple-700">Game Tips</h3>
          <ul className="text-gray-600 space-y-2">
            <li>• Read the color, not the word</li>
            <li>• Stay calm under pressure</li>
            <li>• Practice makes perfect</li>
            <li>• Use peripheral vision</li>
          </ul>
        </div>
      </div>

      {/* Reminder Section */}
      <div className="mt-8 text-center">
        <div className="card bg-gradient-to-r from-purple-100 to-pink-100 p-4">
          <div className="flex items-center justify-center mb-4">
            <div className="text-3xl mr-3">🌟</div>
            <h3 className="text-xl font-semibold text-purple-700">Remember</h3>
          </div>
          <p className="text-gray-700">
            Games are a fun way to learn, but if you ever feel upset or need to talk to someone, 
            don't hesitate to reach out to a teacher, counselor, or trusted adult. You're never alone!
          </p>
        </div>
      </div>
    </div>
  );
};

export default InteractiveGames;
