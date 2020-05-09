const Movie = require('../models/movie');
require('../models/details');
require('../models/show');

const getAll = async (req, res) => {
  try {
    const movies = await Movie.find()
    .populate('details', '-description -_id -country -reliseDate -cast -pageImage -imagePortrait -gallery')
    .select('-shows -createdAt -updatedAt -scheduleImg -__v')
    res.json(movies);
  } catch (error) {
    res.status(500).json(error);
  }

}

const getOne = async (req, res) => {
  const id = req.params.id;
  try {
    const movie = await Movie.findById(id)
      .populate('details')
      .populate('shows');
      
    if(!movie) {
      res.status(404).json({
        message: 'Not found',
      });
      return;
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json(error);
  }

}

const createOne = async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  getAll,
  getOne,
  createOne,
};