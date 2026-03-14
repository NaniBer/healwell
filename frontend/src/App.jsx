import React, { useEffect, useState } from 'react';
import { telegramService } from './services/telegram';
import Welcome from './pages/Welcome';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';

function App() {
  const [user, setUser] = useState(null);
  const [screen, setScreen] = useState('welcome'); // 'welcome', 'onboarding', 'dashboard'
  const [onboardingData, setOnboardingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize Telegram WebApp
    const tg = telegramService.init();
    if (tg) {
      const userData = telegramService.getUser();
      setUser(userData);
    }

    // Check if user has completed onboarding
    const savedOnboarding = localStorage.getItem('onboarding_complete');
    const savedData = localStorage.getItem('onboarding_data');

    if (savedOnboarding === 'true' && savedData) {
      setScreen('dashboard');
      setOnboardingData(JSON.parse(savedData));
    }

    setLoading(false);
  }, []);

  const handleStartOnboarding = () => {
    setScreen('onboarding');
  };

  const handleOnboardingComplete = (data) => {
    setOnboardingData(data);
    setScreen('dashboard');
    localStorage.setItem('onboarding_complete', 'true');
    localStorage.setItem('onboarding_data', JSON.stringify(data));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">💜</div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  switch (screen) {
    case 'welcome':
      return <Welcome onStart={handleStartOnboarding} />;
    case 'onboarding':
      return <Onboarding onComplete={handleOnboardingComplete} />;
    case 'dashboard':
      return <Dashboard user={user} onboardingData={onboardingData} />;
    default:
      return <Welcome onStart={handleStartOnboarding} />;
  }
}

export default App;
