var express = require('express');
var router = express.Router();
var actorController = require('../controllers/actors')
var eventController = require('../controllers/events')

// Routes related to actor.
router.get('/', actorController.getAllActors)
router.post('/create', actorController.createActor)
router.put('/', actorController.updateActor)
router.get('/streak', actorController.getStreak)


module.exports = router;