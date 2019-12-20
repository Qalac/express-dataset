var express = require('express');
var router = express.Router();
var eventController = require('../controllers/events');


router.get('/', eventController.getAllEvents)
router.post('/', eventController.addEvent)
router.get('/actors/:actorID', eventController.getByActor)
// Routes related to event


module.exports = router;