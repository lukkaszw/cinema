const mongoose = require('mongoose');
const _v = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    validate: {
      validator: (value) => _v.isEmail(value),
      message: props => 'Login should be an email!',
    },
    required: true,
    unique: [true, 'Provided email is in use!'],
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    validate: {
      validator: (value) => value.length > 8,
      message: () => 'Password must be at least 8 characters long!',
    },
    required: true,
  },
  tokens: [{
      token: {
        type: String,
        required: true,
      },
  }],
  name: {
    type: String,
    trim: true,
  },
  surname: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  getsNewsletter: {
    type: Boolean,
    isRequired: true,
    default: false,
  },
  news: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'New'
  }],
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_KEY );

  user.tokens.push({token});
  await user.save();
  
  return token;
}

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  userObject.email = userObject.login;

  delete userObject.login;
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
}

userSchema.statics.findByCredentials = async (login, password) => {
  const user = await User.findOne({ login: { $eq: login }  });
  const errorMessage = 'Incorrect login or password!';
  if(!user) {
    throw new Error(errorMessage);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if(!isMatch) {
    throw new Error(errorMessage);
  }

  return user;
}

userSchema.statics.sendRegistrationErrors = (error, res) => {
  
  if(error.message === 'Passwords do not match!') {
    return res.status(400).json({ 
      message: error.message, 
    });
  }

  if(error.errors) {
    const { login, password } = error.errors;
    let message = '';
    if(login) {
      message += login.message;
    }
    if(password) {
      message += ` ${password.message}`;
    }

    return res.status(400).json({ message });
  }


  if(error.message.indexOf('duplicate key error') !== -1) {
    return res.status(400).json({ message: 'Provided email is in use!'});
  }

  res.status(500).json({ message: error.message });
}

userSchema.pre('save', async function (next) {
  const user = this;

  if(user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;