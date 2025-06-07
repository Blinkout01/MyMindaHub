import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardCheck, ArrowRight, PlayCircle } from 'lucide-react';
import { useStore } from '../store';

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
  { value: 0, label: 'Not True' },
  { value: 1, label: 'A Little True' },
  { value: 2, label: 'Fairly True' },
  { value: 3, label: 'Very True' },
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
  const { currentUser, updateProgress } = useStore();
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

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);

    if (currentQuestion < TOTAL_QUESTIONS - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const scores = calculateScores();
      updateProgress({
        userId: '1', // This should come from authentication
        topicProgress: {},
        assessmentResults: {
          'dass-y': {
            completed: true,
            responses: newAnswers,
            date: new Date().toISOString(),
            scores,
          },
        },
      });
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
        return 'text-green-600';
      case 'Mild':
        return 'text-yellow-600';
      case 'Moderate':
        return 'text-orange-600';
      case 'Severe':
        return 'text-red-600';
      case 'Extremely Severe':
        return 'text-red-800';
      default:
        return 'text-gray-600';
    }
  };

  if (!started) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card">
          <div className="flex justify-center mb-6">
            <ClipboardCheck className="h-16 w-16 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-center mb-6">Mental Health Assessment</h1>
          
          <div className="prose max-w-none mb-8">
            <p className="text-gray-600 text-lg text-center mb-6">
              We would like to find out how you have been feeling in THE PAST WEEK. There are some
              sentences below. Please select the option which best shows how TRUE each sentence was of
              you during the past week. There are no right or wrong answers.
            </p>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-purple-800 mb-4">How to Complete the Assessment:</h2>
              <ul className="space-y-2 text-gray-700">
                <li>Read each statement carefully</li>
                <li>Choose the answer that best describes your feelings in the past week</li>
                <li>Don't spend too much time on any statement</li>
                <li>Your first reaction is usually the most accurate</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleStartAssessment}
              className="btn-primary flex items-center space-x-2 text-lg px-8 py-3"
            >
              <PlayCircle className="h-6 w-6" />
              <span>Start Assessment</span>
            </button>
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
      <div className="max-w-2xl mx-auto">
        <div className="card">
          <div className="flex justify-center mb-6">
            <ClipboardCheck className="h-16 w-16 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-center mb-8">Assessment Results</h1>

          <div className="space-y-6">
            {Object.entries(scores).map(([scale, score]) => {
              const severity = getScoreInterpretation(score, scale as keyof typeof severityRanges);
              return (
                <div key={scale} className="p-4 rounded-lg bg-gray-50">
                  <h2 className="text-xl font-semibold capitalize mb-2">{scale}</h2>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Score: {score}</span>
                    <span className={`font-medium ${getSeverityColor(severity)}`}>
                      {severity}
                    </span>
                  </div>
                </div>
              );
            })}

            <div className="p-4 rounded-lg bg-purple-50 border-2 border-purple-200">
              <h2 className="text-xl font-semibold mb-2">Total Score</h2>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Score: {totalScore}</span>
                <span className={`font-medium ${getSeverityColor(totalSeverity)}`}>
                  {totalSeverity}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-center text-gray-600 mb-6">
              Based on your responses, your overall stress level is{' '}
              <span className={`font-medium ${getSeverityColor(totalSeverity)}`}>
                {totalSeverity.toLowerCase()}
              </span>. Remember that this is just a screening tool and not a diagnosis. 
              If you're concerned about your results, please speak with a counselor or mental health professional.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => navigate('/topics')}
                className="btn-primary flex items-center space-x-2"
              >
                <span>Continue Learning</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mental Health Assessment</h1>
      
      <div className="card">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {TOTAL_QUESTIONS}
            </span>
            <span className="text-sm text-gray-600">
              Progress: {Math.round(((currentQuestion) / TOTAL_QUESTIONS) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion) / TOTAL_QUESTIONS) * 100}%` }}
            />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6">
            {questions[currentQuestion].text}
          </h2>
        </div>

        <div className="space-y-3">
          {scaleOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200
                ${answers[currentQuestion] === option.value
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-500 hover:bg-purple-50'
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Assessment;