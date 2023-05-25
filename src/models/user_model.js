import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// create PostModel class from schema
const UserSchema = new Schema({

  email: { type: String, unique: true, lowercase: true },
  password: { type: String },

}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

UserSchema.pre('save', async function beforeUserSave(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    return next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
  const comparison = await bcrypt.compare(candidatePassword, this.password);
  return comparison;
};

const userModel = mongoose.model('User', UserSchema);

export default userModel;
