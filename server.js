var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/dju');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log('Server connected to MongoDB');
});

var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/'));

var port = process.env.PORT || 3000;
var router = express.Router();

router.get('/', function(req, res) {
   res.json({ message: 'I AM DJ.' });
});

// Routes
var dj = require('./routes/dj.js');
var track = require('./routes/track.js');

// dj routes
router.route('/dj/')
    .post(dj.createDj);

router.route('/dj/:dj_id')
    .delete(dj.deleteDj);

// track routes
router.route('/track/:dj_id')
    .get(track.retrieveTracks);

router.route('/track/')
    .post(track.addTrack);

router.route('/track/:track_id')
    .put(track.upvoteTrack)
    .delete(track.deleteTrack);

// start server
app.use('/', router);

app.listen(port);
console.log('Server listening on port: ' + port);
