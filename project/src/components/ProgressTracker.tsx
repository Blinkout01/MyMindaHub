import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Heart, Shield, CheckCircle, Clock, Trophy, Star, Target } from 'lucide-react';
import { useStore } from '../store';

interface TopicProgress {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  color: string;
  bgGradient: string;
  borderColor: string;
  emoji: string;
  completed: boolean;
  quizCompleted: boolean;
  quizScore?: number;
}

const ProgressTracker = () => {
  const { currentUser, studentProgress } = useStore();
  
  // Get current user's progress
  const userProgress = studentProgress.find(p => p.userId === currentUser?.id);
  
  // Define topics with their progress status
  const topics: TopicProgress[] = [
    {
      id: 'emotions',
      title: 'Understanding Emotions',
      icon: Brain,
      color: 'text-blue-600',
      bgGradient: 'from-blue-100 to-blue-200',
      borderColor: 'border-blue-300',
      emoji: '😊',
      completed: userProgress?.topicProgress?.emotions?.completed || false,
      quizCompleted: (userProgress?.topicProgress?.emotions?.quizScore || 0) > 0,
      quizScore: userProgress?.topicProgress?.emotions?.quizScore
    },
    {
      id: 'stress',
      title: 'Stress Management',
      icon: Heart,
      color: 'text-pink-600',
      bgGradient: 'from-pink-100 to-pink-200',
      borderColor: 'border-pink-300',
      emoji: '🧘‍♀️',
      completed: userProgress?.topicProgress?.stress?.completed || false,
      quizCompleted: (userProgress?.topicProgress?.stress?.quizScore || 0) > 0,
      quizScore: userProgress?.topicProgress?.stress?.quizScore
    },
    {
      id: 'bullying',
      title: 'Bullying Prevention',
      icon: Shield,
      color: 'text-purple-600',
      bgGradient: 'from-purple-100 to-purple-200',
      borderColor: 'border-purple-300',
      emoji: '🛡️',
      completed: userProgress?.topicProgress?.bullying?.completed || false,
      quizCompleted: (userProgress?.topicProgress?.bullying?.quizScore || 0) > 0,
      quizScore: userProgress?.topicProgress?.bullying?.quizScore
    }
  ];

  // Calculate overall progress
  const totalTopics = topics.length;
  const completedTopics = topics.filter(t => t.completed).length;
  const completedQuizzes = topics.filter(t => t.quizCompleted).length;
  const overallProgress = Math.round(((completedTopics + completedQuizzes) / (totalTopics * 2)) * 100);
  
  // Check if assessment is completed
  const assessmentCompleted = userProgress?.assessmentResults?.['dass-y']?.completed || false;

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100 border-green-300';
    if (score >= 80) return 'text-blue-600 bg-blue-100 border-blue-300';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100 border-yellow-300';
    return 'text-orange-600 bg-orange-100 border-orange-300';
  };

  const getScoreEmoji = (score: number) => {
    if (score >= 90) return '🏆';
    if (score >= 80) return '⭐';
    if (score >= 70) return '👍';
    return '💪';
  };

  return (
    <div className="space-y-8">
      {/* Overall Progress Header */}
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-3xl blur opacity-75"></div>
        <div className="relative bg-gradient-to-br from-white to-purple-50 rounded-3xl border-4 border-purple-200 p-6 shadow-xl text-center">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="h-8 w-8 text-yellow-500 mr-3 animate-bounce" />
            <h2 className="text-3xl font-bold text-purple-800">My Learning Progress</h2>
            <Trophy className="h-8 w-8 text-yellow-500 ml-3 animate-bounce delay-200" />
          </div>
          
          <div className="mb-6">
            <div className="text-5xl mb-2">{overallProgress}%</div>
            <p className="text-lg text-gray-600">Overall Completion</p>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-6 border-2 border-gray-300 mb-4">
            <div
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 h-full rounded-full transition-all duration-1000 relative overflow-hidden"
              style={{ width: `${overallProgress}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl p-4 border-2 border-blue-300">
              <div className="text-2xl font-bold text-blue-600">{completedTopics}/{totalTopics}</div>
              <div className="text-sm text-gray-600">Topics Learned</div>
            </div>
            <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-2xl p-4 border-2 border-green-300">
              <div className="text-2xl font-bold text-green-600">{completedQuizzes}/{totalTopics}</div>
              <div className="text-sm text-gray-600">Quizzes Completed</div>
            </div>
            <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-2xl p-4 border-2 border-yellow-300">
              <div className="text-2xl font-bold text-yellow-600">{assessmentCompleted ? '1' : '0'}/1</div>
              <div className="text-sm text-gray-600">Assessment Done</div>
            </div>
          </div>
        </div>
      </div>

      {/* Topics Progress */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-center text-purple-800 flex items-center justify-center space-x-2">
          <Target className="h-6 w-6" />
          <span>Learning Topics Progress</span>
          <Target className="h-6 w-6" />
        </h3>
        
        <div className="grid gap-6">
          {topics.map((topic) => {
            const Icon = topic.icon;
            return (
              <div key={topic.id} className="relative group">
                <div className={`absolute -inset-1 bg-gradient-to-r ${topic.bgGradient} rounded-3xl blur opacity-75`}></div>
                
                <div className={`relative bg-gradient-to-br ${topic.bgGradient} rounded-3xl border-4 ${topic.borderColor} p-6 shadow-xl`}>
                  <div className="flex items-center justify-between">
                    {/* Topic Info */}
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-white rounded-full shadow-lg">
                          <Icon className={`h-8 w-8 ${topic.color}`} />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-800">{topic.title}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-3xl">{topic.emoji}</span>
                            <span className="text-sm text-gray-600">
                              {topic.completed && topic.quizCompleted 
                                ? 'Fully Complete!' 
                                : topic.completed 
                                ? 'Topic learned, quiz pending' 
                                : 'Not started yet'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Progress Status */}
                    <div className="flex items-center space-x-4">
                      {/* Topic Status */}
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-600 mb-1">Topic</div>
                        <div className="flex items-center space-x-2">
                          {topic.completed ? (
                            <div className="flex items-center space-x-1 bg-green-100 text-green-700 px-3 py-1 rounded-full border-2 border-green-300">
                              <CheckCircle className="h-4 w-4" />
                              <span className="text-sm font-bold">Done</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-1 bg-gray-100 text-gray-600 px-3 py-1 rounded-full border-2 border-gray-300">
                              <Clock className="h-4 w-4" />
                              <span className="text-sm font-bold">Pending</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Quiz Status */}
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-600 mb-1">Quiz</div>
                        <div className="flex items-center space-x-2">
                          {topic.quizCompleted ? (
                            <div className={`flex items-center space-x-1 px-3 py-1 rounded-full border-2 ${getScoreColor(topic.quizScore!)}`}>
                              <span className="text-lg">{getScoreEmoji(topic.quizScore!)}</span>
                              <span className="text-sm font-bold">{topic.quizScore}%</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-1 bg-gray-100 text-gray-600 px-3 py-1 rounded-full border-2 border-gray-300">
                              <Clock className="h-4 w-4" />
                              <span className="text-sm font-bold">Pending</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col space-y-2">
                        {!topic.completed ? (
                          <Link
                            to={`/topics/${topic.id}`}
                            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full font-bold text-sm hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                          >
                            Start Learning 📚
                          </Link>
                        ) : !topic.quizCompleted ? (
                          <Link
                            to={`/quiz/${topic.id}`}
                            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-full font-bold text-sm hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                          >
                            Take Quiz 🧩
                          </Link>
                        ) : (
                          <div className="flex flex-col space-y-1">
                            <Link
                              to={`/topics/${topic.id}`}
                              className="bg-gradient-to-r from-gray-400 to-gray-500 text-white px-4 py-1 rounded-full font-bold text-xs hover:from-gray-500 hover:to-gray-600 transition-all duration-300"
                            >
                              Review 👀
                            </Link>
                            <Link
                              to={`/quiz/${topic.id}`}
                              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full font-bold text-xs hover:from-yellow-500 hover:to-orange-600 transition-all duration-300"
                            >
                              Retake Quiz 🔄
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar for this topic */}
                  <div className="mt-4">
                    <div className="w-full bg-white/50 rounded-full h-3 border-2 border-white">
                      <div
                        className={`bg-gradient-to-r from-green-400 to-blue-500 h-full rounded-full transition-all duration-500`}
                        style={{ 
                          width: `${topic.completed && topic.quizCompleted ? 100 : topic.completed ? 50 : 0}%` 
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>Not Started</span>
                      <span>Topic Done</span>
                      <span>Fully Complete</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Assessment Progress */}
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-3xl blur opacity-75"></div>
        <div className="relative bg-gradient-to-br from-white to-green-50 rounded-3xl border-4 border-green-200 p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white rounded-full shadow-lg">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-800">Mind Check-Up Assessment</h4>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-3xl">🧠</span>
                  <span className="text-sm text-gray-600">
                    {assessmentCompleted ? 'Assessment completed!' : 'Take your mind check-up'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-sm font-medium text-gray-600 mb-1">Status</div>
                {assessmentCompleted ? (
                  <div className="flex items-center space-x-1 bg-green-100 text-green-700 px-4 py-2 rounded-full border-2 border-green-300">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-bold">Completed</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full border-2 border-yellow-300">
                    <Clock className="h-5 w-5" />
                    <span className="font-bold">Pending</span>
                  </div>
                )}
              </div>

              <Link
                to="/assessment"
                className={`px-6 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-lg ${
                  assessmentCompleted
                    ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-white hover:from-gray-500 hover:to-gray-600'
                    : 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600'
                }`}
              >
                {assessmentCompleted ? 'Retake Assessment 🔄' : 'Start Assessment 🎯'}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      {(completedTopics > 0 || completedQuizzes > 0 || assessmentCompleted) && (
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 rounded-3xl blur opacity-75"></div>
          <div className="relative bg-gradient-to-br from-white to-yellow-50 rounded-3xl border-4 border-yellow-200 p-6 shadow-xl text-center">
            <div className="flex items-center justify-center mb-4">
              <Star className="h-8 w-8 text-yellow-500 mr-3 animate-spin" />
              <h3 className="text-2xl font-bold text-yellow-800">Your Achievements!</h3>
              <Star className="h-8 w-8 text-yellow-500 ml-3 animate-spin" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {completedTopics >= 1 && (
                <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl p-4 border-2 border-blue-300">
                  <div className="text-3xl mb-2">🎓</div>
                  <div className="text-sm font-bold text-blue-800">First Topic Learned!</div>
                </div>
              )}
              {completedQuizzes >= 1 && (
                <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-2xl p-4 border-2 border-green-300">
                  <div className="text-3xl mb-2">🧩</div>
                  <div className="text-sm font-bold text-green-800">Quiz Master!</div>
                </div>
              )}
              {assessmentCompleted && (
                <div className="bg-gradient-to-r from-purple-100 to-purple-200 rounded-2xl p-4 border-2 border-purple-300">
                  <div className="text-3xl mb-2">🏆</div>
                  <div className="text-sm font-bold text-purple-800">Assessment Complete!</div>
                </div>
              )}
              {completedTopics === totalTopics && completedQuizzes === totalTopics && (
                <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-2xl p-4 border-2 border-yellow-300">
                  <div className="text-3xl mb-2">🌟</div>
                  <div className="text-sm font-bold text-yellow-800">Learning Champion!</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;