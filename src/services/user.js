/**
 * The user service contains a method for authenticating user credentials and returning a JWT token,
 * and a method for getting all users in the application.
 **/
/* eslint no-unused-vars: 0 */
const config = require("../../config.json");
const jwt = require("jsonwebtoken");

// users hardcoded for simplicity, store in a db for production applications
const users = [
  {
    id: 1,
    username: "test",
    password: "test",
    firstName: "Test",
    lastName: "User"
  }, 
  {
    id: 2,
    username: "test2",
    password: "test2",
    firstName: "Test2",
    lastName: "User2"
  }
];

async function authenticate({ username, password }) {
  console.log(username, password, "------------------sasa as adasd -as dasd ------");
  return new Promise((resolve, reject) => {
    const user = users.find(
      u => u.username === username && u.password === password
    );
    if (user) {
      const token = jwt.sign({ sub: user.id }, config.secret);
      const { password, ...userWithoutPassword } = user;
        resolve({
          ...userWithoutPassword,
          token
        });
    } else {
      reject("user not exists");
    }
  });
}

async function getAll() {
  return new Promise((resolve, reject) => {
    resolve(
      users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
      })
    );
  });  
}

module.exports = {
  authenticate,
  getAll
};
