/**
 * HealWell App
 * Main React application with state management for screens.
 */

import React, { useEffect, useState } from "react";
import TelegramService from "./services/telegram";
import {
  getUser,
  saveUser,
  type OnboardingData,
  type UserData,
} from "./services/api";
import Welcome from "./pages/Welcome";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";

interface User {
  id: number;
  first_name: string;
  username?: string;
  language_code: string;
  photo_url?: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [screen, setScreen] = useState<"welcome" | "onboarding" | "dashboard">(
    "welcome",
  );
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      // Initialize Telegram WebApp
      const tg = TelegramService.init();
      if (tg) {
        const userData = TelegramService.getUser();
        setUser(userData);
        // Expand to full screen
        tg.ready();
        tg.expand();

        // Check if user has completed onboarding from backend
        if (userData?.id) {
          try {
            const userDataFromDb = await getUser(userData.id.toString());
            if (userDataFromDb?.onboardingComplete) {
              setScreen("dashboard");
              setOnboardingData(userDataFromDb.onboardingData);
            }
          } catch (error) {
            console.error("Error fetching user from backend:", error);
            // Continue to welcome screen if backend fails
          }
        }
      }

      setLoading(false);
    };

    initializeApp();
  }, []);

  const handleStartOnboarding = () => {
    setScreen("onboarding");
  };

  const handleOnboardingComplete = async (data: OnboardingData) => {
    setOnboardingData(data);
    setScreen("dashboard");

    // Save to backend
    if (user?.id) {
      try {
        await saveUser({
          telegramId: user.id.toString(),
          languageCode: user.language_code,
          onboardingData: data,
        });
      } catch (error) {
        console.error("Error saving to backend:", error);
        // Continue anyway - user can still use the app
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-healwell-cream flex items-center justify-center">
        <div className="text-center">
          <div className="text-[48px] mb-4">💜</div>
          <p className="text-[14px] text-healwell-darkGray">Loading...</p>
        </div>
      </div>
    );
  }

  switch (screen) {
    case "welcome":
      return <Welcome onStart={handleStartOnboarding} />;
    case "onboarding":
      return <Onboarding onComplete={handleOnboardingComplete} />;
    case "dashboard":
      return <Dashboard user={user} onboardingData={onboardingData} />;
    default:
      return <Welcome onStart={handleStartOnboarding} />;
  }
}

export default App;
