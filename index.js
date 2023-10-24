require("dotenv").config();
const express = require("express");

const app = express();
const cors = require("cors");
const morgan = require("morgan");

const Album = require("./models/album");

const PORT = process.env.PORT;

app.use(express.static('build'));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());


app.get("/api/albums", (request, response) => {
  let year = request.headers.year;
  let winners = request.headers.winner;
  let genre = request.headers.genre;
  let requestObj = {};
  let sortObj = { artist: 1, release_date: 1 };

  if (year) {
    requestObj.year = year;
  }

  if (winners) {
    requestObj.winner = true;
    sortObj = { release_date: 1 };
  }

  if (genre) {
    requestObj.primary_genres = genre;
  }

  console.log(requestObj);

  Album.find(requestObj)
    .collation({ locale: "en" })
    .sort(sortObj)
    .then((albums) => {
      response.json(albums);
    })
    .catch((error) => {
      console.log(error.message);
    });
});

app.get("/api/albums/genres", (request, response) => {
  Album.collection
    .distinct("primary_genres")
    .then((genres) => {
      response.json(genres);
    })
    .catch((error) => {
      console.log(error.message);
    });
});

app.get("/api/albums/years", (request, response) => {
  Album.collection
    .distinct("year")
    .then((years) => {
      response.json(years);
    })
    .catch((error) => {
      console.log(error.message);
    });
});

const unknownEndpoint = (request, response) => {
  return response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});