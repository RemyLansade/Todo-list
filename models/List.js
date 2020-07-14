const mongoose = require('mongoose');

const listSchema = {
    name: String,
    items: [{
        name: String
    }]
}

const List = mongoose.model('List', listSchema);

module.exports = List;