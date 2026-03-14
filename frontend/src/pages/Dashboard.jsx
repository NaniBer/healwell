import React from 'react';
import { telegramService } from '../services/telegram';

const Dashboard = ({ user, onboardingData }) => {
  const tg = telegramService.getInstance();

  const handleMoodCheckIn = () => {
    // TODO: Navigate to mood check-in
    telegramService.showNotification('Mood check-in coming soon!');
  };

  const handleViewPlan = () => {
    // TODO: View recovery plan
    telegramService.showNotification('Your recovery plan is being prepared by AI...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome back, {user?.first_name || 'Friend'} 💜
          </h1>
          <p className="text-gray-600">
            You're doing great. Let's check in today.
          </p>
        </div>

        {/* Daily Check-in Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Daily Check-in</h2>
              <p className="text-gray-600 text-sm">How are you feeling today?</p>
            </div>
            <div className="text-4xl">🌤️</div>
          </div>
          <button
            onClick={handleMoodCheckIn}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
          >
            Start Check-in
          </button>
        </div>

        {/* Your Plan Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Your Recovery Plan</h2>
              <p className="text-gray-600 text-sm">Personalized just for you</p>
            </div>
            <div className="text-4xl">📋</div>
          </div>
          <button
            onClick={handleViewPlan}
            className="w-full py-4 bg-purple-100 text-purple-700 rounded-xl font-semibold hover:bg-purple-200 transition-colors"
          >
            View Plan
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-lg p-4 text-center">
            <div className="text-3xl mb-2">📅</div>
            <div className="text-2xl font-bold text-gray-800">3</div>
            <div className="text-sm text-gray-600">Days healing</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4 text-center">
            <div className="text-3xl mb-2">✅</div>
            <div className="text-2xl font-bold text-gray-800">2</div>
            <div className="text-sm text-gray-600">Check-ins done</div>
          </div>
        </div>

        {/* AI Suggestion Card */}
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl shadow-lg p-6">
          <div className="flex items-start gap-3">
            <div className="text-3xl">💡</div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Today's Suggestion</h3>
              <p className="text-gray-700 text-sm">
                Based on your recent check-ins, try journaling for 10 minutes about what you're grateful for today. Gratitude can help shift your focus.
              </p>
            </div>
          </div>
        </div>

        {/* Debug Info (remove in production) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 p-4 bg-gray-100 rounded-xl text-xs text-gray-600">
            <p><strong>Debug Info:</strong></p>
            <p>User: {JSON.stringify(user)}</p>
            <p>Onboarding: {JSON.stringify(onboardingData)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
