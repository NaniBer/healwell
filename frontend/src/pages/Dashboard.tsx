/**
 * Dashboard Screen
 * Main dashboard with progress tracking, check-in, and AI suggestions.
 */

import React, { useEffect, useState } from 'react';
import TelegramService from '../services/telegram';
import { recordCheckIn } from '../services/api';
import Button from '../components/Button';
import Header from '../components/Header';
import Divider from '../components/Divider';
import Section from '../components/Section';

interface DashboardProps {
  user?: {
    id: number;
    first_name: string;
    username?: string;
    language_code: string;
    photo_url?: string;
  };
  onboardingData?: {
    daysHealed: number;
    startDate: string;
    checkInsDone?: number;
  };
}

const Dashboard: React.FC<DashboardProps> = ({ user, onboardingData }) => {
  const [moodChecked, setMoodChecked] = useState(false);
  const [todayMood, setTodayMood] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Calculate progress - get check-ins from onboarding data
  const [checkInsDone, setCheckInsDone] = useState<number>(onboardingData?.checkInsDone || 0);

  const daysHealed = onboardingData?.daysHealed || 0;
  const targetCheckIns = 7;
  const progress = Math.min((checkInsDone / targetCheckIns) * 100, 100);

  const handleMoodCheckIn = async () => {
    if (moodChecked) {
      TelegramService.showNotification('You already checked in today!');
      return;
    }

    setLoading(true);

    // Record check-in to backend
    if (user?.id) {
      const newCheckIns = await recordCheckIn(user.id.toString());

      if (newCheckIns !== null) {
        setMoodChecked(true);
        setTodayMood('good');
        setCheckInsDone(newCheckIns);
        TelegramService.showNotification('Check-in recorded!');
      } else {
        TelegramService.showNotification('Failed to record check-in');
      }
    }

    setLoading(false);
  };

  const handleViewPlan = () => {
    TelegramService.showNotification('Your recovery plan is being prepared by AI...');
  };

  return (
    <div className="min-h-screen bg-healwell-cream pt-[70px] pb-8 animate-fade-in">
      <Header progress={progress} label={`${daysHealed} days healed`} />

      <div className="max-w-[400px] mx-auto">
        {/* Welcome Section */}
        <Section>
          <h2 className="text-[18px] font-semibold text-healwell-black">
            Welcome back, {user?.first_name || 'Friend'}
          </h2>
        </Section>

        {/* Divider */}
        <Divider />

        {/* Today Section */}
        <Section heading="Today">
          {moodChecked ? (
            <div className="text-[14px] text-healwell-darkGray leading-[1.5]">
              <p className="mb-4">
                You're feeling <span className="font-semibold text-healwell-black">good</span> today.
              </p>
              <p className="text-[12px] text-healwell-gray">
                Great job checking in!
              </p>
            </div>
          ) : (
            <Button
              onClick={handleMoodCheckIn}
              loading={loading}
              className="w-full"
            >
              Daily Check-in
            </Button>
          )}
        </Section>

        {/* Divider */}
        <Divider />

        {/* Progress Section */}
        <Section heading="Your Progress">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-[12px] text-healwell-gray mb-1">Days healing</div>
              <div className="text-[24px] font-bold text-healwell-black">
                {daysHealed}
              </div>
            </div>
            <div className="text-center">
              <div className="text-[12px] text-healwell-gray mb-1">Check-ins</div>
              <div className="text-[24px] font-bold text-healwell-black">
                {checkInsDone}/{targetCheckIns}
              </div>
            </div>
          </div>
        </Section>

        {/* Divider */}
        <Divider />

        {/* Suggestions Section */}
        <Section heading="Suggestions">
          <div className="text-[14px] text-healwell-darkGray leading-[1.5]">
            Based on your recent check-ins, try journaling for 10 minutes about what you're grateful for today. Gratitude can help shift your focus.
          </div>
        </Section>

        {/* Divider */}
        <Divider />

        {/* Recovery Plan Section */}
        <Section heading="Your Plan">
          <Button
            onClick={handleViewPlan}
            variant="secondary"
            className="w-full"
          >
            View Recovery Plan
          </Button>
        </Section>

        {/* Debug Info (remove in production) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="px-5 mt-8 p-4 bg-healwell-lightGray/30 rounded-lg">
            <p className="text-[12px] text-healwell-gray mb-2">
              <strong>Debug Info:</strong>
            </p>
            <p className="text-[10px] text-healwell-gray">
              User: {JSON.stringify(user)}
            </p>
            <p className="text-[10px] text-healwell-gray">
              Onboarding: {JSON.stringify(onboardingData)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
