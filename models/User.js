import { Schema, model } from 'mongoose';

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    minlength: 3,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

const User = model('user', UserSchema);

export default User;
