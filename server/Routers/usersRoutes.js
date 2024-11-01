const express   = require('express');
const RegisterController = require('../Controllers/registerController');
const router    = express.Router();

// router.get('/', (request, response) => {
//     response.send(` <h1>loggato</h1> `)
// });

router.post('/register', RegisterController.createUser);

module.exports = router;