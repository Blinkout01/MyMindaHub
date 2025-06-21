import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Smile, Heart, Shield, PlayCircle, Gamepad2, ExternalLink, Star, Sparkles } from 'lucide-react';
import { useStore } from '../store';

const Home = () => {
  const navigate = useNavigate();
  const currentUser = useStore((state) => state.currentUser);

  const handleAssessmentClick = () => {
    if (currentUser) {
      navigate('/assessment');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">
      {/* Floating Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 animate-bounce">
          <Star className="h-6 w-6 text-yellow-400 animate-pulse" />
        </div>
        <div className="absolute top-40 right-20 animate-bounce delay-1000">
          <Sparkles className="h-8 w-8 text-pink-400 animate-pulse" />
        </div>
        <div className="absolute bottom-40 left-20 animate-bounce delay-500">
          <Star className="h-5 w-5 text-blue-400 animate-pulse" />
        </div>
        <div className="absolute top-60 left-1/3 animate-bounce delay-700">
          <Sparkles className="h-6 w-6 text-purple-400 animate-pulse" />
        </div>
      </div>

      {/* Hero Section */}
      <div 
        className="relative min-h-[600px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=2000")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/80 via-pink-500/70 to-blue-500/80" />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300/30 rounded-full animate-ping"></div>
          <div className="absolute top-32 right-16 w-16 h-16 bg-pink-300/30 rounded-full animate-ping delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-300/30 rounded-full animate-ping delay-500"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center text-white z-10">
          <div className="animate-bounce mb-6">
            <div className="text-6xl mb-4">🧠💖</div>
          </div>
          
          <h1 className="text-6xl font-bold mb-6 animate-pulse bg-gradient-to-r from-yellow-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
            Your Mental Health Matters
          </h1>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 mb-8 border-2 border-white/30">
            <p className="text-2xl mb-6 leading-relaxed font-medium">
              🌟 Hey there, awesome Year 5 students! 🌟
            </p>
            <p className="text-xl leading-relaxed">
              Mental health is just as important as physical health. Understanding your emotions,
            managing stress, and knowing how to seek help are essential life skills that everyone
            should learn. Let's explore this journey together in a safe and supportive environment.
            </p>
          </div>
          
          <button 
            onClick={handleAssessmentClick}
            className="group inline-flex items-center px-10 py-4 text-xl font-bold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 text-white rounded-full hover:from-yellow-500 hover:via-pink-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-3xl animate-pulse"
          >
            <span className="mr-3">🎯</span>
            Take Mental Health Assessment
            <span className="ml-3 group-hover:animate-bounce">🚀</span>
          </button>
        </div>
      </div>

      {/* Fun Learning Topics Section */}
      <div className="py-20 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="text-5xl mb-4 animate-bounce">🎓📚</div>
            <h2 className="text-4xl font-bold text-purple-800 mb-4">
              Super Fun Learning Adventures!
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Choose your learning adventure and become a feelings superhero! 🦸‍♀️🦸‍♂️
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Emotions Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <div className="relative flip-card h-80 bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl">
                <div className="flip-card-inner">
                  <div className="flip-card-front card flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 border-4 border-blue-300">
                    <div className="text-6xl mb-4 animate-bounce">😊</div>
                    <Smile className="h-12 w-12 text-blue-600 mb-4 animate-pulse" />
                    <h3 className="text-2xl font-bold text-blue-800">Understanding Emotions</h3>
                    <div className="text-4xl mt-2">😊😢😠</div>
                  </div>
                  <div className="flip-card-back card flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-200 to-blue-300 border-4 border-blue-400">
                    <div className="text-4xl mb-4">🎭</div>
                    <p className="text-gray-800 text-center font-medium">
                      Learn about different feelings and how to express them in healthy ways!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stress Management Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-red-400 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <div className="relative flip-card h-80 bg-gradient-to-br from-pink-50 to-pink-100 rounded-3xl">
                <div className="flip-card-inner">
                  <div className="flip-card-front card flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-pink-200 border-4 border-pink-300">
                    <div className="text-6xl mb-4 animate-bounce">💖</div>
                    <Heart className="h-12 w-12 text-pink-600 mb-4 animate-pulse" />
                    <h3 className="text-2xl font-bold text-pink-800">Stress Management</h3>
                    <div className="text-4xl mt-2">🧘‍♀️🌸🎵</div>
                  </div>
                  <div className="flip-card-back card flex flex-col items-center justify-center p-6 bg-gradient-to-br from-pink-200 to-pink-300 border-4 border-pink-400">
                    <div className="text-4xl mb-4">🌺</div>
                    <p className="text-gray-800 text-center font-medium">
                     Discover effective ways to stay calm and handle stress in your daily life! 
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bullying Prevention Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <div className="relative flip-card h-80 bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl">
                <div className="flip-card-inner">
                  <div className="flip-card-front card flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200 border-4 border-purple-300">
                    <div className="text-6xl mb-4 animate-bounce">🛡️</div>
                    <Shield className="h-12 w-12 text-purple-600 mb-4 animate-pulse" />
                    <h3 className="text-2xl font-bold text-purple-800">Bullying Prevention</h3>
                    <div className="text-4xl mt-2">🤝👫🦸‍♀️</div>
                  </div>
                  <div className="flip-card-back card flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-200 to-purple-300 border-4 border-purple-400">
                    <div className="text-4xl mb-4">🌟</div>
                    <p className="text-gray-800 text-center font-medium">
                     Learn how to stay safe, stand up for yourself, and help others!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CyberAlert Game Section */}
      <div className="py-20 bg-gradient-to-r from-green-100 via-blue-100 to-purple-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="text-6xl mb-4 animate-bounce">🎮🎯</div>
            <div className="flex items-center justify-center mb-4">
              <Gamepad2 className="h-16 w-16 text-purple-600 mr-4 animate-pulse" />
              <h2 className="text-4xl font-bold text-purple-800">Super Fun Mind Games!</h2>
              <Gamepad2 className="h-16 w-16 text-purple-600 ml-4 animate-pulse" />
            </div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Enjoy learning about mental health through fun and interactive games 
            that let you practice what you’ve discovered in an exciting way! 🧠🎉
            </p>
          </div>

          {/* Game Card */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative card bg-gradient-to-br from-white to-purple-50 border-4 border-purple-200 rounded-3xl overflow-hidden">
              <div className="flex items-center justify-between flex-wrap gap-4 mb-6 p-2">
                <div className="flex items-center">
                  <div className="text-5xl mr-4 animate-bounce">🎪</div>
                  <div>
                    <h3 className="text-3xl font-bold text-purple-700 mb-2">
                      Cyber Alert: Mind & Web Safe!
                    </h3>
                    <p className="text-lg text-gray-700">
                    Cyber Alert is a game that teaches how to protect your mind and your digital world through solving puzzles, 
                    answering quizzes, and completing missions! 🦸‍♀️💻
                    </p>
                  </div>
                </div>
                <a
                  href="https://view.genially.com/684317778120092079445388/play-cyber-alert"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-green-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl flex items-center space-x-2"
                >
                  <ExternalLink className="h-6 w-6 group-hover/btn:animate-bounce" />
                  <span>Start Adventure!</span>
                  <span className="text-2xl group-hover/btn:animate-bounce">🚀</span>
                </a>
              </div>
            
              {/* Game Preview */}
              <div className="relative">
                <a
                  href="https://view.genially.com/684317778120092079445388/play-cyber-alert"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative overflow-hidden rounded-2xl border-4 border-purple-300 hover:border-purple-500 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="bg-gradient-to-br from-purple-200 to-blue-200 p-12 text-center">
                    <img
                      src="/images/CyberAlert.png" // <-- use /images/ if image is in public/images
                      alt="Cyber Alert Mental Health Game"
                      className="w-full rounded-lg shadow-md border-2 border-purple-200 hover:opacity-90 transition duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="py-20 bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="text-6xl mb-4 animate-bounce">📺🌟</div>
            <h2 className="text-4xl font-bold text-orange-800 mb-4">Watch & Learn Together!</h2>
            <p className="text-xl text-gray-700 mb-8">
              Watch this short video to understand why it's important to talk about mental health
            and how to reach out for help when you need it. 🤗💪
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-red-400 rounded-3xl blur opacity-75"></div>
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube-nocookie.com/embed/OyQ8KaTbjnw?si=jU1rdfjE6VOVMDq6"
                title="Understanding Mental Health"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => navigate(currentUser ? '/topics' : '/login')}
              className="group inline-flex items-center space-x-3 px-10 py-4 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 text-white text-xl font-bold rounded-full hover:from-orange-500 hover:via-red-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-3xl"
            >
              <PlayCircle className="h-8 w-8 group-hover:animate-spin" />
              <span>Start Your Journey!</span>
              <div className="text-3xl group-hover:animate-bounce">🎉</div>
            </button>
          </div>
        </div>
      </div>

      {/* Fun Footer */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-2xl mb-4">Wisdom Corner</div>
          <p className="text-xl font-medium">
            Remember: You are AMAZING, BRAVE, and LOVED! 💖
          </p>
          <div className="text-2xl mt-4 animate-pulse">⭐🌟✨🌟⭐</div>
        </div>
      </div>
    </div>
  );
};

export default Home;