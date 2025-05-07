const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, '用戶名為必填'],
    unique: true,
    lowercase: true, // Store usernames in lowercase for case-insensitive comparison
    trim: true
  },
  password: {
    type: String,
    required: [true, '密碼為必填'],
    minlength: [6, '密碼長度至少需要 6 個字元'] // Example length validation
  }
}, {
  timestamps: true
});

// Hash password before saving using a pre-save hook
AdminSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10); // Generate salt (10 rounds is generally recommended)
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare candidate password with the hashed password
AdminSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model('Admin', AdminSchema); 