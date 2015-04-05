var mongoose = require('mongoose');
var Dj = require('../models/dj.js');
var Track = require('../models/track.js');

var generateRandomID = function() {
    var possible_letters = 'abcdefghijklmnopqrstuvwxyz',
        id = "",
        i;

    for(i = 0; i < 4; ++i) {
        id += possible_letters[Math.floor(Math.random() * possible_letters.length)];
    }
    // TODO: Search database to make sure no djs
    return id;
};

module.exports.createDj = function(req, res) {
    var dj = new Dj;

    dj.dj_id = generateRandomID();
    console.log(dj.dj_id);

    dj.save(function(err) {
        if(err)
            res.send(err);
        else
            res.json({ dj_id: dj.dj_id });
    })
};

module.exports.deleteDj = function(req, res) {
    // delete tracks
    Track.remove({ dj_id: req.params.dj_id }, function(err, tracks) {
        for(var track in tracks) {
            Track.remove({ _id: tracks[track]._id }, function(err) {
                if(err)
                    res.send(err);
            });
        }
    });

    // delete dj
    Dj.remove({ dj_id: req.params.dj_id }, function(err){
        if(err)
            res.send(err);
        else
            res.json({ message: 'success' });
    });
};
