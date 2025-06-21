import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Heart, Shield, User, Calendar, BookOpen, ClipboardCheck, History, MessageCircle, Gamepad2, Star, Sparkles, BarChart3 } from 'lucide-react';
import { useStore } from '../store';
import ProgressTracker from '../components/ProgressTracker';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'checkin' | 'profile'>('overview');
  const { currentUser, setCurrentUser } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    class: currentUser?.class || '',
    gender: currentUser?.gender || ''
  });
  const [checkInStep, setCheckInStep] = useState(0);
  const [checkInAnswers, setCheckInAnswers] = useState({
    weekFeeling: '',
    mainEmotions: [],
    helpfulThings: [],
    hadIssues: false,
    issueDescription: '',
    needsHelp: ''
  });

  const [previousCheckIns] = useState([
    {
      date: '2024-03-20',
      weekFeeling: 'Good',
      mainEmotions: ['Happy', 'Tired'],
      helpfulThings: ['Playing or exercising', 'Rest or sleep'],
      hadIssues: true,
      issueDescription: 'I had trouble with my math homework and felt a bit overwhelmed.',
      needsHelp: 'No, I\'m okay'
    },
    {
      date: '2024-03-13',
      weekFeeling: 'Okay',
      mainEmotions: ['Stressed', 'Confused'],
      helpfulThings: ['Talking to friends', 'Games or hobbies'],
      hadIssues: true,
      issueDescription: 'I had a small argument with my friend, but we resolved it.',
      needsHelp: 'Maybe'
    }
  ]);

  const handleSaveInfo = () => {
    setCurrentUser({
      ...currentUser!,
      ...userInfo
    });
    setIsEditing(false);
  };

  const handleEmotionSelect = (emotion: string) => {
    setCheckInAnswers(prev => {
      const emotions = [...prev.mainEmotions];
      const index = emotions.indexOf(emotion);
      
      if (index === -1 && emotions.length < 2) {
        emotions.push(emotion);
      } else if (index !== -1) {
        emotions.splice(index, 1);
      }
      
      return { ...prev, mainEmotions: emotions };
    });
  };

  const handleHelpfulThingSelect = (thing: string) => {
    setCheckInAnswers(prev => {
      const things = [...prev.helpfulThings];
      const index = things.indexOf(thing);
      
      if (index === -1) {
        things.push(thing);
      } else {
        things.splice(index, 1);
      }
      
      return { ...prev, helpfulThings: things };
    });
  };

  const renderWeeklyCheckIn = () => {
    const steps = [
      // Step 1: How was your week?
      <div key="week-feeling" className="space-y-6">
        <div className="text-center">
          <div className="text-4xl mb-4">🤔</div>
          <h3 className="text-2xl font-bold mb-4 text-purple-800">How was your week?</h3>
          <p className="text-lg text-gray-600 mb-6">👦👧 Pick the face that shows how your week felt!</p>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {[
            { emoji: '😀', text: 'Great!', color: 'from-green-100 to-green-200 border-green-300' },
            { emoji: '🙂', text: 'Good', color: 'from-blue-100 to-blue-200 border-blue-300' },
            { emoji: '😐', text: 'Okay', color: 'from-yellow-100 to-yellow-200 border-yellow-300' },
            { emoji: '😔', text: 'Not so good', color: 'from-orange-100 to-orange-200 border-orange-300' },
            { emoji: '😢', text: 'Bad', color: 'from-red-100 to-red-200 border-red-300' }
          ].map(feeling => (
            <button
              key={feeling.text}
              onClick={() => {
                setCheckInAnswers(prev => ({ ...prev, weekFeeling: feeling.text }));
                setCheckInStep(1);
              }}
              className={`p-4 rounded-2xl border-3 transition-all duration-300 hover:scale-110 bg-gradient-to-br ${feeling.color}
                ${checkInAnswers.weekFeeling === feeling.text
                  ? 'scale-110 shadow-xl'
                  : 'hover:shadow-lg'
                }`}
            >
              <div className="text-4xl mb-2">{feeling.emoji}</div>
              <div className="text-sm font-medium">{feeling.text}</div>
            </button>
          ))}
        </div>
      </div>,

      // Step 2: What did you feel most?
      <div key="main-emotions" className="space-y-6">
        <div className="text-center">
          <div className="text-4xl mb-4">🎭</div>
          <h3 className="text-2xl font-bold mb-4 text-purple-800">What did you feel most this week?</h3>
          <p className="text-lg text-gray-600 mb-6">🎭 Choose up to 2 feelings you had the most.</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { emoji: '😃', text: 'Happy', color: 'from-yellow-100 to-yellow-200 border-yellow-300' },
            { emoji: '😠', text: 'Angry', color: 'from-red-100 to-red-200 border-red-300' },
            { emoji: '😞', text: 'Sad', color: 'from-blue-100 to-blue-200 border-blue-300' },
            { emoji: '😬', text: 'Stressed', color: 'from-orange-100 to-orange-200 border-orange-300' },
            { emoji: '🤗', text: 'Loved', color: 'from-pink-100 to-pink-200 border-pink-300' },
            { emoji: '😴', text: 'Tired', color: 'from-purple-100 to-purple-200 border-purple-300' },
            { emoji: '😕', text: 'Confused', color: 'from-gray-100 to-gray-200 border-gray-300' }
          ].map(emotion => (
            <button
              key={emotion.text}
              onClick={() => handleEmotionSelect(emotion.text)}
              className={`p-4 rounded-2xl border-3 transition-all duration-300 hover:scale-105 bg-gradient-to-br ${emotion.color}
                ${checkInAnswers.mainEmotions.includes(emotion.text)
                  ? 'scale-105 shadow-xl ring-4 ring-purple-300'
                  : 'hover:shadow-lg'
                }`}
              disabled={checkInAnswers.mainEmotions.length >= 2 && !checkInAnswers.mainEmotions.includes(emotion.text)}
            >
              <div className="text-4xl mb-2">{emotion.emoji}</div>
              <div className="text-sm font-medium">{emotion.text}</div>
            </button>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => setCheckInStep(2)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={checkInAnswers.mainEmotions.length === 0}
          >
            Next 🚀
          </button>
        </div>
      </div>,

      // Step 3: What helped you feel better?
      <div key="helpful-things" className="space-y-6">
        <div className="text-center">
          <div className="text-4xl mb-4">🌈</div>
          <h3 className="text-2xl font-bold mb-4 text-purple-800">What helped you feel better this week?</h3>
          <p className="text-lg text-gray-600 mb-6">🌈 What made your week nicer?</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { emoji: '🧑‍🤝‍🧑', text: 'Talking to friends', color: 'from-blue-100 to-blue-200 border-blue-300' },
            { emoji: '👨‍🏫', text: 'Talking to a teacher or adult', color: 'from-green-100 to-green-200 border-green-300' },
            { emoji: '🏃', text: 'Playing or exercising', color: 'from-orange-100 to-orange-200 border-orange-300' },
            { emoji: '🎮', text: 'Games or hobbies', color: 'from-purple-100 to-purple-200 border-purple-300' },
            { emoji: '📚', text: 'Learning something fun', color: 'from-pink-100 to-pink-200 border-pink-300' },
            { emoji: '💤', text: 'Rest or sleep', color: 'from-indigo-100 to-indigo-200 border-indigo-300' }
          ].map(thing => (
            <button
              key={thing.text}
              onClick={() => handleHelpfulThingSelect(thing.text)}
              className={`p-4 rounded-2xl border-3 transition-all duration-300 hover:scale-105 bg-gradient-to-br ${thing.color}
                ${checkInAnswers.helpfulThings.includes(thing.text)
                  ? 'scale-105 shadow-xl ring-4 ring-purple-300'
                  : 'hover:shadow-lg'
                }`}
            >
              <div className="text-3xl mb-2">{thing.emoji}</div>
              <div className="text-sm font-medium">{thing.text}</div>
            </button>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => setCheckInStep(3)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
          >
            Next 🚀
          </button>
        </div>
      </div>,

      // Step 4: Did anything bother you?
      <div key="issues" className="space-y-6">
        <div className="text-center">
          <div className="text-4xl mb-4">🚨</div>
          <h3 className="text-2xl font-bold mb-4 text-purple-800">Did anything bother or upset you this week?</h3>
          <p className="text-lg text-gray-600 mb-6">🚨 It's okay to share — even small things matter.</p>
        </div>
        <div className="space-y-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setCheckInAnswers(prev => ({ ...prev, hadIssues: true }))}
              className={`flex-1 p-6 rounded-2xl border-3 transition-all duration-300 hover:scale-105 bg-gradient-to-br from-red-100 to-red-200 border-red-300
                ${checkInAnswers.hadIssues
                  ? 'scale-105 shadow-xl ring-4 ring-red-300'
                  : 'hover:shadow-lg'
                }`}
            >
              <div className="text-4xl mb-2">✅</div>
              <div className="text-lg font-bold">Yes</div>
            </button>
            <button
              onClick={() => {
                setCheckInAnswers(prev => ({ ...prev, hadIssues: false, issueDescription: '' }));
                setCheckInStep(4);
              }}
              className={`flex-1 p-6 rounded-2xl border-3 transition-all duration-300 hover:scale-105 bg-gradient-to-br from-green-100 to-green-200 border-green-300
                ${checkInAnswers.hadIssues === false
                  ? 'scale-105 shadow-xl ring-4 ring-green-300'
                  : 'hover:shadow-lg'
                }`}
            >
              <div className="text-4xl mb-2">❌</div>
              <div className="text-lg font-bold">No</div>
            </button>
          </div>
          {checkInAnswers.hadIssues && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl mb-2">💬</div>
                <p className="text-lg text-gray-600">Do you want to tell us about it? (Optional)</p>
              </div>
              <textarea
                value={checkInAnswers.issueDescription}
                onChange={(e) => setCheckInAnswers(prev => ({ ...prev, issueDescription: e.target.value }))}
                className="w-full p-4 border-3 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-400 text-lg bg-gradient-to-r from-white to-purple-50"
                rows={4}
                placeholder="Share what's on your mind... 💭"
              />
              <div className="flex justify-end">
                <button
                  onClick={() => setCheckInStep(4)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
                >
                  Next 🚀
                </button>
              </div>
            </div>
          )}
        </div>
      </div>,

      // Step 5: Need help?
      <div key="need-help" className="space-y-6">
        <div className="text-center">
          <div className="text-4xl mb-4">🤝</div>
          <h3 className="text-2xl font-bold mb-4 text-purple-800">Would you like help or someone to talk to?</h3>
          <p className="text-lg text-gray-600 mb-6">🤝 We're here for you!</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { emoji: '🟢', text: 'Yes, please', color: 'from-green-100 to-green-200 border-green-300' },
            { emoji: '🟡', text: 'Maybe', color: 'from-yellow-100 to-yellow-200 border-yellow-300' },
            { emoji: '🔴', text: 'No, I\'m okay', color: 'from-red-100 to-red-200 border-red-300' }
          ].map(option => (
            <button
              key={option.text}
              onClick={() => {
                setCheckInAnswers(prev => ({ ...prev, needsHelp: option.text }));
                setCheckInStep(5);
              }}
              className={`p-6 rounded-2xl border-3 transition-all duration-300 hover:scale-105 bg-gradient-to-br ${option.color}
                ${checkInAnswers.needsHelp === option.text
                  ? 'scale-105 shadow-xl ring-4 ring-purple-300'
                  : 'hover:shadow-lg'
                }`}
            >
              <div className="text-4xl mb-2">{option.emoji}</div>
              <div className="text-sm font-medium">{option.text}</div>
            </button>
          ))}
        </div>
      </div>,

      // Final Step: Thank you
      <div key="thank-you" className="text-center space-y-6">
        <div className="text-6xl mb-4 animate-bounce">🎉</div>
        <h3 className="text-3xl font-bold text-purple-800">Thank you for checking in!</h3>
        <p className="text-xl text-gray-600">You're strong and amazing! See you next week! 💪✨</p>
        <button
          onClick={() => setCheckInStep(0)}
          className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white px-10 py-4 rounded-full font-bold text-xl hover:from-green-600 hover:via-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-110 shadow-xl"
        >
          <div className="flex items-center space-x-2">
            <span>Done</span>
            <div className="text-2xl">🌟</div>
          </div>
        </button>
      </div>
    ];

    return steps[checkInStep];
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur opacity-75"></div>
              <div className="relative bg-gradient-to-br from-white to-blue-50 rounded-3xl border-4 border-blue-200 p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-blue-800">My Info 👤</h2>
                  </div>
                  <button
                    onClick={() => setActiveTab('profile')}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full font-bold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
                  >
                    Edit ✏️
                  </button>
                </div>

                <div className="space-y-3">
                  <p className="flex items-center space-x-2"><span className="text-xl">👤</span><span className="font-bold">Name:</span> <span>{userInfo.name}</span></p>
                  <p className="flex items-center space-x-2"><span className="text-xl">📧</span><span className="font-bold">Email:</span> <span>{userInfo.email}</span></p>
                  <p className="flex items-center space-x-2"><span className="text-xl">🏫</span><span className="font-bold">Class:</span> <span>{userInfo.class}</span></p>
                  <p className="flex items-center space-x-2"><span className="text-xl">👫</span><span className="font-bold">Gender:</span> <span>{userInfo.gender || 'Not specified'}</span></p>
                </div>
              </div>
            </div>

            {/* Learning Topics */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-3xl blur opacity-75"></div>
              <div className="relative bg-gradient-to-br from-white to-green-50 rounded-3xl border-4 border-green-200 p-6 shadow-xl">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-green-100 rounded-full">
                    <BookOpen className="h-6 w-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-green-800">Quick Access 🎯</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Link to="/topics/emotions" className="group p-4 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 border-3 border-blue-300 hover:from-blue-200 hover:to-blue-300 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                    <Brain className="h-8 w-8 text-blue-600 mb-2 group-hover:animate-bounce" />
                    <h3 className="font-bold mb-1 text-blue-800 text-sm">Understanding Emotions</h3>
                    <p className="text-xs text-gray-700">Learn about feelings! 😊</p>
                  </Link>
                  <Link to="/topics/stress" className="group p-4 rounded-2xl bg-gradient-to-br from-pink-100 to-pink-200 border-3 border-pink-300 hover:from-pink-200 hover:to-pink-300 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                    <Heart className="h-8 w-8 text-pink-600 mb-2 group-hover:animate-bounce" />
                    <h3 className="font-bold mb-1 text-pink-800 text-sm">Stress Management</h3>
                    <p className="text-xs text-gray-700">Stay calm! 🧘‍♀️</p>
                  </Link>
                  <Link to="/topics/bullying" className="group p-4 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 border-3 border-purple-300 hover:from-purple-200 hover:to-purple-300 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                    <Shield className="h-8 w-8 text-purple-600 mb-2 group-hover:animate-bounce" />
                    <h3 className="font-bold mb-1 text-purple-800 text-sm">Bullying Prevention</h3>
                    <p className="text-xs text-gray-700">Stay safe! 🛡️</p>
                  </Link>
                  <Link to="/interactive-games" className="group p-4 rounded-2xl bg-gradient-to-br from-green-100 to-green-200 border-3 border-green-300 hover:from-green-200 hover:to-green-300 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                    <Gamepad2 className="h-8 w-8 text-green-600 mb-2 group-hover:animate-bounce" />
                    <h3 className="font-bold mb-1 text-green-800 text-sm">Interactive Games</h3>
                    <p className="text-xs text-gray-700">Fun games! 🎮</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );

      case 'progress':
        return <ProgressTracker />;

      case 'checkin':
        return (
          <div className="space-y-8">
            {/* Weekly Check-in */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-3xl blur opacity-75"></div>
              <div className="relative bg-gradient-to-br from-white to-pink-50 rounded-3xl border-4 border-pink-200 p-6 shadow-xl">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-pink-100 rounded-full">
                    <Calendar className="h-6 w-6 text-pink-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-pink-800">Weekly Check-in 📅</h2>
                </div>
                {renderWeeklyCheckIn()}
              </div>
            </div>

            {/* Previous Check-ins */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl blur opacity-75"></div>
              <div className="relative bg-gradient-to-br from-white to-yellow-50 rounded-3xl border-4 border-yellow-200 p-6 shadow-xl">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-yellow-100 rounded-full">
                    <History className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-yellow-800">My Previous Check-ins 📊</h2>
                </div>
                <div className="space-y-6 max-h-96 overflow-y-auto">
                  {previousCheckIns.map((checkIn, index) => (
                    <div key={index} className="bg-gradient-to-r from-white to-yellow-50 p-6 rounded-2xl border-2 border-yellow-300 shadow-lg">
                      {/* Date and Overall Feeling */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-5 w-5 text-gray-500" />
                          <span className="text-gray-600 font-medium">
                            {new Date(checkIn.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {/* Question 1: How was your week? */}
                        <div>
                          <h4 className="font-bold text-gray-700 mb-2 flex items-center space-x-2">
                            <div className="text-lg">🤔</div>
                            <span>1. How was your week?</span>
                          </h4>
                          <span className={`px-4 py-2 rounded-full text-sm font-bold
                            ${checkIn.weekFeeling === 'Good' || checkIn.weekFeeling === 'Great!'
                              ? 'bg-green-100 text-green-700 border-2 border-green-300'
                              : checkIn.weekFeeling === 'Okay'
                              ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-300'
                              : 'bg-red-100 text-red-700 border-2 border-red-300'
                            }`}
                          >
                            {checkIn.weekFeeling}
                          </span>
                        </div>

                        {/* Question 2: Main Emotions */}
                        <div>
                          <h4 className="font-bold text-gray-700 mb-2 flex items-center space-x-2">
                            <div className="text-lg">🎭</div>
                            <span>2. What did you feel most this week?</span>
                          </h4>
                          <div className="flex gap-2">
                            {checkIn.mainEmotions.map((emotion, i) => (
                              <span key={i} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium border-2 border-purple-300">
                                {emotion}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Question 3: What helped */}
                        <div>
                          <h4 className="font-bold text-gray-700 mb-2 flex items-center space-x-2">
                            <div className="text-lg">🌈</div>
                            <span>3. What helped you feel better?</span>
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {checkIn.helpfulThings.map((thing, i) => (
                              <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium border-2 border-blue-300">
                                {thing}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Question 4: Issues */}
                        <div>
                          <h4 className="font-bold text-gray-700 mb-2 flex items-center space-x-2">
                            <div className="text-lg">🚨</div>
                            <span>4. Did anything bother or upset you?</span>
                          </h4>
                          <div className="space-y-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-bold border-2 ${
                              checkIn.hadIssues ? 'bg-red-100 text-red-700 border-red-300' : 'bg-green-100 text-green-700 border-green-300'
                            }`}>
                              {checkIn.hadIssues ? 'Yes' : 'No'}
                            </span>
                            {checkIn.hadIssues && checkIn.issueDescription && (
                              <div className="mt-2 p-3 bg-white rounded-xl border-2 border-gray-200">
                                <div className="flex items-start space-x-2">
                                  <MessageCircle className="h-5 w-5 text-gray-400 mt-0.5" />
                                  <p className="text-gray-600">{checkIn.issueDescription}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Question 5: Needs Help */}
                        <div>
                          <h4 className="font-bold text-gray-700 mb-2 flex items-center space-x-2">
                            <div className="text-lg">🤝</div>
                            <span>5. Would you like help or someone to talk to?</span>
                          </h4>
                          <span className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${
                            checkIn.needsHelp === 'Yes, please'
                              ? 'bg-red-100 text-red-700 border-red-300'
                              : checkIn.needsHelp === 'Maybe'
                              ? 'bg-yellow-100 text-yellow-700 border-yellow-300'
                              : 'bg-green-100 text-green-700 border-green-300'
                          }`}>
                            {checkIn.needsHelp}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur opacity-75"></div>
            <div className="relative bg-gradient-to-br from-white to-blue-50 rounded-3xl border-4 border-blue-200 p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-blue-800">My Profile 👤</h2>
                </div>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full font-bold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
                  >
                    Edit ✏️
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {isEditing ? (
                  <>
                    <div>
                      <label className="block text-lg font-bold text-gray-700 mb-1 flex items-center space-x-2">
                        <div className="text-xl">👤</div>
                        <span>Name</span>
                      </label>
                      <input
                        type="text"
                        value={userInfo.name}
                        onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                        className="w-full px-3 py-2 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-300 bg-gradient-to-r from-white to-blue-50"
                      />
                    </div>
                    <div>
                      <label className="block text-lg font-bold text-gray-700 mb-1 flex items-center space-x-2">
                        <div className="text-xl">📧</div>
                        <span>Email</span>
                      </label>
                      <input
                        type="email"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                        className="w-full px-3 py-2 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-300 bg-gradient-to-r from-white to-blue-50"
                      />
                    </div>
                    <div>
                      <label className="block text-lg font-bold text-gray-700 mb-1 flex items-center space-x-2">
                        <div className="text-xl">🏫</div>
                        <span>Class</span>
                      </label>
                      <input
                        type="text"
                        value={userInfo.class}
                        onChange={(e) => setUserInfo({ ...userInfo, class: e.target.value })}
                        className="w-full px-3 py-2 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-300 bg-gradient-to-r from-white to-blue-50"
                      />
                    </div>
                    <div>
                      <label className="block text-lg font-bold text-gray-700 mb-1 flex items-center space-x-2">
                        <div className="text-xl">👫</div>
                        <span>Gender</span>
                      </label>
                      <select
                        value={userInfo.gender}
                        onChange={(e) => setUserInfo({ ...userInfo, gender: e.target.value })}
                        className="w-full px-3 py-2 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-300 bg-gradient-to-r from-white to-blue-50"
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male 👦</option>
                        <option value="female">Female 👧</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </select>
                    </div>
                    <div className="flex space-x-4 pt-4">
                      <button
                        onClick={handleSaveInfo}
                        className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-full font-bold hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
                      >
                        Save Changes ✅
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="bg-gradient-to-r from-gray-400 to-gray-500 text-white px-6 py-2 rounded-full font-bold hover:from-gray-500 hover:to-gray-600 transition-all duration-300"
                      >
                        Cancel ❌
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    <p className="flex items-center space-x-2"><span className="text-xl">👤</span><span className="font-bold">Name:</span> <span>{userInfo.name}</span></p>
                    <p className="flex items-center space-x-2"><span className="text-xl">📧</span><span className="font-bold">Email:</span> <span>{userInfo.email}</span></p>
                    <p className="flex items-center space-x-2"><span className="text-xl">🏫</span><span className="font-bold">Class:</span> <span>{userInfo.class}</span></p>
                    <p className="flex items-center space-x-2"><span className="text-xl">👫</span><span className="font-bold">Gender:</span> <span>{userInfo.gender || 'Not specified'}</span></p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
      {/* Floating Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 animate-bounce delay-300">
          <Star className="h-5 w-5 text-yellow-400 animate-pulse" />
        </div>
        <div className="absolute bottom-32 left-16 animate-bounce delay-700">
          <Sparkles className="h-6 w-6 text-pink-400 animate-pulse" />
        </div>
        <div className="absolute top-1/2 right-20 animate-bounce delay-1000">
          <Star className="h-4 w-4 text-blue-400 animate-pulse" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4 animate-bounce">🎓✨</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Your Amazing Dashboard!
          </h1>
          <p className="text-xl text-gray-600 mt-2">Welcome back, superstar! 🌟</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl p-2 shadow-xl border-4 border-purple-200">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  activeTab === 'overview'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <User className="h-5 w-5" />
                <span>Overview</span>
              </button>
              <button
                onClick={() => setActiveTab('progress')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  activeTab === 'progress'
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <BarChart3 className="h-5 w-5" />
                <span>Progress</span>
              </button>
              <button
                onClick={() => setActiveTab('checkin')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  activeTab === 'checkin'
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Calendar className="h-5 w-5" />
                <span>Check-in</span>
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  activeTab === 'profile'
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <User className="h-5 w-5" />
                <span>Profile</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default StudentDashboard;