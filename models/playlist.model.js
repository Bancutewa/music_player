const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User', // Người tạo playlist
        required: true
    },
    songs: [{
        type: mongoose.Types.ObjectId,
        ref: 'Song' // Danh sách bài hát trong playlist
    }],
    isPublic: {
        type: Boolean,
        default: true // Public hoặc private playlist
    }
}, { timestamps: true });

module.exports = mongoose.model('Playlist', playlistSchema);
