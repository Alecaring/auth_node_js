const express   = require('express');
const router    = express.Router();

const RegisterController = require('../Controllers/registerController');

// router.get('/all', (request, response) => {
//     response.send(` <h1>loggato</h1> `)
// });

router.post('/register', RegisterController.createUser);
router.get('/all-json', RegisterController.getAllUsers);
router.get('/request', RegisterController.request);

module.exports = router;