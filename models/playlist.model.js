const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slugify: {
        type: String,
        unique: true
    },
    coverImageURL: {
        type: String
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User', // Người tạo playlist
        required: true
    },
    songs: [{
        type: mongoose.Types.ObjectId,
        ref: 'Song'
    }],
    isPublic: {
        type: Boolean,
        default: true // Public hoặc private playlist
    }
}, { timestamps: true });

module.exports = mongoose.model('Playlist', playlistSchema);
