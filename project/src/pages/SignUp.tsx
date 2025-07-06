import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Star, Heart, Sparkles } from 'lucide-react';
import { useStore } from '../store';
import { supabase } from '../lib/supabaseClient';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    gender: '',
    class: ''
  });
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const setCurrentUser = useStore((state) => state.setCurrentUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Insert new student into Supabase
      const { data, error: dbError } = await supabase
        .from('student')
        .insert([
          {
            full_name: formData.fullName,
            username: formData.username,
            password: formData.password,
            gender: formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1).toLowerCase(),
            class: formData.class
          }
        ])
        .select()
        .single();

      if (dbError) {
        if (dbError.code === '23505') {
          setError('Username already exists.');
        } else {
          setError('Sign up failed. Please try again.');
        }
        return;
      }

      /*setCurrentUser({
        id: data.id,
        name: data.full_name,
        role: 'student',
        class: data.class,
        gender: data.gender,
        username: data.username,
      });*/
      navigate('/');
    } catch (err) {
      setError('Sign up failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center py-8">
      {/* Floating Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 right-10 animate-bounce delay-500">
          <Star className="h-6 w-6 text-yellow-400 animate-pulse" />
        </div>
        <div className="absolute bottom-20 left-16 animate-bounce delay-1000">
          <Heart className="h-5 w-5 text-pink-400 animate-pulse" />
        </div>
        <div className="absolute top-1/3 left-10 animate-bounce delay-700">
          <Sparkles className="h-4 w-4 text-purple-400 animate-pulse" />
        </div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="relative">
          {/* Glowing border effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-3xl blur opacity-75"></div>
          
          <div className="relative bg-gradient-to-br from-white to-green-50 rounded-3xl border-4 border-green-200 p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <UserPlus className="h-16 w-16 text-green-600 animate-pulse" />
                  <div className="absolute -top-2 -right-2 text-3xl animate-bounce">🎉</div>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
                Join Our Learning Family!
              </h1>
              
              <p className="text-lg text-gray-600">
                Create your account and start your amazing journey! 🚀
              </p>
            </div>
            
            {error && (
              <div className="bg-gradient-to-r from-red-100 to-red-200 border-2 border-red-300 text-red-700 p-4 rounded-2xl mb-6 text-center">
                <div className="text-2xl mb-2">⚠️</div>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-lg font-bold text-gray-700 mb-2 flex items-center space-x-2">
                  <div className="text-2xl">👤</div>
                  <span>Full Name</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-3 border-green-200 rounded-2xl focus:ring-4 focus:ring-green-300 focus:border-green-400 text-lg bg-gradient-to-r from-white to-green-50 transition-all duration-300"
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="username" className="block text-lg font-bold text-gray-700 mb-2 flex items-center space-x-2">
                  <div className="text-2xl">🏷️</div>
                  <span>Username</span>
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-3 border-green-200 rounded-2xl focus:ring-4 focus:ring-green-300 focus:border-green-400 text-lg bg-gradient-to-r from-white to-green-50 transition-all duration-300"
                  required
                  placeholder="Choose a cool username"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-lg font-bold text-gray-700 mb-2 flex items-center space-x-2">
                  <div className="text-2xl">🔒</div>
                  <span>Password</span>
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-3 border-green-200 rounded-2xl focus:ring-4 focus:ring-green-300 focus:border-green-400 text-lg bg-gradient-to-r from-white to-green-50 transition-all duration-300"
                  required
                  placeholder="Create a strong password"
                />
              </div>

              <div>
                <label htmlFor="gender" className="block text-lg font-bold text-gray-700 mb-2 flex items-center space-x-2">
                  <div className="text-2xl">👫</div>
                  <span>Gender</span>
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-3 border-green-200 rounded-2xl focus:ring-4 focus:ring-green-300 focus:border-green-400 text-lg bg-gradient-to-r from-white to-green-50 transition-all duration-300"
                  required
                >
                  <option value="">Select your gender</option>
                  <option value="male">Male 👦</option>
                  <option value="female">Female 👧</option>
                </select>
              </div>

              <div>
                <label htmlFor="class" className="block text-lg font-bold text-gray-700 mb-2 flex items-center space-x-2">
                  <div className="text-2xl">🏫</div>
                  <span>Class</span>
                </label>
                <select
                  id="class"
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-3 border-green-200 rounded-2xl focus:ring-4 focus:ring-green-300 focus:border-green-400 text-lg bg-gradient-to-r from-white to-green-50 transition-all duration-300"
                  required
                >
                  <option value="">Select your class</option>
                  <option value="5A">5A 📚</option>
                  <option value="5B">5B 📖</option>
                  <option value="5C">5C 📝</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white py-4 rounded-2xl font-bold text-xl hover:from-green-600 hover:via-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                <div className="flex items-center justify-center space-x-2">
                  <span>Create My Account</span>
                  <div className="text-2xl">🎉</div>
                </div>
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-lg text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-green-600 hover:text-green-700 font-bold hover:underline">
                  Login here! 🔑
                </Link>
              </p>
            </div>

            {/* Fun encouragement */}
            <div className="mt-6 text-center">
              <div className="bg-gradient-to-r from-yellow-100 to-pink-100 rounded-2xl p-4 border-2 border-yellow-300">
                <div className="text-2xl mb-2">🌟</div>
                <p className="text-gray-700 font-medium">
                  You're about to start an amazing adventure of learning and growing! 🚀
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;