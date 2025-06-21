import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, Trophy, ArrowRight } from 'lucide-react';
import { useStore } from '../store';
import { supabase } from '../lib/supabaseClient'; 

const quizData = {
  emotions: {
    title: 'Understanding Emotions Quiz',
    questions: [
      {
        id: '1',
        text: 'What should you do when you feel strong emotions?',
        options: [
          'Take deep breaths and talk to someone you trust',
          'Keep all your feelings inside and never tell anyone'
        ],
        correctAnswer: 0
      },
      {
        id: '2',
        text: 'Which of these is a healthy way to express your feelings?',
        options: [
          'Yell at others when you\'re angry',
          'Draw pictures or write about your feelings'
        ],
        correctAnswer: 1
      },
      {
        id: '3',
        text: 'Is it okay to feel sad sometimes?',
        options: [
          'Yes, all emotions are normal and okay to feel',
          'No, we should only feel happy emotions'
        ],
        correctAnswer: 0
      },
      {
        id: '4',
        text: 'What can you do when you feel scared?',
        options: [
          'Hide away and never tell anyone',
          'Talk to a grown-up you trust about your fears'
        ],
        correctAnswer: 1
      },
      {
        id: '5',
        text: 'When you feel excited about something, you should:',
        options: [
          'Share your joy with friends and family',
          'Keep quiet because being excited is wrong'
        ],
        correctAnswer: 0
      }
    ]
  },
  stress: {
    title: 'Stress Management Quiz',
    questions: [
      {
        id: '1',
        text: 'What is a good way to handle stress?',
        options: [
          'Listen to calming music and take deep breaths',
          'Stay up all night worrying about things'
        ],
        correctAnswer: 0
      },
      {
        id: '2',
        text: 'Where can you create a calm space?',
        options: [
          'Only in noisy, crowded places',
          'In a quiet corner of your room or under a favorite tree'
        ],
        correctAnswer: 1
      },
      {
        id: '3',
        text: 'What should you do when you feel overwhelmed?',
        options: [
          'Keep all your worries to yourself',
          'Talk to someone you trust about your feelings'
        ],
        correctAnswer: 1
      },
      {
        id: '4',
        text: 'Which activity can help reduce stress?',
        options: [
          'Drawing or coloring something peaceful',
          'Thinking about all your problems at once'
        ],
        correctAnswer: 0
      },
      {
        id: '5',
        text: 'When you feel stressed, it\'s good to:',
        options: [
          'Take slow, deep breaths like smelling a flower',
          'Hold your breath for as long as possible'
        ],
        correctAnswer: 0
      }
    ]
  },
  bullying: {
    title: 'Bullying Prevention Quiz',
    questions: [
      {
        id: '1',
        text: 'What should you do if you see someone being bullied?',
        options: [
          'Tell a trusted adult right away',
          'Ignore it and walk away'
        ],
        correctAnswer: 0
      },
      {
        id: '2',
        text: 'How can you help prevent bullying?',
        options: [
          'Keep to yourself and don\'t talk to anyone',
          'Include others in games and activities'
        ],
        correctAnswer: 1
      },
      {
        id: '3',
        text: 'If someone is bullying you, you should:',
        options: [
          'Keep it a secret and handle it alone',
          'Tell a teacher, parent, or counselor'
        ],
        correctAnswer: 1
      },
      {
        id: '4',
        text: 'What makes a good friend?',
        options: [
          'Someone who is kind and stands up for others',
          'Someone who only plays with popular kids'
        ],
        correctAnswer: 0
      },
      {
        id: '5',
        text: 'When you see someone being left out, you should:',
        options: [
          'Invite them to join your group',
          'Ignore them because they\'re different'
        ],
        correctAnswer: 0
      }
    ]
  }
};

const Quiz = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const { updateProgress } = useStore();

  // TODO: Replace with actual authenticated user id
  const student_id = 1;

  if (!topicId || !quizData[topicId as keyof typeof quizData]) {
    return <div>Quiz not found</div>;
  }

  const quiz = quizData[topicId as keyof typeof quizData];
  const question = quiz.questions[currentQuestion];

  const handleAnswerSelect = (answerIndex: number) => {
  const newAnswers = [...selectedAnswers];
  newAnswers[currentQuestion] = answerIndex;
  setSelectedAnswers(newAnswers);

  if (currentQuestion < quiz.questions.length - 1) {
    setTimeout(() => {
      setCurrentQuestion(currentQuestion + 1);
    }, 500);
  } else {
    // Delay calculateResults slightly to allow state update
    setTimeout(() => {
      calculateResults(newAnswers); // Pass the updated answers manually
    }, 500);
  }
};

  const calculateResults = async (answers: number[]) => {
  const correctAnswers = answers.reduce((count, answer, index) => {
    return count + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
  }, 0);

  updateProgress({
    userId: '1',
    topicProgress: {
      [topicId]: {
        completed: true,
        quizScore: (correctAnswers / quiz.questions.length) * 100
      }
    },
    assessmentResults: {}
  });

  setIsSaving(true);
  setSaveError(null);

  const { error } = await supabase.from('quiz_results').insert([
    {
      student_id,
      topic_id: topicId,
      score_percentage: ((correctAnswers / quiz.questions.length) * 100).toFixed(2),
      correct_answers: correctAnswers,
      total_questions: quiz.questions.length,
      selected_answers: answers
    }
  ]);

  setIsSaving(false);
  if (error) {
    setSaveError('Failed to save quiz results. Please try again.');
  }

  setShowResults(true);
};

  if (showResults) {
    const correctAnswers = selectedAnswers.reduce((count, answer, index) => {
      return count + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
    }, 0);
    const score = (correctAnswers / quiz.questions.length) * 100;

    return (
      <div className="max-w-2xl mx-auto">
        <div className="card text-center">
          <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-6">Quiz Complete!</h1>
          
          <div className="space-y-4 mb-8">
            <p className="text-2xl font-semibold">
              Your Score: {score}%
            </p>
            <p className="text-xl">
              You got {correctAnswers} out of {quiz.questions.length} questions correct!
            </p>
          </div>

          {isSaving && <p className="text-gray-500">Saving your results...</p>}
          {saveError && <p className="text-red-500">{saveError}</p>}

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate('/topics')}
              className="btn-primary flex items-center space-x-2"
            >
              <span>Back to Topics</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">{quiz.title}</h1>
      
      <div className="card">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </span>
            <span className="text-sm text-gray-600">
              Progress: {Math.round(((currentQuestion) / quiz.questions.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion) / quiz.questions.length) * 100}%` }}
            />
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-6">{question.text}</h2>

        <div className="space-y-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200
                ${selectedAnswers[currentQuestion] === index
                  ? index === question.correctAnswer
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-purple-500 hover:bg-purple-50'
                }
              `}
            >
              <div className="flex items-center">
                {selectedAnswers[currentQuestion] === index && (
                  index === question.correctAnswer
                    ? <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    : <XCircle className="h-5 w-5 text-red-500 mr-2" />
                )}
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;