const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

const albumSchema = new mongoose.Schema({
  title: String,
  artist: String,
  genre: String,
  primary_genres: Array,
  nationality: String,
  description: String,
  images: Array,
  year: Number,
  release_date: Date,
  winner: Boolean,
});

const Album = mongoose.model("Album", albumSchema)

console.log("connecting to", url)

mongoose.connect(url)
    .then((result) => {
        console.log("connected to MongoDB");
        })
    .catch((error) => {
        console.log("error connecting to MongoDB: ", error.message);
    })



module.exports = Album;