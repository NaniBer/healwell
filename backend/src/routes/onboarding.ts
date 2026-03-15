import express, { Request, Response } from 'express';
import User, { IUser } from '../models/User';

const router = express.Router();

// Get all users
router.get('/users', async (req: Request, res: Response) => {
  try {
    const users: IUser[] = await User.find({});

    res.json({
      count: users.length,
      users: users.map(user => ({
        telegramId: user.telegramId,
        onboardingComplete: user.onboardingComplete,
        checkInsDone: user.checkInsDone,
        createdAt: user.createdAt,
      })),
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user by Telegram ID
router.get('/user/:telegramId', async (req: Request, res: Response) => {
  try {
    const { telegramId } = req.params;

    const user: IUser | null = await User.findOne({ telegramId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      telegramId: user.telegramId,
      onboardingComplete: user.onboardingComplete,
      onboardingData: user.onboardingData,
      checkInsDone: user.checkInsDone,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Save or update user onboarding data
router.post('/user', async (req: Request, res: Response) => {
  try {
    const {
      telegramId,
      languageCode,
      onboardingData,
      checkInsDone,
    } = req.body;

    if (!telegramId) {
      return res.status(400).json({ message: 'telegramId is required' });
    }

    // Find or create user
    const user: IUser | null = await User.findOneAndUpdate(
      { telegramId },
      {
        telegramId,
        languageCode,
        onboardingData,
        checkInsDone: checkInsDone || 0,
        onboardingComplete: !!onboardingData,
        updatedAt: new Date(),
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );

    if (!user) {
      return res.status(500).json({ message: 'Failed to save user data' });
    }

    res.json({
      message: 'User data saved successfully',
      telegramId: user.telegramId,
      onboardingComplete: user.onboardingComplete,
      onboardingData: user.onboardingData,
      checkInsDone: user.checkInsDone,
    });
  } catch (error) {
    console.error('Error saving user data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update check-in count
router.post('/user/:telegramId/checkin', async (req: Request, res: Response) => {
  try {
    const { telegramId } = req.params;

    const user: IUser | null = await User.findOneAndUpdate(
      { telegramId },
      {
        $inc: { checkInsDone: 1 },
        lastCheckIn: new Date(),
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Check-in recorded',
      checkInsDone: user.checkInsDone,
    });
  } catch (error) {
    console.error('Error recording check-in:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
