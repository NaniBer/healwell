import React, { useState } from 'react';
import { telegramService } from '../services/telegram';

const Onboarding = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    breakupDate: '',
    relationshipLength: '',
    relationshipType: '',
    currentFeeling: '',
    mainChallenge: '',
    supportSystem: '',
  });

  const totalSteps = 6;

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Onboarding complete:', formData);
    // TODO: Send to backend
    telegramService.showNotification('Creating your personalized recovery plan...');
    setTimeout(() => onComplete(formData), 1500);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">When did the breakup happen?</h2>
            <input
              type="date"
              value={formData.breakupDate}
              onChange={(e) => handleChange('breakupDate', e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none text-gray-800"
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">How long were you together?</h2>
            <div className="grid grid-cols-2 gap-3">
              {['Less than 3 months', '3-6 months', '6 months - 1 year', '1-2 years', '2-5 years', '5+ years'].map((option) => (
                <button
                  key={option}
                  onClick={() => handleChange('relationshipLength', option)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.relationshipLength === option
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-purple-300 text-gray-700'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">What type of relationship was it?</h2>
            <div className="space-y-3">
              {[
                { value: 'dating', label: 'Dating', emoji: '💕' },
                { value: 'long_term', label: 'Long-term relationship', emoji: '💑' },
                { value: 'engaged', label: 'Engaged', emoji: '💍' },
                { value: 'married', label: 'Married', emoji: '👰' },
                { value: 'complicated', label: 'It\'s complicated', emoji: '🤷' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleChange('relationshipType', option.value)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    formData.relationshipType === option.value
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-purple-300 text-gray-700'
                  }`}
                >
                  <span className="text-xl mr-2">{option.emoji}</span>
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">How are you feeling right now?</h2>
            <div className="grid grid-cols-1 gap-3">
              {[
                { value: 'devastated', label: 'Devastated', emoji: '😢' },
                { value: 'sad', label: 'Sad but coping', emoji: '😔' },
                { value: 'confused', label: 'Confused', emoji: '😕' },
                { value: 'angry', label: 'Angry', emoji: '😠' },
                { value: 'relieved', label: 'Relieved', emoji: '😌' },
                { value: 'hopeful', label: 'Hopeful', emoji: '🌟' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleChange('currentFeeling', option.value)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    formData.currentFeeling === option.value
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-purple-300 text-gray-700'
                  }`}
                >
                  <span className="text-xl mr-2">{option.emoji}</span>
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">What's your biggest challenge right now?</h2>
            <div className="space-y-3">
              {[
                { value: 'loneliness', label: 'Feeling lonely', emoji: '🚶' },
                { value: 'memories', label: 'Can\'t stop thinking about them', emoji: '💭' },
                { value: 'social', label: 'Social media triggers', emoji: '📱' },
                { value: 'self_worth', label: 'Questioning my self-worth', emoji: '🤔' },
                { value: 'future', label: 'Uncertain about the future', emoji: '❓' },
                { value: 'other', label: 'Something else', emoji: '💭' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleChange('mainChallenge', option.value)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    formData.mainChallenge === option.value
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-purple-300 text-gray-700'
                  }`}
                >
                  <span className="text-xl mr-2">{option.emoji}</span>
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Do you have a support system?</h2>
            <div className="space-y-3">
              {[
                { value: 'friends_family', label: 'Yes, friends and family', emoji: '👨‍👩‍👧‍👦' },
                { value: 'friends_only', label: 'Yes, friends', emoji: '👥' },
                { value: 'family_only', label: 'Yes, family', emoji: '👨‍👩‍👧' },
                { value: 'therapy', label: 'Yes, I have a therapist', emoji: '🧠' },
                { value: 'minimal', label: 'Not really', emoji: '😔' },
                { value: 'prefer_not', label: 'I prefer to handle it alone', emoji: '🧘' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleChange('supportSystem', option.value)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    formData.supportSystem === option.value
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-purple-300 text-gray-700'
                  }`}
                >
                  <span className="text-xl mr-2">{option.emoji}</span>
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return formData.breakupDate;
      case 2: return formData.relationshipLength;
      case 3: return formData.relationshipType;
      case 4: return formData.currentFeeling;
      case 5: return formData.mainChallenge;
      case 6: return formData.supportSystem;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-md mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="flex-1 py-4 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`flex-1 py-4 rounded-xl font-semibold transition-colors ${
              canProceed()
                ? 'bg-purple-500 text-white hover:bg-purple-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {step === totalSteps ? 'Create My Plan' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
