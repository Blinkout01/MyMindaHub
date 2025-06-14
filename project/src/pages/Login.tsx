import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useStore } from '../store';
import { supabase } from '../lib/supabaseClient'; // <-- import your supabase client

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
        // Query Supabase for admin credentials
        const { data, error: dbError } = await supabase
          .from('admin')
          .select('*')
          .eq('username', username)
          .eq('password', password)
          .single();

        if (dbError || !data) {
          setError('Invalid admin credentials');
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