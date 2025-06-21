import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Eye, EyeOff, Star, Heart, Brain } from 'lucide-react';
import { useStore } from '../store';
import { supabase } from '../lib/supabaseClient'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const setCurrentUser = useStore((state) => state.setCurrentUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isAdmin) {
        // Query Supabase for admin credentials
        const { data, error: dbError } = await supabase
          .from('admin')
          .select('*')
          .eq('username', username)
          .eq('password', password)
          .single();

        if (dbError || !data) {
          setError('Invalid admin credentials');
          setLoading(false);
          return;
        }
        console.log(data); // Debug: check what is returned

        setCurrentUser({
          id: data.id,
          username: data.username, // Make sure 'username' exists in your table
          role: 'counselor',
          name: data.username,
        });
        navigate('/dashboard');
        return;
      }

      // Student login: check credentials in student table
      const { data: student, error: studentError } = await supabase
        .from('student')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (studentError || !student) {
        setError('Invalid username or password');
        setLoading(false);
        return;
      }

      setCurrentUser({
        id: student.id,
        name: student.full_name,
        role: 'student',
        class: student.class,
        gender: student.gender,
        username: student.username,
      });
      navigate('/topics');
    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center py-8">
      {/* Floating Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 animate-bounce delay-300">
          <Star className="h-5 w-5 text-yellow-400 animate-pulse" />
        </div>
        <div className="absolute bottom-32 right-16 animate-bounce delay-700">
          <Heart className="h-6 w-6 text-pink-400 animate-pulse" />
        </div>
        <div className="absolute top-1/2 left-20 animate-bounce delay-1000">
          <Brain className="h-4 w-4 text-purple-400 animate-pulse" />
        </div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="relative">
          {/* Glowing border effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-3xl blur opacity-75"></div>
          
          <div className="relative bg-gradient-to-br from-white to-purple-50 rounded-3xl border-4 border-purple-200 p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <LogIn className="h-16 w-16 text-purple-600 animate-pulse" />
                  <div className="absolute -top-2 -right-2 text-3xl animate-bounce">
                    {isAdmin ? '🧑‍🏫' : '🎓'}
                  </div>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent mb-2">
                {isAdmin ? 'Counselor Login' : 'Welcome Back!'}
              </h1>
              
              <p className="text-lg text-gray-600">
                {isAdmin ? 'Access your dashboard' : 'Ready to continue learning? 🚀'}
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
                <label htmlFor="username" className="block text-lg font-bold text-gray-700 mb-2 flex items-center space-x-2">
                  <div className="text-2xl">👤</div>
                  <span>Username</span>
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border-3 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-400 text-lg bg-gradient-to-r from-white to-purple-50 transition-all duration-300"
                  required
                  disabled={loading}
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-lg font-bold text-gray-700 mb-2 flex items-center space-x-2">
                  <div className="text-2xl">🔒</div>
                  <span>Password</span>
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border-3 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-400 text-lg bg-gradient-to-r from-white to-purple-50 transition-all duration-300"
                    required
                    disabled={loading}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform"
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-6 w-6 text-gray-400" />
                    ) : (
                      <Eye className="h-6 w-6 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-2xl border-2 border-yellow-300">
                <input
                  type="checkbox"
                  id="isAdmin"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-2 border-gray-300 rounded"
                  disabled={loading}
                />
                <label htmlFor="isAdmin" className="ml-3 flex items-center space-x-2 text-lg font-medium text-gray-700">
                  <div className="text-2xl">🧑‍🏫</div>
                  <span>Login as Counselor</span>
                </label>
              </div>

              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white py-4 rounded-2xl font-bold text-xl hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <span>Login</span>
                    <div className="text-2xl">🚀</div>
                  </div>
                )}
              </button>
            </form>

            {!isAdmin && (
              <div className="mt-6 text-center">
                <p className="text-lg text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-purple-600 hover:text-purple-700 font-bold hover:underline">
                    Sign Up here! 📝
                  </Link>
                </p>
              </div>
            )}

            {/* Fun encouragement */}
            <div className="mt-6 text-center">
              <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-4 border-2 border-green-300">
                <div className="text-2xl mb-2">🌟</div>
                <p className="text-gray-700 font-medium">
                  {isAdmin ? 'Ready to help students shine!' : 'Ready to learn and grow? You\'ve got this!'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;