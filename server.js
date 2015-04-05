var mongoose = require('mongoose');
var restify = require('restify');

mongoose.connect('mongodb://localhost:27017/dju');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log('Server connected to MongoDB');
});

var server = restify.createServer();

server.use(restify.bodyParser());

// Set content type
server.pre(function(req, res, next) {
    res.setHeader('content-type', 'application/json');
    return next();
});

server.get('/', function(req, res) {
    res.end('');
});

// Routes
var dj = require('./routes/dj.js');
var track = require('./routes/track.js');

// dj routes
server.post('/dj/', dj.createDj);
server.del('/dj/:dj_id', dj.deleteDj);

// track routes
server.get('/track/:dj_id', track.retrieveTracks);
server.post('/track/', track.addTrack);
server.put('/track/:track_id', track.upvoteTrack);
server.del('/track/:track_id', track.deleteTrack);

// start server
server.listen(8000, function(){
    console.log('%s listening at %s', server.name, server.url);
});
