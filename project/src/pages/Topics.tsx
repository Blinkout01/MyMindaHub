import React from 'react';
import { Link } from 'react-router-dom';
import { Smile, Heart, Shield } from 'lucide-react';

const topics = [
  {
    id: 'emotions',
    title: 'Understanding Emotions',
    description: 'Learn about different feelings and how to express them!',
    icon: Smile,
    color: 'text-blue-600',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'stress',
    title: 'Stress Management',
    description: 'Discover fun ways to stay calm and relaxed!',
    icon: Heart,
    color: 'text-pink-600',
    image: 'https://images.unsplash.com/photo-1520808663317-647b476a81b9?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'bullying',
    title: 'Bullying Prevention',
    description: 'Learn how to stay safe and help others!',
    icon: Shield,
    color: 'text-purple-600',
    image: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&q=80&w=800'
  }
];

const Topics = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-800">Choose a Topic to Learn About!</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => {
          const Icon = topic.icon;
          return (
            <Link key={topic.id} to={`/topics/${topic.id}`} className="card hover:scale-105 transition-transform">
              <div className="relative h-40 mb-4 rounded-t-lg overflow-hidden">
                <img 
                  src={topic.image} 
                  alt={topic.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />
              </div>
              <div className="text-center p-4">
                <div className="flex justify-center mb-3">
                  <Icon className={`h-10 w-10 ${topic.color}`} />
                </div>
                <h2 className="text-xl font-semibold mb-2">{topic.title}</h2>
                <p className="text-gray-600 mb-4">{topic.description}</p>
                <span className="btn-primary">Start Learning</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Topics;