var mongoose = require('mongoose');

var djSchema = mongoose.Schema({
    dj_id : { type: String }
}),
Dj = mongoose.model('Dj', djSchema);

module.exports = Dj;
