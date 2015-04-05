var mongoose = require('mongoose');

var trackSchema = mongoose.Schema({
    dj_id : { type: String },
    track_name : { type: String },
    artist_name : { type: String },
    url : { type: String },
    stream_url : { type: String },
    votes : { type: Number }
}),
Track = mongoose.model('Track', trackSchema);

module.exports = Track;
