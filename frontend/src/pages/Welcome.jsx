import React from 'react';
import { telegramService } from '../services/telegram';

const Welcome = ({ onStart }) => {
  const tg = telegramService.getInstance();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6 flex flex-col items-center justify-center">
      <div className="max-w-md w-full text-center">
        {/* Logo/Icon */}
        <div className="text-6xl mb-6">💔</div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          HealWell
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 mb-8 text-lg">
          Your AI-powered companion for healing
        </p>

        {/* Features */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 text-left">
          <h2 className="font-bold text-gray-800 mb-4">What you'll get:</h2>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <span className="text-xl">🎯</span>
              <span className="text-gray-700">Personalized recovery plan</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-xl">📊</span>
              <span className="text-gray-700">Daily mood tracking</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-xl">💡</span>
              <span className="text-gray-700">AI-powered suggestions</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-xl">📈</span>
              <span className="text-gray-700">Track your progress</span>
            </li>
          </ul>
        </div>

        {/* Privacy Note */}
        <div className="bg-purple-50 rounded-xl p-4 mb-6">
          <p className="text-purple-800 text-sm">
            🔒 Your information is private and secure. Everything stays between you and your healing journey.
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={onStart}
          className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
        >
          Start Your Healing Journey
        </button>
      </div>
    </div>
  );
};

export default Welcome;
