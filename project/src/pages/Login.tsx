import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useStore } from '../store';

// Simulated admin credentials (in a real app, this would be handled by a backend)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
  role: 'counselor',
  name: 'Dr. Smith',
  id: 'admin-1'
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  
  const navigate = useNavigate();
  const setCurrentUser = useStore((state) => state.setCurrentUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isAdmin) {
        // Check admin credentials
        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
          setCurrentUser(ADMIN_CREDENTIALS);
          navigate('/dashboard');
          return;
        }
        setError('Invalid admin credentials');
        return;
      }

      // Regular student login (simulated for now)
      setCurrentUser({
        id: '1',
        name: username,
        role: 'student',
        class: '5A'
      });
      navigate('/topics');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="card">
          <div className="flex justify-center mb-6">
            <LogIn className="h-12 w-12 text-purple-600" />
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
            {isAdmin ? 'Counselor Login' : 'Student Login'}
          </h1>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isAdmin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="isAdmin" className="ml-2 block text-sm text-gray-700">
                Login as Counselor
              </label>
            </div>

            <button type="submit" className="w-full btn-primary">
              Login
            </button>
          </form>

          {!isAdmin && (
            <p className="mt-4 text-center text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-purple-600 hover:text-purple-700">
                Register here
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;