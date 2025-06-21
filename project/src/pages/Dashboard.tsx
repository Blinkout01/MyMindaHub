import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3,
  User,
  LogOut,
  Search,
  Filter,
  Users,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Award
} from 'lucide-react';
import { useStore } from '../store';

type Tab = 'overview' | 'students' | 'profile';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    department: 'Counseling',
  });
  const { currentUser, studentProgress, setCurrentUser } = useStore();
  const navigate = useNavigate();

  if (!currentUser || currentUser.role !== 'counselor') {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/login');
  };

  const handleSaveProfile = () => {
    setCurrentUser({
      ...currentUser,
      name: userInfo.name,
      email: userInfo.email
    });
    setIsEditing(false);
  };

  const getSeverityLevel = (score: number, type: 'depression' | 'anxiety' | 'stress') => {
    const ranges = {
      depression: {
        normal: [0, 6],
        mild: [7, 8],
        moderate: [9, 13],
        severe: [14, 16],
        extremelySevere: [17, Infinity]
      },
      anxiety: {
        normal: [0, 5],
        mild: [6, 7],
        moderate: [8, 12],
        severe: [13, 15],
        extremelySevere: [16, Infinity]
      },
      stress: {
        normal: [0, 11],
        mild: [12, 13],
        moderate: [14, 16],
        severe: [17, 18],
        extremelySevere: [19, Infinity]
      }
    };

    const range = ranges[type];
    if (score <= range.normal[1]) return 'Normal';
    if (score <= range.mild[1]) return 'Mild';
    if (score <= range.moderate[1]) return 'Moderate';
    if (score <= range.severe[1]) return 'Severe';
    return 'Extremely Severe';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Normal':
        return 'text-green-600 bg-green-50';
      case 'Mild':
        return 'text-yellow-600 bg-yellow-50';
      case 'Moderate':
        return 'text-orange-600 bg-orange-50';
      case 'Severe':
        return 'text-red-600 bg-red-50';
      case 'Extremely Severe':
        return 'text-red-800 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  // Mock student data - in a real app, this would come from your database
  const mockStudents = [
    {
      id: '1',
      name: 'Alice Smith',
      class: '5A',
      topicsCompleted: ['emotions', 'stress'],
      quizResults: {
        emotions: 90,
        stress: 85
      },
      assessmentScore: {
        depression: 5,
        anxiety: 4,
        stress: 6
      }
    },
    {
      id: '2',
      name: 'Bob Johnson',
      class: '5B',
      topicsCompleted: ['emotions'],
      quizResults: {
        emotions: 75
      },
      assessmentScore: {
        depression: 12,
        anxiety: 14,
        stress: 16
      }
    },
    {
      id: '3',
      name: 'Carol Williams',
      class: '5A',
      topicsCompleted: ['emotions', 'stress', 'bullying'],
      quizResults: {
        emotions: 95,
        stress: 88,
        bullying: 92
      },
      assessmentScore: {
        depression: 8,
        anxiety: 7,
        stress: 9
      }
    }
  ];

  const calculateStatistics = () => {
    const totalStudents = mockStudents.length;
    const safeStudents = mockStudents.filter(student => 
      ['Normal', 'Mild'].includes(getSeverityLevel(student.assessmentScore.depression, 'depression')) &&
      ['Normal', 'Mild'].includes(getSeverityLevel(student.assessmentScore.anxiety, 'anxiety')) &&
      ['Normal', 'Mild'].includes(getSeverityLevel(student.assessmentScore.stress, 'stress'))
    ).length;

    const topicsStats = {
      emotions: 0,
      stress: 0,
      bullying: 0
    };

    let totalQuizScore = 0;
    let totalQuizzes = 0;

    mockStudents.forEach(student => {
      student.topicsCompleted.forEach(topic => {
        topicsStats[topic as keyof typeof topicsStats]++;
        if (student.quizResults[topic]) {
          totalQuizScore += student.quizResults[topic];
          totalQuizzes++;
        }
      });
    });

    return {
      safeStudents,
      normalStudents: safeStudents,
      topicsStats,
      averageQuizScore: totalQuizzes > 0 ? Math.round(totalQuizScore / totalQuizzes) : 0
    };
  };

  const stats = calculateStatistics();

  const filteredStudents = mockStudents
    .filter(student => 
      (selectedClass === 'all' || student.class === selectedClass) &&
      (searchTerm === '' || student.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card bg-blue-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 font-semibold">Total Students</p>
              <h3 className="text-2xl font-bold">{mockStudents.length}</h3>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="card bg-green-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 font-semibold">Safe Students</p>
              <h3 className="text-2xl font-bold">{stats.safeStudents}</h3>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="card bg-red-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 font-semibold">At-Risk Students</p>
              <h3 className="text-2xl font-bold">{mockStudents.length - stats.safeStudents}</h3>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <div className="card bg-purple-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 font-semibold">Avg Quiz Score</p>
              <h3 className="text-2xl font-bold">{stats.averageQuizScore}%</h3>
            </div>
            <Award className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <BookOpen className="h-6 w-6 text-purple-600 mr-2" />
          Topics Completion Statistics
        </h2>
        <div className="space-y-4">
          {Object.entries(stats.topicsStats).map(([topic, count]) => (
            <div key={topic} className="flex items-center justify-between">
              <span className="capitalize">{topic}</span>
              <div className="flex items-center">
                <div className="w-48 h-2 bg-gray-200 rounded-full mr-3">
                  <div 
                    className="h-2 bg-purple-600 rounded-full"
                    style={{ width: `${(count / mockStudents.length) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600">{count} students</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Classes</option>
            <option value="5A">Class 5A</option>
            <option value="5B">Class 5B</option>
            <option value="5C">Class 5C</option>
          </select>
        </div>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-3 px-4">Student Name</th>
                <th className="text-left py-3 px-4">Class</th>
                <th className="text-left py-3 px-4">Topics & Quiz Results</th>
                <th className="text-left py-3 px-4">Assessment Levels</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{student.name}</td>
                  <td className="py-3 px-4">{student.class}</td>
                  <td className="py-3 px-4">
                    <div className="space-y-2">
                      {student.topicsCompleted.map((topic) => (
                        <div key={topic} className="flex items-center space-x-2">
                          <span className="inline-block px-2 py-1 text-sm bg-purple-100 text-purple-700 rounded-full">
                            {topic}
                          </span>
                          <span className="text-sm font-medium">
                            {student.quizResults[topic]}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="space-y-2">
                      {(['depression', 'anxiety', 'stress'] as const).map((type) => {
                        const score = student.assessmentScore[type];
                        const severity = getSeverityLevel(score, type);
                        const colorClass = getSeverityColor(severity);
                        return (
                          <div key={type} className="flex items-center justify-between">
                            <span className="text-sm capitalize">{type}:</span>
                            <span className={`text-sm px-2 py-1 rounded-full ${colorClass}`}>
                              {severity} ({score})
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="bg-purple-100 p-3 rounded-full">
            <User className="h-8 w-8 text-purple-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Profile Information</h3>
            <p className="text-gray-600">Manage your account details</p>
          </div>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="btn-primary"
          >
            Edit Profile
          </button>
        )}
      </div>
      
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={userInfo.name}
              onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={userInfo.email}
              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <input
              type="text"
              value={userInfo.department}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleSaveProfile}
              className="btn-primary"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">Name</p>
            <p className="font-medium">{currentUser.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium">{currentUser.email || 'Not set'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Department</p>
            <p className="font-medium">{userInfo.department}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-red-600 hover:text-red-700"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="md:w-64 space-y-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
              ${activeTab === 'overview' 
                ? 'bg-purple-100 text-purple-700' 
                : 'hover:bg-gray-100'
              }`}
          >
            <BarChart3 className="h-5 w-5" />
            <span>Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
              ${activeTab === 'students' 
                ? 'bg-purple-100 text-purple-700' 
                : 'hover:bg-gray-100'
              }`}
          >
            <Users className="h-5 w-5" />
            <span>Students</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
              ${activeTab === 'profile' 
                ? 'bg-purple-100 text-purple-700' 
                : 'hover:bg-gray-100'
              }`}
          >
            <User className="h-5 w-5" />
            <span>Profile</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6">Counselor Dashboard</h1>
          
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'students' && renderStudents()}
          {activeTab === 'profile' && renderProfile()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;