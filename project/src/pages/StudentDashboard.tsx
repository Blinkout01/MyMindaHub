import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Heart, Shield, User, Calendar, BookOpen, ClipboardCheck, History, MessageCircle, Gamepad2 } from 'lucide-react';
import { useStore } from '../store';

const StudentDashboard = () => {
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
      <div key="week-feeling\" className="space-y-6">
        <h3 className="text-xl font-semibold mb-4">How was your week?</h3>
        <p className="text-gray-600 mb-4">👦👧 Pick the face that shows how your week felt!</p>
        <div className="grid grid-cols-5 gap-4">
          {[
            { emoji: '😀', text: 'Great!' },
            { emoji: '🙂', text: 'Good' },
            { emoji: '😐', text: 'Okay' },
            { emoji: '😔', text: 'Not so good' },
            { emoji: '😢', text: 'Bad' }
          ].map(feeling => (
            <button
              key={feeling.text}
              onClick={() => {
                setCheckInAnswers(prev => ({ ...prev, weekFeeling: feeling.text }));
                setCheckInStep(1);
              }}
              className={`p-4 rounded-lg border-2 transition-all hover:scale-105
                ${checkInAnswers.weekFeeling === feeling.text
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-300'
                }`}
            >
              <div className="text-3xl mb-2">{feeling.emoji}</div>
              <div className="text-sm">{feeling.text}</div>
            </button>
          ))}
        </div>
      </div>,

      // Step 2: What did you feel most?
      <div key="main-emotions" className="space-y-6">
        <h3 className="text-xl font-semibold mb-4">What did you feel most this week?</h3>
        <p className="text-gray-600 mb-4">🎭 Choose up to 2 feelings you had the most.</p>
        <div className="grid grid-cols-3 gap-4">
          {[
            { emoji: '😃', text: 'Happy' },
            { emoji: '😠', text: 'Angry' },
            { emoji: '😞', text: 'Sad' },
            { emoji: '😬', text: 'Stressed' },
            { emoji: '🤗', text: 'Loved' },
            { emoji: '😴', text: 'Tired' },
            { emoji: '😕', text: 'Confused' }
          ].map(emotion => (
            <button
              key={emotion.text}
              onClick={() => handleEmotionSelect(emotion.text)}
              className={`p-4 rounded-lg border-2 transition-all hover:scale-105
                ${checkInAnswers.mainEmotions.includes(emotion.text)
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-300'
                }`}
              disabled={checkInAnswers.mainEmotions.length >= 2 && !checkInAnswers.mainEmotions.includes(emotion.text)}
            >
              <div className="text-3xl mb-2">{emotion.emoji}</div>
              <div className="text-sm">{emotion.text}</div>
            </button>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => setCheckInStep(2)}
            className="btn-primary"
            disabled={checkInAnswers.mainEmotions.length === 0}
          >
            Next
          </button>
        </div>
      </div>,

      // Step 3: What helped you feel better?
      <div key="helpful-things" className="space-y-6">
        <h3 className="text-xl font-semibold mb-4">What helped you feel better this week?</h3>
        <p className="text-gray-600 mb-4">🌈 What made your week nicer?</p>
        <div className="grid grid-cols-2 gap-4">
          {[
            { emoji: '🧑‍🤝‍🧑', text: 'Talking to friends' },
            { emoji: '👨‍🏫', text: 'Talking to a teacher or adult' },
            { emoji: '🏃', text: 'Playing or exercising' },
            { emoji: '🎮', text: 'Games or hobbies' },
            { emoji: '📚', text: 'Learning something fun' },
            { emoji: '💤', text: 'Rest or sleep' }
          ].map(thing => (
            <button
              key={thing.text}
              onClick={() => handleHelpfulThingSelect(thing.text)}
              className={`p-4 rounded-lg border-2 transition-all hover:scale-105
                ${checkInAnswers.helpfulThings.includes(thing.text)
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-300'
                }`}
            >
              <div className="text-2xl mb-2">{thing.emoji}</div>
              <div className="text-sm">{thing.text}</div>
            </button>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => setCheckInStep(3)}
            className="btn-primary"
          >
            Next
          </button>
        </div>
      </div>,

      // Step 4: Did anything bother you?
      <div key="issues" className="space-y-6">
        <h3 className="text-xl font-semibold mb-4">Did anything bother or upset you this week?</h3>
        <p className="text-gray-600 mb-4">🚨 It's okay to share — even small things matter.</p>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <button
              onClick={() => setCheckInAnswers(prev => ({ ...prev, hadIssues: true }))}
              className={`flex-1 p-4 rounded-lg border-2 transition-all
                ${checkInAnswers.hadIssues
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-300'
                }`}
            >
              <div className="text-2xl mb-2">✅</div>
              <div>Yes</div>
            </button>
            <button
              onClick={() => {
                setCheckInAnswers(prev => ({ ...prev, hadIssues: false, issueDescription: '' }));
                setCheckInStep(4);
              }}
              className={`flex-1 p-4 rounded-lg border-2 transition-all
                ${checkInAnswers.hadIssues === false
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-300'
                }`}
            >
              <div className="text-2xl mb-2">❌</div>
              <div>No</div>
            </button>
          </div>
          {checkInAnswers.hadIssues && (
            <div className="space-y-4">
              <p className="text-gray-600">💬 Do you want to tell us about it? (Optional)</p>
              <textarea
                value={checkInAnswers.issueDescription}
                onChange={(e) => setCheckInAnswers(prev => ({ ...prev, issueDescription: e.target.value }))}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                rows={3}
                placeholder="Share what's on your mind..."
              />
              <div className="flex justify-end">
                <button
                  onClick={() => setCheckInStep(4)}
                  className="btn-primary"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>,

      // Step 5: Need help?
      <div key="need-help" className="space-y-6">
        <h3 className="text-xl font-semibold mb-4">Would you like help or someone to talk to?</h3>
        <p className="text-gray-600 mb-4">🤝 We're here for you!</p>
        <div className="grid grid-cols-3 gap-4">
          {[
            { emoji: '🟢', text: 'Yes, please' },
            { emoji: '🟡', text: 'Maybe' },
            { emoji: '🔴', text: 'No, I\'m okay' }
          ].map(option => (
            <button
              key={option.text}
              onClick={() => {
                setCheckInAnswers(prev => ({ ...prev, needsHelp: option.text }));
                setCheckInStep(5);
              }}
              className={`p-4 rounded-lg border-2 transition-all hover:scale-105
                ${checkInAnswers.needsHelp === option.text
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-300'
                }`}
            >
              <div className="text-2xl mb-2">{option.emoji}</div>
              <div className="text-sm">{option.text}</div>
            </button>
          ))}
        </div>
      </div>,

      // Final Step: Thank you
      <div key="thank-you" className="text-center space-y-6">
        <div className="text-4xl mb-4">🎉</div>
        <h3 className="text-xl font-semibold">Thank you for checking in!</h3>
        <p className="text-gray-600">You're strong and amazing! See you next week!</p>
        <button
          onClick={() => setCheckInStep(0)}
          className="btn-primary"
        >
          Done
        </button>
      </div>
    ];

    return steps[checkInStep];
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-purple-800 mb-8">Student Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Personal Information */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <User className="h-6 w-6 text-purple-600" />
              <h2 className="text-xl font-semibold">Personal Information</h2>
            </div>
            <button
              onClick={() => isEditing ? handleSaveInfo() : setIsEditing(true)}
              className="btn-primary text-sm"
            >
              {isEditing ? 'Save Changes' : 'Edit'}
            </button>
          </div>

          <div className="space-y-4">
            {isEditing ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                  <input
                    type="text"
                    value={userInfo.class}
                    onChange={(e) => setUserInfo({ ...userInfo, class: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    value={userInfo.gender}
                    onChange={(e) => setUserInfo({ ...userInfo, gender: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
              </>
            ) : (
              <>
                <p><span className="font-medium">Name:</span> {userInfo.name}</p>
                <p><span className="font-medium">Email:</span> {userInfo.email}</p>
                <p><span className="font-medium">Class:</span> {userInfo.class}</p>
                <p><span className="font-medium">Gender:</span> {userInfo.gender || 'Not specified'}</p>
              </>
            )}
          </div>
        </div>

        {/* Weekly Wellness Check-in */}
        <div className="card">
          <div className="flex items-center space-x-3 mb-6">
            <Calendar className="h-6 w-6 text-purple-600" />
            <h2 className="text-xl font-semibold">Weekly Wellness Check-in</h2>
          </div>
          {renderWeeklyCheckIn()}
        </div>

        {/* Learning Topics */}
        <div className="md:col-span-2">
          <div className="card">
            <div className="flex items-center space-x-3 mb-6">
              <BookOpen className="h-6 w-6 text-purple-600" />
              <h2 className="text-xl font-semibold">Learning & Activities</h2>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              <Link to="/topics/emotions" className="p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                <Brain className="h-8 w-8 text-blue-600 mb-2" />
                <h3 className="font-semibold mb-1">Understanding Emotions</h3>
                <p className="text-sm text-gray-600">Learn about different feelings and how to express them!</p>
              </Link>
              <Link to="/topics/stress" className="p-4 rounded-lg bg-pink-50 hover:bg-pink-100 transition-colors">
                <Heart className="h-8 w-8 text-pink-600 mb-2" />
                <h3 className="font-semibold mb-1">Stress Management</h3>
                <p className="text-sm text-gray-600">Discover fun ways to stay calm and relaxed!</p>
              </Link>
              <Link to="/topics/bullying" className="p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
                <Shield className="h-8 w-8 text-purple-600 mb-2" />
                <h3 className="font-semibold mb-1">Bullying Prevention</h3>
                <p className="text-sm text-gray-600">Learn how to stay safe and help others!</p>
              </Link>
              <Link to="/interactive-games" className="p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                <Gamepad2 className="h-8 w-8 text-green-600 mb-2" />
                <h3 className="font-semibold mb-1">Interactive Games</h3>
                <p className="text-sm text-gray-600">Have fun while learning about mental health!</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Previous Check-ins */}
        <div className="md:col-span-2">
          <div className="card">
            <div className="flex items-center space-x-3 mb-6">
              <History className="h-6 w-6 text-purple-600" />
              <h2 className="text-xl font-semibold">Previous Check-ins</h2>
            </div>
            <div className="space-y-6">
              {previousCheckIns.map((checkIn, index) => (
                <div key={index} className="p-4 rounded-lg bg-gray-50">
                  {/* Date and Overall Feeling */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-gray-500" />
                      <span className="text-gray-600">
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
                      <h4 className="font-medium text-gray-700 mb-2">1. How was your week?</h4>
                      <span className={`px-3 py-1 rounded-full text-sm
                        ${checkIn.weekFeeling === 'Good' || checkIn.weekFeeling === 'Great!'
                          ? 'bg-green-100 text-green-700'
                          : checkIn.weekFeeling === 'Okay'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {checkIn.weekFeeling}
                      </span>
                    </div>

                    {/* Question 2: Main Emotions */}
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">2. What did you feel most this week?</h4>
                      <div className="flex gap-2">
                        {checkIn.mainEmotions.map((emotion, i) => (
                          <span key={i} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                            {emotion}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Question 3: What helped */}
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">3. What helped you feel better?</h4>
                      <div className="flex flex-wrap gap-2">
                        {checkIn.helpfulThings.map((thing, i) => (
                          <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                            {thing}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Question 4: Issues */}
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">4. Did anything bother or upset you?</h4>
                      <div className="space-y-2">
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          checkIn.hadIssues ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {checkIn.hadIssues ? 'Yes' : 'No'}
                        </span>
                        {checkIn.hadIssues && checkIn.issueDescription && (
                          <div className="mt-2 p-3 bg-white rounded-lg border border-gray-200">
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
                      <h4 className="font-medium text-gray-700 mb-2">5. Would you like help or someone to talk to?</h4>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        checkIn.needsHelp === 'Yes, please'
                          ? 'bg-red-100 text-red-700'
                          : checkIn.needsHelp === 'Maybe'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
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
    </div>
  );
};

export default StudentDashboard;