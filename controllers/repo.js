const datastore = require('../node_modules/nedb')
var repoDb = new datastore({ filename: 'db/repo.db', autoload: true })

var createRepo = (req, res) => {
    var newRepo = {
        name: req.body.name,
        url: req.body.url
    }
    repoDb.insert(newRepo, function(err, doc) {
        res.send(doc);
    });
};

var getAllRepos = (req, res) => {
    repoDb.find({}, function(err, doc){
        res.send(doc);
    });
};

module.exports = {
    createRepo: createRepo,
    repoDb: repoDb,
    getAllRepos: getAllRepos
}