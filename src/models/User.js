import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Add any other fields that might exist in your existing data
  role: {
    type: String,
    default: 'member',
  },
  avatar: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true,
});

// Since passwords are already hashed, remove the pre-save hook
// or modify it to only hash if the password is modified and not already hashed

export default mongoose.models.User || mongoose.model('User', userSchema);