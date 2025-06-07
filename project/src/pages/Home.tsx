import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Smile, Heart, Shield, PlayCircle, ExternalLink } from 'lucide-react';
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
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative min-h-[600px] flex items-center justify-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=2000")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/70 to-purple-800/70" />
        <div className="relative max-w-4xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl font-bold mb-6">Your Mental Health Matters</h1>
          <p className="text-xl mb-8 leading-relaxed">
            Mental health is just as important as physical health. Understanding your emotions,
            managing stress, and knowing how to seek help are essential life skills that everyone
            should learn. Let's explore this journey together in a safe and supportive environment.
          </p>
          <button 
            onClick={handleAssessmentClick}
            className="inline-flex items-center px-8 py-3 text-lg bg-white text-purple-800 rounded-full hover:bg-purple-100 transition-colors"
          >
            Take Mental Health Assessment
          </button>
        </div>
      </div>

      {/* Topics Section */}
      <div className="py-20 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-purple-800 mb-4">Learning Topics</h2>
          <p className="text-gray-600 text-center mb-12">
            Explore our carefully designed topics to help you understand and manage your mental well-being
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Emotions Card */}
            <div className="flip-card h-64">
              <div className="flip-card-inner">
                <div className="flip-card-front card flex flex-col items-center justify-center">
                  <Smile className="h-12 w-12 text-purple-600 mb-4" />
                  <h3 className="text-xl font-semibold">Understanding Emotions</h3>
                </div>
                <div className="flip-card-back card flex flex-col items-center justify-center p-6">
                  <p className="text-gray-600">
                    Learn about different feelings and how to express them in healthy ways!
                  </p>
                </div>
              </div>
            </div>

            {/* Stress Management Card */}
            <div className="flip-card h-64">
              <div className="flip-card-inner">
                <div className="flip-card-front card flex flex-col items-center justify-center">
                  <Heart className="h-12 w-12 text-pink-600 mb-4" />
                  <h3 className="text-xl font-semibold">Stress Management</h3>
                </div>
                <div className="flip-card-back card flex flex-col items-center justify-center p-6">
                  <p className="text-gray-600">
                    Discover effective ways to stay calm and handle stress in your daily life!
                  </p>
                </div>
              </div>
            </div>

            {/* Bullying Prevention Card */}
            <div className="flip-card h-64">
              <div className="flip-card-inner">
                <div className="flip-card-front card flex flex-col items-center justify-center">
                  <Shield className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold">Bullying Prevention</h3>
                </div>
                <div className="flip-card-back card flex flex-col items-center justify-center p-6">
                  <p className="text-gray-600">
                    Learn how to stay safe, stand up for yourself, and help others!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CyberAlert Game Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            {/* <Gamepad2 className="h-12 w-12 text-purple-600 mr-3" /> */}
            <h2 className="text-3xl font-bold text-center text-purple-800 mb-4">Interactive Games</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Enjoy learning about mental health through fun and interactive games 
            that let you practice what you’ve discovered in an exciting way!
          </p>
        </div>

        {/* Game Card */}
        <div className="card mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-purple-700 mb-2">
                Cyber Alert: Mind & Web Safe!
              </h2>
              <p className="text-gray-600">
                Cyber Alert is a game that teaches how to protect your mind and your digital world through solving puzzles, 
                answering quizzes, and completing missions!
              </p>
            </div>
            <a
              href="https://view.genially.com/684317778120092079445388/play-cyber-alert"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center space-x-2 text-purple-700 hover:text-purple-900"
            >
              <ExternalLink className="h-5 w-5" />
              <span>Open in New Tab</span>
            </a>
          </div>
        
          {/* Game Preview Image */}
          <a
            href="https://view.genial.ly/684317778120092079445388/play-cyber-alert"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <img
              src="../images/CyberAlert.png"
              alt="Cyber Alert Mental Health Game"
              className="w-full rounded-lg shadow-md border-2 border-purple-200 hover:opacity-90 transition duration-300"
            />
          </a>
        </div>
      </div>

      {/* Video Section */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-purple-800 mb-4">Learn More</h2>
          <p className="text-gray-600 text-center mb-12">
            Watch this short video to understand why it's important to talk about mental health
            and how to reach out for help when you need it.
          </p>

          <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube-nocookie.com/embed/OyQ8KaTbjnw?si=jU1rdfjE6VOVMDq6"
              title="Understanding Mental Health"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => navigate(currentUser ? '/topics' : '/login')}
              className="inline-flex items-center space-x-2 px-8 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
            >
              <PlayCircle className="h-6 w-6" />
              <span>Start Your Journey</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;