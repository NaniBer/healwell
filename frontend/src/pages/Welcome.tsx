/**
 * Welcome Screen
 * Landing page with single emoji, title, and call to action.
 */

import React from "react";
import TelegramService from "../services/telegram";
import Button from "../components/Button";

interface WelcomeProps {
  onStart: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  const tg = TelegramService.getInstance();

  const handleStart = () => {
    // Optional: Telegram haptic feedback
    if (tg?.HapticFeedback) {
      tg.HapticFeedback.impactOccurred("medium");
    }
    onStart();
  };

  return (
    <div className="min-h-screen bg-healwell-cream p-5 flex flex-col items-center justify-center animate-fade-in">
      <div className="max-w-[400px] w-full text-center flex flex-col items-center">
        {/* Emoji - single warmth element */}
        <div className="text-[48px] mb-8">💜</div>

        {/* Title */}
        <h1 className="text-[24px] font-bold text-healwell-black tracking-tight mb-3">
          HealWell
        </h1>

        {/* Subtitle */}
        <p className="text-[14px] text-healwell-darkGray leading-[1.5] mb-8">
          Your path to healing
        </p>

        {/* Features - simple list, no cards */}
        <div className="w-full text-left mb-12 space-y-4">
          <div className="text-[14px] text-healwell-darkGray leading-[1.5]">
            • Personalized recovery plan
          </div>
          <div className="text-[14px] text-healwell-darkGray leading-[1.5]">
            • Daily mood tracking
          </div>
          <div className="text-[14px] text-healwell-darkGray leading-[1.5]">
            • AI-powered suggestions
          </div>
        </div>

        {/* Primary CTA Button */}
        <Button onClick={handleStart} className="w-full">
          Start Your Journey
        </Button>

        {/* Privacy note - very minimal */}
        <p className="text-[12px] text-healwell-gray leading-[1.4] mt-6">
          Your information is private and secure.
        </p>
      </div>
    </div>
  );
};

export default Welcome;
