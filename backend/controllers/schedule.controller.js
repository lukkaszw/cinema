const Movie = require('../models/movie');

const getSchedule = async (req, res) => {
  try {
    const movies = await Movie.find({ played: 'current' })
      .populate('details', '-description -cast -country -language -direction -reliseDate -_id -gallery -pageImage -imagePortrait')
      .populate('shows');

    res.json(movies);
  } catch (error) {
    res.status(500).json(error);
  }
};


module.exports = {
  getSchedule,
};