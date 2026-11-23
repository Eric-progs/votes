
const express = require("express");
const route = express.Router();

const images = [
  "/eric.jpg",
  "/mayeV2.jpg",
  "/janrey.jpg",
  "/bboy.jpg",
  "/yanyan.jpg"
]
const people = [
  {
    id: 1,
    username: "Eric James Dali-on",
    gender: "Male",
    description: "Ako po si Eric na naniniwala sa kasabihang, walang imposible kung gusto mong abutin ang iyong pangarap.",
    votes: 1786,
    scores: 73,
    rates: 4.7,
    imgUrl: images[0]
  },
  {
    id: 2,
    username: "Mariel Dalion",
    gender: "Female",
    description: "Ako po si Mariel Joyce Dalion na naniniwala sa kasabihang, mahalin mo lang siya.",
    votes: 1572,
    scores: 40,
    rates: 4.8,
    imgUrl: images[1]
  },
  {
    id: 3,
    username: "John Rey Maturan",
    gender: "Male",
    description: "Pogi lang ako men, gengeng yern?!",
    votes: 992,
    scores: 87,
    rates: 4.8,
    imgUrl: images[2]
  },
  {
    id: 4,
    username: "John Mervin Poldo",
    gender: "Male",
    description: "Editor lang",
    votes: 1094,
    scores: 24,
    rates: 4.3,
    imgUrl: images[3]
  },
  {
    id: 5,
    username: "Marianne Dalion",
    gender: "Female",
    description: "Maganda lang",
    votes: 1094,
    scores: 122,
    rates: 5,
    imgUrl: images[4]
  }
]
let voted = false;
let heVotesTo = null;

route.get("/get_users", (req, res) => {
  res.json({
    users: people,
    didUserVote: voted,
    heVotesTo
  });
});

route.put("/vote_user/:id", (req, res) => {
  const userID = Number(req.params.id);
  const person = people[userID];

  if (voted) {
    return res.status(429).json({
      message: "You already voted"
    });
  }
  
  if (!person) {
    return res.status(404).json({
      message: "This person is not exist"
    });
  }

  voted = true;
  person.votes ++;
  heVotesTo = userID;
  return res.json({
    username: person.username,
    userVotes: person.votes,
    didUserVote: voted,
    heVotesTo
  })
});

module.exports = route;