import React from 'react';
import { Gamepad2, ExternalLink, Star, Sparkles, Heart } from 'lucide-react';

const InteractiveGames = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-8">
      {/* Floating Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 animate-bounce delay-300">
          <Star className="h-6 w-6 text-yellow-400 animate-pulse" />
        </div>
        <div className="absolute bottom-32 right-16 animate-bounce delay-700">
          <Sparkles className="h-5 w-5 text-pink-400 animate-pulse" />
        </div>
        <div className="absolute top-1/2 left-20 animate-bounce delay-1000">
          <Heart className="h-4 w-4 text-purple-400 animate-pulse" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4 animate-bounce">🎮🎯</div>
          <div className="flex items-center justify-center mb-4">
            <Gamepad2 className="h-16 w-16 text-purple-600 mr-4 animate-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Interactive Games
            </h1>
            <Gamepad2 className="h-16 w-16 text-purple-600 ml-4 animate-pulse" />
          </div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Have fun while learning about mental health! These interactive games help you practice 
          what you've learned in a fun and engaging way. 
          </p>
        </div>

        {/* Main Game Card */}
        <div className="relative group mb-12">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          
          <div className="relative bg-gradient-to-br from-white to-purple-50 rounded-3xl border-4 border-purple-200 p-8 shadow-2xl">
            <div className="flex items-center justify-between flex-wrap gap-6 mb-8">
              <div className="flex items-center">
                <div className="text-6xl mr-6 animate-bounce">🎪</div>
                <div>
                  <h2 className="text-3xl font-bold text-purple-700 mb-3">
                    Mental Health Adventure
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                  Focus Your Mind is a fast-paced game that challenges your focus and quick thinking. 
                  <br></br>
                  Pick the color of the word—not what it says. Stay alert—every second counts!
                  </p>
                </div>
              </div>
              
              <a
                href="https://view.genially.com/684232f5327c1a78234b753c/interactive-content-focus-your-mind"
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white px-8 py-4 rounded-full font-bold text-xl hover:from-green-600 hover:via-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-110 shadow-xl hover:shadow-2xl flex items-center space-x-3"
              >
                <ExternalLink className="h-6 w-6 group-hover/btn:animate-bounce" />
                <span>Start Adventure!</span>
                <div className="text-2xl group-hover/btn:animate-bounce">🚀</div>
              </a>
            </div>

            {/* Game Preview */}
            <div className="relative">
              <a
                href="https://view.genially.com/684232f5327c1a78234b753c/interactive-content-focus-your-mind"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative overflow-hidden rounded-3xl border-4 border-purple-300 hover:border-purple-500 transition-all duration-300 transform hover:scale-105"
              >
                <div className="bg-gradient-to-br from-purple-200 via-blue-200 to-green-200 p-16 text-center">
                <img
                src="/images/FocusYourMind.png"
                alt="Mental Health Adventure Game Thumbnail"
                className="w-full rounded-lg shadow-md border-2 border-purple-200 hover:opacity-90 transition duration-300"
                />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>
        </div>

        {/* Learning Goals and Tips */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Learning Goals Card */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-green-400 rounded-3xl blur opacity-75"></div>
            <div className="relative bg-gradient-to-br from-blue-100 to-green-100 rounded-3xl border-4 border-blue-200 p-8 text-center shadow-xl">
              <div className="text-6xl mb-6 animate-bounce">🎯</div>
              <h3 className="text-2xl font-bold mb-6 text-blue-800">What You'll Learn!</h3>
              <div className="space-y-4 text-left">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">😊</div>
                  <span className="text-lg text-gray-700">Practice recognizing different emotions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">🧘‍♀️</div>
                  <span className="text-lg text-gray-700">Learn awesome coping strategies</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">🤝</div>
                  <span className="text-lg text-gray-700">Build empathy and understanding</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">🧩</div>
                  <span className="text-lg text-gray-700">Develop problem-solving superpowers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Game Tips Card */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-3xl blur opacity-75"></div>
            <div className="relative bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl border-4 border-pink-200 p-8 text-center shadow-xl">
              <div className="text-6xl mb-6 animate-bounce">💡</div>
              <h3 className="text-2xl font-bold mb-6 text-purple-800">Super Game Tips!</h3>
              <div className="space-y-4 text-left">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">📖</div>
                  <span className="text-lg text-gray-700">Take your time to read each scenario</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">🤔</div>
                  <span className="text-lg text-gray-700">Think about what you've learned</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">🔄</div>
                  <span className="text-lg text-gray-700">Try different choices to see outcomes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">🙋‍♀️</div>
                  <span className="text-lg text-gray-700">Ask for help if you need it</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Encouragement Section */}
        <div className="text-center">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 rounded-3xl blur opacity-75"></div>
            <div className="relative bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 rounded-3xl border-4 border-yellow-300 p-8 shadow-2xl">
              <div className="flex items-center justify-center mb-6">
                <div className="text-5xl mr-4 animate-bounce">🌟</div>
                <h3 className="text-3xl font-bold text-purple-700">Remember, Amazing Student!</h3>
                <div className="text-5xl ml-4 animate-bounce delay-300">🌟</div>
              </div>
              
              <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-6">
                Games are a super fun way to learn, but if you ever feel upset or need to talk to someone, 
                don't hesitate to reach out to a teacher, counselor, or trusted adult. You're never alone, 
                and there are always people who care about you! 💖
              </p>
              
              <div className="flex justify-center space-x-6">
                <div className="text-4xl animate-bounce">🤗</div>
                <div className="text-4xl animate-bounce delay-200">💪</div>
                <div className="text-4xl animate-bounce delay-400">🌈</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveGames;
