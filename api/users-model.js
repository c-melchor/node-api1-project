const shortid = require("shortid");

let users = [
  {
    id: shortid.generate(),
    name: "Christina",
    bio: "Student at Lambda trying to learn everything at once"
  },
  {
    id: shortid.generate(),
    name: "Andrew",
    bio: "Software Engineer at Saferide"
  }
];

module.exports = {
  findAll() {
    return Promise.resolve(users);
  },
  findById(id) {
    const user = users.find(u => u.id === id);
    return Promise.resolve(user);
  },
  delete(id) {
    const user = users.find(user => user.id === id);
    if (!user) return Promise.resolve(null);

    users = users.filter(u => u.id !== id);
    return Promise.resolve(user);
  },
  create({ name, bio }) {
    const newUser = { id: shortid.generate(), name: name, bio: bio };
    users.push(newUser);
    return Promise.resolve(newUser);
  },

  update(id, changes) {
    const user = users.find(user => user.id === id);
    if (!user) return Promise.resolve(null);

    const editedUser = { ...changes, id };
    users = users.map(u => (u.id === id ? editedUser : u));
    return Promise.resolve(editedUser);
  }
};