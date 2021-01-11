const express = require("express");
const server = express();
const Users = require("./users-model");

server.use(express.json());

server.get("/api/users", (req, res) => {
  Users.findAll()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  Users.findById(id)
    .then(user => {
      if (!user) {
        res.status(404).json({ message: `User with id ${id} not found` });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  Users.delete(id)
    .then(deleted => {
      if (!deleted) {
        res.status(404).json({ message: `User with id ${id} not found` });
      } else {
        res.status(200).json(deleted);
      }
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

module.exports = server;
