const Movie = require('../models/movie');

const getAll = async (req, res) => {
  try {
    const movies = await Movie.find({ played: 'current' });
    res.json(movies);
  } catch (error) {
    res.status(500).json(error);
  }
}

const getCommingSoon = async (req, res) => {
  try {
    const movies = await Movie.find({ played: 'soon' });
    res.json(movies);
  } catch (error) {
    res.status(500).json(error);
  }
}

const getOne = async (req, res) => {

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
  getCommingSoon,
  getOne,
  createOne,
};