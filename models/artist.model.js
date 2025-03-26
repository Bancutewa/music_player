const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    bio: {
        type: String
    },
    avatar: {
        type: String
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
