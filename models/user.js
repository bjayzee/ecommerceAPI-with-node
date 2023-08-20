const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: 'Two users cannot share the same email ({VALUE})',
    unique: true,
  },
  password: String,
});

// Adding a custom error message for the unique constraint
userSchema.path('email').validate(async function (value) {
  const emailCount = await mongoose.models.User.countDocuments({ email: value });
  return !emailCount;
}, 'Email already exists');

const User = mongoose.model('User', userSchema);

module.exports = User;