var mongoose = require('mongoose');
var Dj = require('../models/dj.js');
var Track = require('../models/track.js');

//server.get('/track/:dj_id', track.retrieveTracks);
module.exports.retrieveTracks = function(req, res) {
    Dj.findOne({ dj_id: req.params.dj_id }, function(err, dj) {
        if(err)
            res.send(err);

        if(!dj) {
            res.send({ message: "failure" });
        }
        else {
            console.log("success: " + dj);
            Track.find({ dj_id: req.params.dj_id }, function(err, tracks) {
                if(err)
                    res.send(err);
                else
                    res.json({ message: "success", tracks: tracks });
            });
        }
    });
};

//server.post('/track/', track.addTrack);
module.exports.addTrack = function(req, res) {
    var track = new Track;

    track.dj_id = req.body.dj_id;
    track.track_name = req.body.track_name;
    track.artist_name = req.body.artist_name;
    track.url = req.body.url;
    track.stream_url = req.body.stream_url;
    track.votes = 0;

    console.log(req.body);

    track.save(function(err) {
        if(err)
            res.send(err);
        else {
            console.log(track);
            res.json({ message: 'success' });
        }
    });
};

//server.put('/track/:track_id', track.upvoteTrack);
module.exports.upvoteTrack = function(req, res) {
    Track.update({ _id: req.params.track_id }, { votes: votes + 1 }, function(err){
        if(err)
            res.send(err);
        else
            res.json({ message: 'success' });
    });
};

//server.del('/track/:track_id', track.deleteTrack);
module.exports.deleteTrack = function(req, res) {
    Track.remove({ _id: req.params.track_id }, function(err) {
        if(err)
            res.send(err);
        else
            res.send({ message: 'success' });
    });
};
