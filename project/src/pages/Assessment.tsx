import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardCheck, ArrowRight, PlayCircle, Star, Heart, Brain } from 'lucide-react';
import { useStore } from '../store';
import { supabase } from '../lib/supabaseClient';

const TOTAL_QUESTIONS = 21;

const questions = [
  { id: 1, text: 'I got upset about little things' },
  { id: 2, text: 'I felt dizzy, like I was about to faint' },
  { id: 3, text: 'I did not enjoy anything' },
  { id: 4, text: 'I had trouble breathing (e.g. fast breathing), even though I wasn\'t exercising and I was not sick.' },
  { id: 5, text: 'I hated my life' },
  { id: 6, text: 'I found myself over-reacting to situations' },
  { id: 7, text: 'My hands felt shaky' },
  { id: 8, text: 'I was stressing about lots of things' },
  { id: 9, text: 'I felt terrified' },
  { id: 10, text: 'There was nothing nice I could look forward to' },
  { id: 11, text: 'I was easily irritated' },
  { id: 12, text: 'I found it difficult to relax' },
  { id: 13, text: 'I could not stop feeling sad' },
  { id: 14, text: 'I got annoyed when people interrupted me' },
  { id: 15, text: 'I felt like I was about to panic' },
  { id: 16, text: 'I hated myself' },
  { id: 17, text: 'I felt like I was no good' },
  { id: 18, text: 'I was easily annoyed' },
  { id: 19, text: 'I could feel my heart beating really fast, even though I hadn\'t done any hard exercise' },
  { id: 20, text: 'I felt scared for no good reason' },
  { id: 21, text: 'I felt that life was terrible' }
];

const scaleOptions = [
  { value: 0, label: 'Not True', emoji: '❌', color: 'from-green-100 to-green-200 border-green-300' },
  { value: 1, label: 'A Little True', emoji: '🤏', color: 'from-yellow-100 to-yellow-200 border-yellow-300' },
  { value: 2, label: 'Fairly True', emoji: '😐', color: 'from-orange-100 to-orange-200 border-orange-300' },
  { value: 3, label: 'Very True', emoji: '✅', color: 'from-red-100 to-red-200 border-red-300' },
];

const scaleMapping = {
  depression: [3, 5, 10, 13, 16, 17, 21],
  anxiety: [2, 4, 7, 9, 15, 19, 20],
  stress: [1, 6, 8, 11, 12, 14, 18],
};

const severityRanges = {
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
  },
  total: {
    normal: [0, 23],
    mild: [24, 29],
    moderate: [30, 39],
    severe: [40, 46],
    extremelySevere: [47, Infinity]
  }
};

const Assessment = () => {
  const navigate = useNavigate();
  const { currentUser, studentProgress, updateStudentProgress, fetchStudentProgress } = useStore();
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(TOTAL_QUESTIONS).fill(-1));
  const [showResults, setShowResults] = useState(false);

  const calculateScores = () => {
    const scores = {
      depression: 0,
      anxiety: 0,
      stress: 0,
    };

    Object.entries(scaleMapping).forEach(([scale, items]) => {
      scores[scale as keyof typeof scores] = items.reduce((sum, questionNum) => {
        return sum + (answers[questionNum - 1] || 0);
      }, 0);
    });

    return scores;
  };

  const handleStartAssessment = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setStarted(true);
  };

  const handleAnswer = async (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);

    if (currentQuestion < TOTAL_QUESTIONS - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate scores
      const scores = calculateScores();

      // --- Update student_progress in Supabase ---
      const prevProgress = studentProgress[0] || {};
      const prevTopicProgress = prevProgress.topic_progress || {};
      const prevAssessmentResults = prevProgress.assessment_results || {};

      // Store full assessment result (completed, responses, date, scores)
      const updatedAssessmentResults = {
        ...prevAssessmentResults,
        'dass-y': {
          completed: true,
          responses: newAnswers,
          date: new Date().toISOString(),
          scores
        }
      };

      if (currentUser?.id) {
        await updateStudentProgress(currentUser.id, prevTopicProgress, updatedAssessmentResults);
        await fetchStudentProgress(currentUser.id);

        // --- Insert into assessment_result table ---
        const depression_level = getScoreInterpretation(scores.depression, 'depression').toLowerCase();
        const anxiety_level = getScoreInterpretation(scores.anxiety, 'anxiety').toLowerCase();
        const stress_level = getScoreInterpretation(scores.stress, 'stress').toLowerCase();
        const total_score = scores.depression + scores.anxiety + scores.stress;
        const total_level = getScoreInterpretation(total_score, 'total').toLowerCase();

        await supabase.from('assessment_result').insert([{
          student_id: currentUser.id,
          depression_score: scores.depression,
          depression_level,
          anxiety_score: scores.anxiety,
          anxiety_level,
          stress_score: scores.stress,
          stress_level,
          total_score,
          total_level
        }]);
      }

      setShowResults(true);
    }
  };

  const getScoreInterpretation = (score: number, scale: keyof typeof severityRanges) => {
    const ranges = severityRanges[scale];
    if (score <= ranges.normal[1]) return 'Normal';
    if (score <= ranges.mild[1]) return 'Mild';
    if (score <= ranges.moderate[1]) return 'Moderate';
    if (score <= ranges.severe[1]) return 'Severe';
    return 'Extremely Severe';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Normal':
        return 'text-green-600 bg-green-100 border-green-300';
      case 'Mild':
        return 'text-yellow-600 bg-yellow-100 border-yellow-300';
      case 'Moderate':
        return 'text-orange-600 bg-orange-100 border-orange-300';
      case 'Severe':
        return 'text-red-600 bg-red-100 border-red-300';
      case 'Extremely Severe':
        return 'text-red-800 bg-red-200 border-red-400';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-300';
    }
  };

  if (!started) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8">
        {/* Floating Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-16 left-10 animate-bounce delay-500">
            <Heart className="h-6 w-6 text-pink-400 animate-pulse" />
          </div>
          <div className="absolute bottom-20 right-16 animate-bounce delay-1000">
            <Brain className="h-5 w-5 text-purple-400 animate-pulse" />
          </div>
          <div className="absolute top-1/3 right-10 animate-bounce delay-700">
            <Star className="h-4 w-4 text-yellow-400 animate-pulse" />
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <div className="relative">
            {/* Glowing border effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-3xl blur opacity-75"></div>
            
            <div className="relative bg-gradient-to-br from-white to-purple-50 rounded-3xl border-4 border-purple-200 p-8 shadow-2xl">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <ClipboardCheck className="h-20 w-20 text-purple-600 animate-pulse" />
                    <div className="absolute -top-2 -right-2 text-3xl animate-bounce">📋</div>
                  </div>
                </div>
                
                <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                  DASS-Y Assessment 🧠💖
                </h1>
                
                <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-2xl p-6 mb-8 border-3 border-purple-200">
                  <div className="text-4xl mb-4">🌟</div>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    We would like to find out how you have been feeling in THE PAST WEEK. There are                       some sentences below. Please select the option which best shows how TRUE each                         sentence was of you during the past week. There are no right or wrong answers. 😊
                  </p>
                  
                  <div className="bg-white rounded-xl p-6 border-2 border-purple-200">
                    <div className="text-3xl mb-4">💡</div>
                    <h2 className="text-xl font-bold text-purple-800 mb-4">How to Complete Your Check-Up:</h2>
                    <div className="grid md:grid-cols-2 gap-4 text-left">
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">📖</div>
                        <p className="text-gray-700">Read each statement carefully</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">🎯</div>
                        <p className="text-gray-700">Choose the answer that best describes your feelings in the past week</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">⏰</div>
                        <p className="text-gray-700">Don't spend too much time on any statement</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">💭</div>
                        <p className="text-gray-700">Your first feeling is usually the most accurate</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleStartAssessment}
                  className="group inline-flex items-center space-x-3 px-10 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white text-xl font-bold rounded-full hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-3xl"
                >
                  <PlayCircle className="h-8 w-8 group-hover:animate-spin" />
                  <span>Start My Check-Up!</span>
                  <div className="text-3xl group-hover:animate-bounce">🚀</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const scores = calculateScores();
    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
    const totalSeverity = getScoreInterpretation(totalScore, 'total');

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="relative">
            {/* Glowing border effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-3xl blur opacity-75"></div>
            
            <div className="relative bg-gradient-to-br from-white to-green-50 rounded-3xl border-4 border-green-200 p-8 shadow-2xl text-center">
              <div className="text-6xl mb-6 animate-bounce">🏆</div>
              <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-green-600 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Check-Up Complete! 🎉
              </h1>

              <div className="space-y-6 mb-8">
                {Object.entries(scores).map(([scale, score]) => {
                  const severity = getScoreInterpretation(score, scale as keyof typeof severityRanges);
                  const colorClass = getSeverityColor(severity);
                  return (
                    <div key={scale} className={`p-6 rounded-2xl border-2 ${colorClass}`}>
                      <h2 className="text-2xl font-bold capitalize mb-3">{scale} 📊</h2>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-medium">Your Score: {score}</span>
                        <span className="px-4 py-2 rounded-full font-bold text-lg bg-white bg-opacity-50">
                          {severity}
                        </span>
                      </div>
                    </div>
                  );
                })}

                <div className="p-6 rounded-2xl border-4 bg-gradient-to-r from-purple-100 to-blue-100 border-purple-300">
                  <div className="text-4xl mb-3">🌟</div>
                  <h2 className="text-2xl font-bold mb-3">Overall Result</h2>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Total Score: {totalScore}</span>
                    <span className={`px-4 py-2 rounded-full font-bold text-lg ${getSeverityColor(totalSeverity)}`}>
                      {totalSeverity}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 rounded-2xl p-6 mb-8 border-3 border-purple-200">
                <div className="text-4xl mb-4">💝</div>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Great job completing your mind check-up! Your results show that your overall feeling level is{' '}
                  <span className="font-bold text-purple-700">{totalSeverity.toLowerCase()}</span>. 
                  
                  <br /><br />
                  
                  Remember, this is just a helpful tool - like a thermometer for your feelings! 
                  If you're worried about anything or want to talk to someone, please reach out to a 
                  teacher, counselor, or trusted adult. You're never alone! 🤗💪
                </p>
              </div>

              <button
                onClick={() => navigate('/topics')}
                className="group inline-flex items-center space-x-3 px-10 py-4 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white text-xl font-bold rounded-full hover:from-green-600 hover:via-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-110 shadow-2xl"
              >
                <span>Continue Learning!</span>
                <ArrowRight className="h-6 w-6 group-hover:animate-bounce" />
                <div className="text-2xl">📚</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Mind Check-Up Questions 🧠💖
          </h1>
        </div>
        
        <div className="relative">
          {/* Glowing border effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-3xl blur opacity-75"></div>
          
          <div className="relative bg-gradient-to-br from-white to-blue-50 rounded-3xl border-4 border-blue-200 p-8 shadow-2xl">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium text-gray-700 flex items-center space-x-2">
                  <div className="text-2xl">📝</div>
                  <span>Question {currentQuestion + 1} of {TOTAL_QUESTIONS}</span>
                </span>
                <span className="text-lg font-medium text-gray-700 flex items-center space-x-2">
                  <div className="text-2xl">📊</div>
                  <span>Progress: {Math.round(((currentQuestion) / TOTAL_QUESTIONS) * 100)}%</span>
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-4 border-2 border-gray-300">
                <div
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-full rounded-full transition-all duration-500 relative overflow-hidden"
                  style={{ width: `${((currentQuestion) / TOTAL_QUESTIONS) * 100}%` }}
                >
                  <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="mb-8 text-center">
              <div className="text-4xl mb-4">🤔</div>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {questions[currentQuestion].text}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                How true was this for you in the past week?
              </p>
            </div>

            <div className="space-y-4">
              {scaleOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className={`w-full p-6 text-left rounded-2xl border-3 transition-all duration-300 transform hover:scale-105 hover:shadow-lg
                    ${answers[currentQuestion] === option.value
                      ? `bg-gradient-to-r ${option.color} shadow-xl scale-105`
                      : `bg-gradient-to-r ${option.color} hover:shadow-lg opacity-80 hover:opacity-100`
                    }
                  `}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{option.emoji}</div>
                    <div>
                      <div className="text-xl font-bold text-gray-800">{option.label}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Encouragement */}
            <div className="mt-8 text-center">
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-4 border-2 border-yellow-300">
                <div className="text-2xl mb-2">💪</div>
                <p className="text-gray-700 font-medium">
                  You're doing great! Keep going - you've got this! 🌟
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;