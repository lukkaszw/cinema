const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  linkText: {
    type: String,
  },
  link: {
    type: String,
  },
  isRead: {
    type: Boolean,
    default: false,
  }
}, 
{
  timestamps: true,
});

newsSchema.statics.createWelcomeNews = async (userId) => {
  const data = [{
      userId,
      title: 'Welcome to our website!',
      text: 'We hope you will enjoy our website :)',
    }, {
      userId,
      title: 'Please fill out your details!',
      text: 'Please fill out your details on settings panel. Below you have an link.',
      linkText: 'fill out your data',
      link: '/user/settings',
    }
  ];

  const news = await News.insertMany(data);
  return news;
}

const News = mongoose.model('New', newsSchema);

module.exports = News;