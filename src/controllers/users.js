const express = require('express'),
  router = express.Router(),
  userService = require('../services/user');
  
// routes: 
// api/users/authenticate  POST
// api/users/              GET
router.post('/authenticate', authenticate);
router.get('/', getAll);

module.exports = router;

function authenticate(req, res, next) {
  // we receive a json like { userName, pass }
  console.log("bodyyyyyy",req.body);
    userService.authenticate(req.body)
        .then(user => user ? res.status(200).json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}