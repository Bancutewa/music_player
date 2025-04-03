const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: String
    },
    slugify: {
        type: String,
        unique: true
    },
    genres: [{
        type: mongoose.Types.ObjectId,
        ref: 'Genre'
    }],
    albums: [{
        type: mongoose.Types.ObjectId,
        ref: 'Album'
    }],
    songs: [{
        type: mongoose.Types.ObjectId,
        ref: 'Song'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Artist', artistSchema);
