const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    slugify: {
        type: String,
        unique: true
    },
    songs: [{
        type: mongoose.Types.ObjectId,
        ref: 'Song'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Genre', genreSchema);
