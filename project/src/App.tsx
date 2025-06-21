import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Topics from './pages/Topics';
import TopicDetail from './pages/TopicDetail';
import Quiz from './pages/Quiz';
import Assessment from './pages/Assessment';
import Dashboard from './pages/Dashboard';
import StudentDashboard from './pages/StudentDashboard';
import InteractiveGames from './pages/InteractiveGames';
import Login from './pages/Login';
import Register from './pages/SignUp';
import { useStore } from './store';

// Protected Route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const currentUser = useStore((state) => state.currentUser);
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  const currentUser = useStore((state) => state.currentUser);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/topics/:id" element={<TopicDetail />} />
            <Route path="/assessment" element={<Assessment />} />
            
            {/* Protected Routes */}
            <Route path="/quiz/:topicId" element={
              <ProtectedRoute>
                <Quiz />
              </ProtectedRoute>
            } />
            <Route path="/student-dashboard" element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            } />
            <Route path="/interactive-games" element={
              <ProtectedRoute>
                <InteractiveGames />
              </ProtectedRoute>
            } />
            {currentUser?.role === 'counselor' && (
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
            )}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;