import * as React from 'react';
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
import { supabase } from '../lib/supabaseClient';

type Student = {
  id: number;
  full_name: string;
  class: string;
};

type QuizResult = {
  id: number;
  student_id: number;
  topic_id: string;
  score_percentage: number;
};

type AssessmentResult = {
  id: number;
  student_id: number;
  depression_score: number;
  depression_level: string;
  anxiety_score: number;
  anxiety_level: string;
  stress_score: number;
  stress_level: string;
};

type Tab = 'overview' | 'students' | 'profile';

// Define a type for the user object in your store
type CounselorUser = {
  name: string;
  email: string;
  role: string;
  // add other properties as needed
};

type StoreType = {
  currentUser: CounselorUser | null;
  setCurrentUser: (user: CounselorUser | null) => void;
};

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<Tab>('overview');
  const [selectedClass, setSelectedClass] = React.useState<string>('all');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isEditing, setIsEditing] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({
    name: '',
    email: '',
    department: 'Counseling',
  });

  // Use the StoreType instead of any
  const { currentUser, setCurrentUser } = useStore() as StoreType;
  const navigate = useNavigate();

  const [students, setStudents] = React.useState<Student[]>([]);
  const [quizResults, setQuizResults] = React.useState<QuizResult[]>([]);
  const [assessmentResults, setAssessmentResults] = React.useState<AssessmentResult[]>([]);
  // Remove unused loading variable

  React.useEffect(() => {
    if (!currentUser || currentUser.role !== 'counselor') {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/login');
  };

  const handleSaveProfile = () => {
    setCurrentUser({
      ...currentUser!,
      name: userInfo.name,
      email: userInfo.email
    });
    setIsEditing(false);
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

  React.useEffect(() => {
    const fetchData = async () => {
      // Fetch students
      const { data: studentsData } = await supabase
        .from('student')
        .select('id, full_name, class');
      // Fetch quiz results
      const { data: quizData } = await supabase
        .from('quiz_results')
        .select('id, student_id, topic_id, score_percentage');
      // Fetch assessment results (latest per student)
      const { data: assessmentData } = await supabase
        .from('assessment_result')
        .select('id, student_id, depression_score, depression_level, anxiety_score, anxiety_level, stress_score, stress_level, created_at')
        .order('created_at', { ascending: false });

      // Only keep latest assessment per student
      const latestAssessmentMap: { [student_id: number]: AssessmentResult } = {};
      (assessmentData || []).forEach((a: AssessmentResult & { created_at: string }) => {
        if (!latestAssessmentMap[a.student_id]) {
          latestAssessmentMap[a.student_id] = a;
        }
      });

      setStudents(studentsData || []);
      setQuizResults(quizData || []);
      setAssessmentResults(Object.values(latestAssessmentMap));
    };

    fetchData();
  }, []);

  // Helper: Get quiz results for a student
  const getStudentQuizResults = (studentId: number) =>
    quizResults.filter(q => q.student_id === studentId);

  // Helper: Get assessment result for a student
  const getStudentAssessment = (studentId: number) =>
    assessmentResults.find(a => a.student_id === studentId);

  // Calculate statistics for Overview
  const calculateStatistics = () => {
    const totalStudents = students.length;
    let safeStudents = 0;
    let atRiskStudents = 0;
    let totalQuizScore = 0;
    let totalQuizzes = 0;
    const topicsStats: Record<string, number> = {};

    students.forEach(student => {
      const assessment = getStudentAssessment(student.id);
      if (assessment) {
        const isSafe =
          ['normal', 'mild'].includes(assessment.depression_level) &&
          ['normal', 'mild'].includes(assessment.anxiety_level) &&
          ['normal', 'mild'].includes(assessment.stress_level);
        if (isSafe) safeStudents++;
        else atRiskStudents++;
      }
      const quizzes = getStudentQuizResults(student.id);
      quizzes.forEach(q => {
        totalQuizScore += Number(q.score_percentage);
        totalQuizzes++;
        topicsStats[q.topic_id] = (topicsStats[q.topic_id] || 0) + 1;
      });
    });

    return {
      totalStudents,
      safeStudents,
      atRiskStudents,
      averageQuizScore: totalQuizzes > 0 ? Math.round(totalQuizScore / totalQuizzes) : 0,
      topicsStats,
    };
  };

  const stats = calculateStatistics();

  // Filtered students for Students tab
  const filteredStudents = students
    .filter(student =>
      (selectedClass === 'all' || student.class === selectedClass) &&
      (searchTerm === '' || student.full_name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card bg-blue-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 font-semibold">Total Students</p>
              <h3 className="text-2xl font-bold">{stats.totalStudents}</h3>
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
              <h3 className="text-2xl font-bold">{stats.atRiskStudents}</h3>
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
          {[
            { key: 'emotions', label: 'Understanding Emotions' },
            { key: 'stress', label: 'Stress Management' },
            { key: 'bullying', label: 'Bullying Prevention' }
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between">
              <span className="capitalize">{label}</span>
              <div className="flex items-center">
                <div className="w-48 h-2 bg-gray-200 rounded-full mr-3">
                  <div
                    className="h-2 bg-purple-600 rounded-full"
                    style={{ width: `${((stats.topicsStats[key] || 0) / (stats.totalStudents || 1)) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600">{stats.topicsStats[key] || 0} students</span>
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
              {filteredStudents.map((student) => {
                const quizzes = getStudentQuizResults(student.id);
                const assessment = getStudentAssessment(student.id);

                // Order topics: emotions, stress, bullying, then others
                const topicOrder = ['emotions', 'stress', 'bullying'];
                const sortedQuizzes = [
                  ...topicOrder
                    .map(topic => quizzes.find(q => q.topic_id === topic))
                    .filter((q): q is QuizResult => q !== undefined),
                  ...quizzes.filter(
                    q => !topicOrder.includes(q.topic_id)
                  ),
                ];

                return (
                  <tr key={student.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{student.full_name}</td>
                    <td className="py-3 px-4">{student.class}</td>
                    <td className="py-3 px-4">
                      <div className="space-y-2">
                        {sortedQuizzes.length > 0 ? sortedQuizzes.map((quiz) => (
                          <div key={quiz.topic_id} className="flex items-center space-x-2">
                            <span className="inline-block px-2 py-1 text-sm bg-purple-100 text-purple-700 rounded-full">
                              {quiz.topic_id}
                            </span>
                            <span className="text-sm font-medium">
                              {quiz.score_percentage}%
                            </span>
                          </div>
                        )) : <span className="text-gray-400 text-sm">No quizzes</span>}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {assessment ? (
                        <div className="space-y-2">
                          {(['depression', 'anxiety', 'stress'] as const).map((type) => {
                            const level = assessment[`${type}_level`] as string;
                            const score = assessment[`${type}_score`] as number;
                            const colorClass = getSeverityColor(
                              level.charAt(0).toUpperCase() + level.slice(1)
                            );
                            return (
                              <div key={type} className="flex items-center justify-between">
                                <span className="text-sm capitalize">{type}:</span>
                                <span className={`text-sm px-2 py-1 rounded-full ${colorClass}`}>
                                  {level.charAt(0).toUpperCase() + level.slice(1)} ({score})
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">No assessment</span>
                      )}
                    </td>
                  </tr>
                );
              })}
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