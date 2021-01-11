const shortid = require("shortid");

const users = [
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
  }
};
