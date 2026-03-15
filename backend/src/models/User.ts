import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  // Telegram user info
  telegramId: string;
  languageCode?: string;

  // Onboarding data
  onboardingComplete: boolean;
  onboardingData: {
    breakupDate?: string;
    relationshipDuration?: string;
    decisionMaker?: string;
    lowMoodFrequency?: string;
    supportLevel?: string;
    currentPriority?: string[];
    daysHealed?: number;
    startDate?: string;
  };

  // Check-ins
  checkInsDone: number;
  lastCheckIn?: Date;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    // Telegram user info
    telegramId: {
      type: String,
      required: true,
      unique: true,
    },
    languageCode: {
      type: String,
      required: false,
    },

    // Onboarding data
    onboardingComplete: {
      type: Boolean,
      default: false,
    },
    onboardingData: {
      breakupDate: String,
      relationshipDuration: String,
      decisionMaker: String,
      lowMoodFrequency: String,
      supportLevel: String,
      currentPriority: [String],
      daysHealed: Number,
      startDate: String,
    },

    // Check-ins
    checkInsDone: {
      type: Number,
      default: 0,
    },
    lastCheckIn: {
      type: Date,
    },

    // Timestamps
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>('User', UserSchema);
