const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://achieved-janet-stack-throwing.trycloudflare.com/api';

export interface OnboardingData {
  breakupDate: string;
  relationshipDuration: string;
  decisionMaker: string;
  lowMoodFrequency: string;
  supportLevel: string;
  currentPriority: string[];
  daysHealed: number;
  startDate: string;
}

export interface UserData {
  telegramId: string;
  firstName: string;
  username?: string;
  languageCode?: string;
  photoUrl?: string;
  onboardingComplete: boolean;
  onboardingData: OnboardingData | null;
  checkInsDone: number;
}

export async function getUser(telegramId: string): Promise<UserData | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/user/${telegramId}`);

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export async function saveUser(data: {
  telegramId: string;
  firstName: string;
  username?: string;
  languageCode?: string;
  photoUrl?: string;
  onboardingData?: OnboardingData;
  checkInsDone?: number;
}): Promise<UserData | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to save user: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving user:', error);
    return null;
  }
}

export async function recordCheckIn(telegramId: string): Promise<number | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/user/${telegramId}/checkin`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(`Failed to record check-in: ${response.statusText}`);
    }

    const result = await response.json();
    return result.checkInsDone;
  } catch (error) {
    console.error('Error recording check-in:', error);
    return null;
  }
}
