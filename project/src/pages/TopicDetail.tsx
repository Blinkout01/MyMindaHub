import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Brain, Heart, Shield, ArrowRight, Play, BookOpen } from 'lucide-react';
import Avatar from '../components/Avatar';
import ClickableInfographic from '../components/ClickableInfographic';
import DragDropActivity from '../components/DragDropActivity';
import BackgroundMusic from '../components/BackgroundMusic';
import { useStore } from '../store';

const topicsContent = {
  emotions: {
    title: 'Understanding Emotions',
    icon: Brain,
    color: 'text-blue-600',
    avatar: {
      name: 'Emo the Emotion Explorer',
      emotion: 'happy' as const
    },
    story: [
      {
        message: "Hi there, amazing student! I'm Emo, your emotion explorer guide! 🌟 Are you ready to discover the wonderful world of feelings together?",
        emotion: 'excited' as const
      },
      {
        message: "Emotions are like colorful messengers in our hearts and minds! They help us understand how we feel about everything around us. Let's explore them together! 🎨",
        emotion: 'happy' as const
      },
      {
        message: "First, let's look at this special emotion map! Click on each glowing point to discover different feelings. Each one is important and special! ✨",
        emotion: 'encouraging' as const
      }
    ],
    infographic: {
      title: 'The Emotion Rainbow 🌈',
      backgroundImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
      infoPoints: [
        {
          id: 'happy',
          x: 20,
          y: 30,
          title: 'Happy',
          content: 'When you feel happy, your heart feels light and bright! It\'s like sunshine inside you. You might smile, laugh, or feel excited about good things happening! 😊',
          emoji: '😊'
        },
        {
          id: 'sad',
          x: 80,
          y: 40,
          title: 'Sad',
          content: 'Feeling sad is okay too! It\'s like gentle rain in your heart. You might feel this way when something disappointing happens, but remember - sad feelings don\'t last forever! 😢',
          emoji: '😢'
        },
        {
          id: 'angry',
          x: 50,
          y: 20,
          title: 'Angry',
          content: 'Anger is like a fire inside you when something feels unfair or frustrating. It\'s normal to feel angry sometimes, but we can learn healthy ways to express it! 😠',
          emoji: '😠'
        },
        {
          id: 'scared',
          x: 30,
          y: 70,
          title: 'Scared',
          content: 'Fear helps keep us safe! When you feel scared, your body is trying to protect you. It\'s brave to talk about your fears with someone you trust! 😰',
          emoji: '😰'
        },
        {
          id: 'excited',
          x: 70,
          y: 80,
          title: 'Excited',
          content: 'Excitement is like fireworks in your heart! You feel this when something wonderful is about to happen. It makes you want to jump and share your joy! 🤩',
          emoji: '🤩'
        }
      ]
    },
    dragDrop: {
      title: 'Emotion Expression Station 🎭',
      items: [
        { id: 'talk', content: 'Talk to a friend', emoji: '💬', category: 'healthy' },
        { id: 'draw', content: 'Draw your feelings', emoji: '🎨', category: 'healthy' },
        { id: 'breathe', content: 'Take deep breaths', emoji: '🌬️', category: 'healthy' },
        { id: 'exercise', content: 'Go for a walk', emoji: '🚶‍♀️', category: 'healthy' },
        { id: 'yell', content: 'Yell at others', emoji: '😡', category: 'unhealthy' },
        { id: 'hide', content: 'Hide feelings inside', emoji: '🙈', category: 'unhealthy' },
        { id: 'break', content: 'Break things', emoji: '💥', category: 'unhealthy' },
        { id: 'ignore', content: 'Ignore everyone', emoji: '🚫', category: 'unhealthy' }
      ],
      zones: [
        {
          id: 'healthy',
          title: 'Healthy Ways',
          emoji: '✅',
          color: 'from-green-100 to-green-200',
          acceptedCategories: ['healthy']
        },
        {
          id: 'unhealthy',
          title: 'Not So Good Ways',
          emoji: '❌',
          color: 'from-red-100 to-red-200',
          acceptedCategories: ['unhealthy']
        }
      ]
    }
  },
  stress: {
    title: 'Stress Management',
    icon: Heart,
    color: 'text-pink-600',
    avatar: {
      name: 'Zen the Calm Helper',
      emotion: 'happy' as const
    },
    story: [
      {
        message: "Hello, wonderful student! I'm Zen, your calm and peaceful guide! 🧘‍♀️ I'm here to help you learn amazing ways to feel relaxed and happy!",
        emotion: 'happy' as const
      },
      {
        message: "Sometimes we feel stressed - like carrying a heavy backpack full of worries. But don't worry! I know lots of magical tricks to make that backpack feel lighter! ✨",
        emotion: 'encouraging' as const
      },
      {
        message: "Let's explore this peaceful garden together! Click on each special spot to discover calming secrets that will help you feel better! 🌸",
        emotion: 'happy' as const
      }
    ],
    infographic: {
      title: 'The Peaceful Garden 🌺',
      backgroundImage: 'https://images.unsplash.com/photo-1520808663317-647b476a81b9?auto=format&fit=crop&q=80&w=800',
      infoPoints: [
        {
          id: 'breathing',
          x: 25,
          y: 40,
          title: 'Magic Breathing',
          content: 'Take slow, deep breaths like you\'re smelling the most beautiful flower! Breathe in for 4 counts, hold for 4, then breathe out for 4. This is like giving your mind a gentle hug! 🌸',
          emoji: '🌬️'
        },
        {
          id: 'nature',
          x: 70,
          y: 30,
          title: 'Nature\'s Calm',
          content: 'Spending time outside is like getting a warm hug from Mother Earth! Listen to birds singing, feel the breeze, or watch clouds float by. Nature is the best stress medicine! 🌳',
          emoji: '🌿'
        },
        {
          id: 'music',
          x: 50,
          y: 70,
          title: 'Peaceful Sounds',
          content: 'Music can change how we feel like magic! Listen to calm, happy songs that make your heart feel light. You can even hum or sing along! 🎵',
          emoji: '🎵'
        },
        {
          id: 'movement',
          x: 80,
          y: 60,
          title: 'Gentle Movement',
          content: 'Moving your body helps shake off stress! Try gentle stretches like a cat, dance to your favorite song, or take a peaceful walk. Your body loves to move! 🤸‍♀️',
          emoji: '🧘‍♀️'
        },
        {
          id: 'talk',
          x: 30,
          y: 80,
          title: 'Share Your Feelings',
          content: 'Talking about your worries is like letting butterflies out of a jar! Find a trusted grown-up or friend who listens with their heart. You\'re never alone! 💝',
          emoji: '💬'
        }
      ]
    },
    dragDrop: {
      title: 'Stress-Busting Toolkit 🧰',
      items: [
        { id: 'meditation', content: 'Quiet meditation', emoji: '🧘‍♀️', category: 'calming' },
        { id: 'art', content: 'Creative art time', emoji: '🎨', category: 'calming' },
        { id: 'reading', content: 'Reading a good book', emoji: '📚', category: 'calming' },
        { id: 'bath', content: 'Warm, relaxing bath', emoji: '🛁', category: 'calming' },
        { id: 'worry', content: 'Worry all the time', emoji: '😰', category: 'stressful' },
        { id: 'rush', content: 'Rush through everything', emoji: '🏃‍♂️', category: 'stressful' },
        { id: 'perfectionist', content: 'Try to be perfect', emoji: '😤', category: 'stressful' },
        { id: 'compare', content: 'Compare to others', emoji: '👀', category: 'stressful' }
      ],
      zones: [
        {
          id: 'calming',
          title: 'Stress Busters',
          emoji: '😌',
          color: 'from-blue-100 to-purple-200',
          acceptedCategories: ['calming']
        },
        {
          id: 'stressful',
          title: 'Stress Makers',
          emoji: '😵',
          color: 'from-orange-100 to-red-200',
          acceptedCategories: ['stressful']
        }
      ]
    }
  },
  bullying: {
    title: 'Bullying Prevention',
    icon: Shield,
    color: 'text-purple-600',
    avatar: {
      name: 'Hero the Kindness Champion',
      emotion: 'encouraging' as const
    },
    story: [
      {
        message: "Greetings, brave student! I'm Hero, your kindness champion and safety guide! 🦸‍♀️ Together, we'll learn how to be strong, kind, and help create a world full of friendship!",
        emotion: 'encouraging' as const
      },
      {
        message: "Being kind is like having a superpower! When we're kind to others and stand up for what's right, we make our school and world a better place for everyone! 💪",
        emotion: 'excited' as const
      },
      {
        message: "Let's explore the Kindness Kingdom! Click on each magical spot to discover how you can be a hero of kindness and help others feel safe and happy! ⭐",
        emotion: 'happy' as const
      }
    ],
    infographic: {
      title: 'The Kindness Kingdom 🏰',
      backgroundImage: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&q=80&w=800',
      infoPoints: [
        {
          id: 'recognize',
          x: 30,
          y: 25,
          title: 'Spot Bullying',
          content: 'Bullying is when someone repeatedly hurts others with words or actions. It\'s never okay! If you see someone being mean to others over and over, that\'s bullying. You can help! 👀',
          emoji: '👁️'
        },
        {
          id: 'tell',
          x: 70,
          y: 35,
          title: 'Tell a Trusted Adult',
          content: 'The most important superpower is asking for help! Tell a teacher, parent, or counselor right away. They are there to protect you and help solve problems. You\'re being brave, not tattling! 🗣️',
          emoji: '👨‍🏫'
        },
        {
          id: 'support',
          x: 25,
          y: 70,
          title: 'Support Friends',
          content: 'Be a friendship hero! If you see someone being bullied, don\'t just watch. Include them in your group, sit with them at lunch, or get help from an adult. Small acts of kindness are powerful! 🤝',
          emoji: '🤗'
        },
        {
          id: 'confidence',
          x: 75,
          y: 75,
          title: 'Stand Tall',
          content: 'Walk with confidence! Keep your head up, make eye contact, and use a strong voice. Bullies often pick on people who seem scared or alone. You are strong and valuable! 💪',
          emoji: '🦸‍♀️'
        },
        {
          id: 'kindness',
          x: 50,
          y: 50,
          title: 'Spread Kindness',
          content: 'Kindness is contagious! Smile at others, include everyone in games, compliment your classmates, and celebrate differences. When we\'re all kind, bullying has no place to grow! 💖',
          emoji: '❤️'
        }
      ]
    },
    dragDrop: {
      title: 'Hero Actions vs. Not-So-Hero Actions 🦸‍♀️',
      items: [
        { id: 'include', content: 'Include everyone in games', emoji: '🎮', category: 'hero' },
        { id: 'tell-adult', content: 'Tell a trusted adult', emoji: '👨‍🏫', category: 'hero' },
        { id: 'stand-up', content: 'Stand up for others', emoji: '🛡️', category: 'hero' },
        { id: 'be-kind', content: 'Be kind to everyone', emoji: '💝', category: 'hero' },
        { id: 'ignore', content: 'Ignore bullying', emoji: '🙈', category: 'not-hero' },
        { id: 'join-in', content: 'Join in the bullying', emoji: '😈', category: 'not-hero' },
        { id: 'laugh', content: 'Laugh when others are hurt', emoji: '😂', category: 'not-hero' },
        { id: 'exclude', content: 'Leave others out on purpose', emoji: '🚫', category: 'not-hero' }
      ],
      zones: [
        {
          id: 'hero',
          title: 'Hero Actions',
          emoji: '🦸‍♀️',
          color: 'from-green-100 to-blue-200',
          acceptedCategories: ['hero']
        },
        {
          id: 'not-hero',
          title: 'Not-So-Hero Actions',
          emoji: '😞',
          color: 'from-gray-100 to-gray-200',
          acceptedCategories: ['not-hero']
        }
      ]
    }
  }
};

const TopicDetail = () => {
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [storyIndex, setStoryIndex] = useState(0);
  const [infographicCompleted, setInfographicCompleted] = useState(false);
  const [dragDropCompleted, setDragDropCompleted] = useState(false);

  const { currentUser, studentProgress, updateStudentProgress, fetchStudentProgress } = useStore();

  const topic = topicsContent[id as keyof typeof topicsContent];

  if (!topic) {
    return <div>Topic not found</div>;
  }

  const Icon = topic.icon;
  const totalSteps = 3; // Story, Infographic, Drag & Drop

  const handleNextStory = () => {
    if (storyIndex < topic.story.length - 1) {
      setStoryIndex(storyIndex + 1);
    } else {
      setCurrentStep(1);
    }
  };

  const handleInfographicComplete = () => {
    setInfographicCompleted(true);
    setTimeout(() => setCurrentStep(2), 2000);
  };

  const handleDragDropComplete = async () => {
    setDragDropCompleted(true);
    const prevProgress = studentProgress[0] || {};
    const prevTopicProgress = prevProgress.topic_progress || {};
    const prevAssessmentResults = prevProgress.assessment_results || {};

    const updatedTopicProgress = {
      ...prevTopicProgress,
      [id]: {
        completed: true,
        quizScore: prevTopicProgress[id]?.quizScore || null
      }
    };

    if (currentUser?.id) {
      await updateStudentProgress(currentUser.id, updatedTopicProgress, prevAssessmentResults);
      await fetchStudentProgress(currentUser.id);
    }
  };

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-medium text-gray-700">Learning Progress</span>
        <span className="text-lg font-medium text-gray-700">
          Step {currentStep + 1} of {totalSteps}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 border-2 border-gray-300">
        <div
          className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 h-full rounded-full transition-all duration-500 relative overflow-hidden"
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        >
          <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  const renderStoryMode = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Icon className={`h-12 w-12 ${topic.color} mr-3`} />
          <h1 className="text-4xl font-bold text-purple-800">{topic.title}</h1>
        </div>
        <div className="bg-gradient-to-r from-yellow-100 to-pink-100 rounded-2xl p-4 border-3 border-yellow-300">
          <div className="text-3xl mb-2">📖</div>
          <p className="text-lg font-medium text-gray-700">Story Mode: Meet Your Guide!</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <Avatar
          name={topic.avatar.name}
          message={topic.story[storyIndex].message}
          emotion={topic.story[storyIndex].emotion}
          onNext={handleNextStory}
          showNext={true}
        />
      </div>
    </div>
  );

  const renderInfographic = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-4 border-3 border-blue-300">
          <div className="text-3xl mb-2">🗺️</div>
          <p className="text-lg font-medium text-gray-700">Interactive Exploration!</p>
        </div>
      </div>

      <ClickableInfographic
        title={topic.infographic.title}
        backgroundImage={topic.infographic.backgroundImage}
        infoPoints={topic.infographic.infoPoints}
        onAllPointsViewed={handleInfographicComplete}
      />

      {infographicCompleted && (
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-6 border-3 border-green-300 animate-bounce">
            <div className="text-4xl mb-2">🎉</div>
            <p className="text-xl font-bold text-green-800">Fantastic exploring! Ready for the next challenge?</p>
          </div>
        </div>
      )}
    </div>
  );

  const renderDragDrop = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-green-100 to-yellow-100 rounded-2xl p-4 border-3 border-green-300">
          <div className="text-3xl mb-2">🎯</div>
          <p className="text-lg font-medium text-gray-700">Hands-On Activity!</p>
        </div>
      </div>

      <DragDropActivity
        title={topic.dragDrop.title}
        items={topic.dragDrop.items}
        zones={topic.dragDrop.zones}
        onComplete={handleDragDropComplete}
      />

      {dragDropCompleted && (
        <div className="text-center space-y-6">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 border-3 border-purple-300 animate-pulse">
            <div className="text-5xl mb-4">🏆</div>
            <h3 className="text-2xl font-bold text-purple-800 mb-2">Congratulations, Learning Champion!</h3>
            <p className="text-lg text-gray-700">You've completed all the interactive activities! Now test your knowledge with the quiz!</p>
          </div>

          <Link 
            to={`/quiz/${id}`} 
            className="inline-flex items-center space-x-3 px-10 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white text-xl font-bold rounded-full hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-110 shadow-2xl"
          >
            <span>Take the Quiz</span>
            <ArrowRight className="h-6 w-6" />
            <div className="text-2xl">🧩</div>
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
      {/* Background Music Component */}
      <BackgroundMusic isPlaying={true} volume={0.3} />
      
      <div className="max-w-6xl mx-auto px-4">
        {renderProgressBar()}
        
        {currentStep === 0 && renderStoryMode()}
        {currentStep === 1 && renderInfographic()}
        {currentStep === 2 && renderDragDrop()}
      </div>
    </div>
  );
};

export default TopicDetail;