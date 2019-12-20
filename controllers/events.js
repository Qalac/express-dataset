const datastore = require('../node_modules/nedb')
var eventDb = new datastore({ filename: 'db/events.db', autoload: true })
var Actor = require('../controllers/actors')
var Repo = require('../controllers/repo')

var getAllEvents = (req, res) => {
	eventDb.find({}).sort({_id:1}).exec( function(err, doc){
		res.status(200).send(doc)
	});
};

var addEvent = (req, res) => {
	var newEvent = {
		type: req.body.type,
		actor: req.body.actor,
		repo: req.body.repo
	}
	Actor.actorDb.find({log: newEvent.actor}, function(err, doc){
		Repo.repoDb.find({name: newEvent.repo}, function(err, docs){
			var pushEvent = {
				type: newEvent.type,
				actor: doc,
				repo: docs,
				created_at: Date()
			}
			eventDb.insert(pushEvent, function(err, docx){
				res.status(201).send(docx);
			})	
		})
	})
}

var getByActor = (req, res) => {
	var filter = req.params.actorID
	eventDb.find({"actor._id": filter}).sort({_id:1}).exec(function(err, doc){
		if (doc[0] == undefined){
			res.status(404).send('Does not exist')
		}
		else {
			res.status(200).send(doc)
		}
	});
};
var eraseEvents = (req, res) => {
	eventDb.remove({}, {multi: true}, function(err, numRemoved){
		if (numRemoved < 1){
			res.status(404).send('events erased already')
		}
		else{
			res.status(200).send('succesfully erased')
		}
	});

};



module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents,
	eventDb: eventDb
};

