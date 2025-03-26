const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: mongoose.Types.ObjectId,
        ref: 'Artist',
        // required: true
    },
    slugify: {
        type: String,
        unique: true
    },
    genre: {
        type: mongoose.Types.ObjectId,
        ref: 'Genre',
        // required: true
    },

    coverImageURL: {
        type: String
    },
    songs: [{
        type: mongoose.Types.ObjectId,
        ref: 'Song'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Album', albumSchema);
