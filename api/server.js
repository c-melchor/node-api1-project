const express = require("express");
const server = express();
const Users = require("./users-model");

server.use(express.json());

server.get("/api/users", (req, res) => {
  Users.findAll()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(() => {
      res
        .status(500)
        .json({
          errorMessage: "The users information could not be retrieved."
        });
    });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  Users.findById(id)
    .then(user => {
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ errorMessage: "The user information could not be retrieved." });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  Users.delete(id)
    .then(deleted => {
      if (!deleted) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.status(200).json(deleted);
      }
    })
    .catch(() => {
      res.status(500).json({ errorMessage: "The user could not be removed" });
    });
});

server.post("/api/users", async (req, res) => {
  const user = req.body;
  if (!user.name || !user.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    try {
      const newlyMadeUser = await Users.create(user);
      res.status(201).json(newlyMadeUser);
    } catch (error) {
      res
        .status(500)
        .json({
          errorMessage:
            "There was an error while saving the user to the database"
        });
    }
  }
});

server.put("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  if (!changes.name || !changes.bio || changes.id === undefined) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    try {
      const edited = await Users.update(id, changes);
      if (!edited) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.status(200).json(edited);
      }
    } catch (error) {
      res
        .status(500)
        .json({ errorMessage: "The user information could not be modified." });
    }
  }
});
module.exports = server;
