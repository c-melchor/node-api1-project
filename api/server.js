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

server.post("/api/users", async (req, res) => {
  const user = req.body;
  if (!user.name || !user.bio) {
    res.status(400).json({ message: "Name and Bio required" });
  } else {
    try {
      const newlyMadeUser = await Users.create(user);
      res.status(201).json(newlyMadeUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
});

server.put("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  if (!changes.name || !changes.bio || changes.id === undefined) {
    res.status(400).json({ message: "all fields required" });
  } else {
    try {
      const edited = await Users.update(id, changes);
      if (!edited) {
        res.status(404).json({ message: `User with id ${id} not found` });
      } else {
        res.status(200).json(edited);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
});
module.exports = server;
