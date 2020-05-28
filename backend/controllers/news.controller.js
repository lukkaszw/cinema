const ObjectId = require('mongoose').Types.ObjectId;
const News = require('../models/news');

const updateNewsAsRead = async (req, res) => {

  const newsId = req.params.id;
  try {
    const newsToUpdate = await News.findOne({_id: ObjectId(newsId), userId: req.user._id });
    if(!newsToUpdate) {
      res.status(400).json({
        error: 'Bad request!',
      });
      return;
    }
    newsToUpdate.isRead = true;
    await newsToUpdate.save();
    res.json(newsToUpdate);
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  updateNewsAsRead,
}