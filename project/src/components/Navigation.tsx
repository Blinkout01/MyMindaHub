import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, LogOut, User, Gamepad2, BookText, NotebookPen } from 'lucide-react';
import { useStore } from '../store';


const Navigation = () => {
  const { currentUser, setCurrentUser } = useStore();

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-purple-600" />
            <span className="text-xl font-bold text-gray-800">MyMindaHub</span>
          </Link>

          <div className="flex items-center space-x-6">
            {!currentUser && (
              <>
                <Link to="/topics\" className="nav-link">
                  <BookText className="h-5 w-5" />
                  <span>Topics</span>
                </Link>
                <Link to="/assessment" className="nav-link">
                  <NotebookPen className="h-5 w-5" />
                  <span>Assessment</span>
                </Link>
              </>
            )}
            {currentUser?.role === 'student' && (
              <>
                <Link to="/topics" className="nav-link">
                  <BookText className="h-5 w-5" />
                  <span>Topics</span>
                </Link>
                <Link to="/assessment" className="nav-link">
                  <NotebookPen className="h-5 w-5" />
                  <span>Assessment</span>
                </Link>
                <Link to="/interactive-games" className="nav-link">
                  <Gamepad2 className="h-5 w-5" />
                  <span>Interactive Games</span>
                </Link>
                <Link to="/student-dashboard" className="nav-link">
                  <User className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
              </>
            )}
            {currentUser ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-gray-600 hover:text-red-500"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 text-gray-600 hover:text-purple-600"
              >
                <User className="h-5 w-5" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;