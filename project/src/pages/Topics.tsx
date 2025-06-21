import React from 'react';
import { Link } from 'react-router-dom';
import { Smile, Heart, Shield, Star, Sparkles } from 'lucide-react';

const topics = [
  {
    id: 'emotions',
    title: 'Understanding Emotions',
    description: 'Learn about different feelings and how to express them!',
    icon: Smile,
    color: 'text-blue-600',
    bgGradient: 'from-blue-100 to-blue-200',
    borderColor: 'border-blue-300',
    emoji: '😊',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'stress',
    title: 'Stress Management',
    description: 'Discover fun ways to stay calm and relaxed!',
    icon: Heart,
    color: 'text-pink-600',
    bgGradient: 'from-pink-100 to-pink-200',
    borderColor: 'border-pink-300',
    emoji: '🧘‍♀️',
    image: 'https://images.unsplash.com/photo-1520808663317-647b476a81b9?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'bullying',
    title: 'Bullying Prevention',
    description: 'Learn how to stay safe and help others!',
    icon: Shield,
    color: 'text-purple-600',
    bgGradient: 'from-purple-100 to-purple-200',
    borderColor: 'border-purple-300',
    emoji: '🛡️',
    image: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&q=80&w=800'
  }
];

const Topics = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
      {/* Floating Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 animate-bounce delay-300">
          <Star className="h-5 w-5 text-yellow-400 animate-pulse" />
        </div>
        <div className="absolute bottom-32 left-16 animate-bounce delay-700">
          <Sparkles className="h-6 w-6 text-pink-400 animate-pulse" />
        </div>
        <div className="absolute top-1/2 right-20 animate-bounce delay-1000">
          <Star className="h-4 w-4 text-blue-400 animate-pulse" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4 animate-bounce">📚🌟</div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            Choose Your Learning Adventure!
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Pick a topic and start your journey to becoming a feelings expert! 🚀
          </p>
        </div>

        {/* Topics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.map((topic, index) => {
            const Icon = topic.icon;
            return (
              <div key={topic.id} className="group relative">
                {/* Glowing border effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${topic.bgGradient} rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-500`}></div>
                
                <Link 
                  to={`/topics/${topic.id}`} 
                  className={`relative block bg-gradient-to-br ${topic.bgGradient} rounded-3xl border-4 ${topic.borderColor} overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
                >
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={topic.image} 
                      alt={topic.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/50 to-transparent" />
                    
                    {/* Floating emoji */}
                    <div className="absolute top-4 right-4 text-4xl animate-bounce">
                      {topic.emoji}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className={`p-3 rounded-full bg-white shadow-lg group-hover:animate-pulse`}>
                        <Icon className={`h-8 w-8 ${topic.color}`} />
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-purple-700 transition-colors">
                      {topic.title}
                    </h2>
                    
                    <p className="text-gray-700 mb-6 text-lg">
                      {topic.description}
                    </p>
                    
                    <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full font-bold text-purple-700 shadow-lg group-hover:bg-purple-100 transition-all duration-300">
                      <span>Start Learning</span>
                      <div className="text-xl group-hover:animate-bounce">🎯</div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Fun Encouragement Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 rounded-3xl p-8 border-4 border-purple-200 shadow-xl">
            <div className="text-4xl mb-4">Wisdom Corner</div>
            <h3 className="text-2xl font-bold text-purple-800 mb-4">
              You're Amazing!
            </h3>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Every topic you learn makes you stronger and smarter! Take your time, have fun, 
              and remember - you're doing something really important by learning about your mind! 💪🧠
            </p>
            <div className="flex justify-center space-x-4 mt-6">
              <div className="text-3xl animate-bounce">⭐</div>
              <div className="text-3xl animate-bounce delay-200">🌟</div>
              <div className="text-3xl animate-bounce delay-400">✨</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topics;