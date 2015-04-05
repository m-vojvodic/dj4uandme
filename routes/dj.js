var mongoose = require('mongoose');
var Dj = require('../models/dj.js');
var Track = require('../models/track.js');

module.exports.createDj = function(req, res) {
    var dj = new Dj;

    // TODO: generate random string
    dj.dj_id = "abcd";

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
