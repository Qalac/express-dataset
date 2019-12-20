const datastore = require('../node_modules/nedb')

var actorDb = new datastore({ filename: 'db/actors.db', autoload: true })

var updateActor = (req, res) => {
	var actor = {
		id: req.body.id,
		avatarUrl: req.body.avatarUrl
	};
	actorDb.update({ _id: actor.id }, { $set: { AvatarUrl: actor.avatarUrl }}, {multi: false}, function(err, numReplaced, affectedDocument){
		if (numReplaced < 1){
			res.status(404).send("user does not exist")
		}
		else{
			res.status(200).send('successfully updated')
		}
	});
	
};

var getStreak = (req, res) => {
	
};

var createActor = (req, res) => {
	var newActor = {
		log: req.body.log,
		AvatarUrl: req.body.avatarUrl
	};
	actorDb.insert(newActor, function(err, doc) {
		res.send(doc)
	});
}

var getAllActors = (req, res) => {
	actorDb.find({}).sort({log: 1}).exec(function(err, docs){
		res.status(200).send(docs);
	});
};

module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak,
	createActor: createActor,
	actorDb, actorDb
};

