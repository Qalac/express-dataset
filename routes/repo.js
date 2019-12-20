var express = require('express');
var router = express.Router();
var repoController = require('../controllers/repo')

// Routes related to event
router.get('/get', repoController.getAllRepos)
router.post('/create', repoController.createRepo)

module.exports = router;