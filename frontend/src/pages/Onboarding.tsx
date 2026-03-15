/**
 * Onboarding Screen
 * Multi-step onboarding flow with questions, validation, and progress tracking.
 */

import React, { useState } from 'react';
import Button from '../components/Button';
import Header from '../components/Header';
import Divider from '../components/Divider';

interface FormData {
  breakupDate: string;
  relationshipDuration: string;
  decisionMaker: string;
  lowMoodFrequency: string;
  supportLevel: string;
  currentPriority: string[];
}

interface OnboardingProps {
  onComplete: (data: FormData) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    breakupDate: '',
    relationshipDuration: '',
    decisionMaker: '',
    lowMoodFrequency: '',
    supportLevel: '',
    currentPriority: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    {
      id: 'breakupDate',
      question: 'When did the breakup happen?',
      type: 'date',
    },
    {
      id: 'relationshipDuration',
      question: 'How long were you in the relationship?',
      type: 'select',
      options: ['Less than 6 months', '6 months - 1 year', '1-2 years', '2-5 years', '5+ years'],
    },
    {
      id: 'decisionMaker',
      question: 'Who mainly decided to end the relationship?',
      type: 'select',
      options: ['I ended it', 'They ended it', 'Mutual decision', 'Circumstances led to it'],
    },
    {
      id: 'lowMoodFrequency',
      question: 'Over the past 2 weeks, how often have you felt down, hopeless, or unable to enjoy things?',
      type: 'select',
      options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Very often'],
    },
    {
      id: 'supportLevel',
      question: 'How supported do you feel by the people around you?',
      type: 'select',
      options: ['Very supported', 'Somewhat supported', 'Neutral', 'Somewhat unsupported', 'Very unsupported'],
    },
    {
      id: 'currentPriority',
      question: 'What feels most important for you right now?',
      type: 'multiselect',
      options: ['Acceptance and moving forward', 'Emotional healing', 'Understanding what happened', 'Building a support system', 'Self-care and wellness', 'Regaining confidence', 'Reconnecting with myself'],
    },
  ];

  const currentStep = steps[step];
  const progress = ((step + 1) / steps.length) * 100;

  const handleChange = (value: string) => {
    // Handle multi-select (array) vs single select (string)
    if (currentStep.type === 'multiselect') {
      const currentValues = formData[currentStep.id as keyof FormData] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      setFormData({
        ...formData,
        [currentStep.id]: newValues,
      });
    } else {
      setFormData({
        ...formData,
        [currentStep.id]: value,
      });
    }
    // Clear error for this field
    if (errors[currentStep.id]) {
      setErrors({
        ...errors,
        [currentStep.id]: null,
      });
    }
  };

  const handleNext = () => {
    const value = formData[currentStep.id];

    // Validation
    if (currentStep.type === 'multiselect') {
      const arrayValue = value as string[];
      if (!arrayValue || arrayValue.length === 0) {
        setErrors({
          ...errors,
          [currentStep.id]: 'Please select at least one option',
        });
        return;
      }
    } else {
      if (!value || value.trim() === '') {
        setErrors({
          ...errors,
          [currentStep.id]: 'Please provide an answer',
        });
        return;
      }
    }

    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    // Validate breakup date is not in the future
    const selectedDate = new Date(formData.breakupDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate.getTime() > today.getTime()) {
      setErrors({
        ...errors,
        breakupDate: 'Please enter a date that is not in the future',
      });
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Calculate days healed from breakup date
      const breakupDate = new Date(formData.breakupDate);
      const daysHealed = Math.floor((new Date() - breakupDate.getTime()) / (1000 * 60 * 60 * 24));

      const completeData = {
        ...formData,
        daysHealed,
        startDate: new Date().toISOString(),
      };

      onComplete(completeData);
    } catch (error) {
      console.error('Error submitting onboarding:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-healwell-cream pt-[70px] pb-8 animate-slide-up">
      <Header progress={progress} label={`${step + 1} of ${steps.length}`} />

      <div className="max-w-[400px] mx-auto px-5 mt-8">
        {/* Question Section */}
        <div className="mb-8">
          <h2 className="text-[18px] font-semibold text-healwell-black mb-2">
            {currentStep.question}
          </h2>

          {/* Helper text for multiselect */}
          {currentStep.type === 'multiselect' && (
            <p className="text-[13px] text-healwell-gray mb-4">
              Select all that apply
            </p>
          )}

          {/* Error message */}
          {errors[currentStep.id] && (
            <p className="text-[12px] text-red-500 mb-4">
              {errors[currentStep.id]}
            </p>
          )}

          {/* Input based on type */}
          {currentStep.type === 'select' && (
            <div className="space-y-3">
              {currentStep.options.map((option: string) => (
                <button
                  key={option}
                  onClick={() => handleChange(option)}
                  className={`w-full text-left px-4 py-4 border-2 rounded-lg transition-all duration-200 text-[14px] ${
                    formData[currentStep.id] === option
                      ? 'border-healwell-black bg-white'
                      : 'border-healwell-lightGray bg-white hover:border-healwell-black'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {currentStep.type === 'multiselect' && (
            <div className="space-y-3">
              {currentStep.options.map((option: string) => {
                const isSelected = (formData[currentStep.id] as string[]).includes(option);
                return (
                  <button
                    key={option}
                    onClick={() => handleChange(option)}
                    className={`w-full text-left px-4 py-4 border-2 rounded-lg transition-all duration-200 text-[14px] relative ${
                      isSelected
                        ? 'border-healwell-black bg-white'
                        : 'border-healwell-lightGray bg-white hover:border-healwell-black'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {isSelected && (
                        <span className="text-healwell-black text-[20px]">✓</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {currentStep.type === 'text' && (
            <textarea
              value={formData[currentStep.id]}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange(e.target.value)}
              placeholder={currentStep.placeholder}
              className={`w-full px-4 py-4 border-2 rounded-lg bg-white text-[14px] leading-[1.5] resize-none focus:outline-none transition-all duration-200 ${
                errors[currentStep.id]
                  ? 'border-red-500'
                  : formData[currentStep.id]
                  ? 'border-healwell-black'
                  : 'border-healwell-lightGray focus:border-healwell-black'
              }`}
              rows={4}
            />
          )}

          {currentStep.type === 'date' && (
            <input
              type="date"
              value={formData[currentStep.id]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
              className={`w-full px-4 py-4 border-2 rounded-lg bg-white text-[14px] focus:outline-none transition-all duration-200 ${
                errors[currentStep.id]
                  ? 'border-red-500'
                  : formData[currentStep.id]
                  ? 'border-healwell-black'
                  : 'border-healwell-lightGray focus:border-healwell-black'
              }`}
            />
          )}
        </div>

        {/* Divider */}
        <Divider />

        {/* Navigation */}
        <div className="mt-8 space-y-3">
          {step > 0 && (
            <Button
              variant="secondary"
              onClick={handleBack}
              className="w-full"
            >
              Back
            </Button>
          )}
          <Button
            onClick={handleNext}
            loading={loading}
            className="w-full"
          >
            {step === steps.length - 1 ? 'Complete' : 'Next'}
          </Button>
        </div>

        {/* Progress indicator text */}
        <p className="text-[12px] text-healwell-gray text-center mt-6">
          Step {step + 1} of {steps.length}
        </p>
      </div>
    </div>
  );
};

export default Onboarding;
