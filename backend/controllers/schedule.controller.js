const Movie = require('../models/movie');
const Show = require('../models/show');
require('../models/order');

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

const getOneSchedule = async (req, res) => {
  const showId = req.params.id;
  try {
    const show = await Show.findById(showId)
      .populate({
        path: 'movieId', 
        select: '-shows -filters -__v -played -createdAt -updatedAt',
        populate: {
          path: 'details',
          select: '-gallery -cast -reliseDate -description',
        }
      });

    res.json(show);
  } catch (error) {
    res.status(500).json(error);
  }
}


module.exports = {
  getSchedule,
  getOneSchedule,
};