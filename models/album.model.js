const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: mongoose.Types.ObjectId,
        ref: 'Artist', // Liên kết với nghệ sĩ
        required: true
    },
    genre: {
        type: mongoose.Types.ObjectId,
        ref: 'Genre', // Liên kết với thể loại nhạc
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    coverImage: {
        type: String // URL ảnh album
    },
    songs: [{
        type: mongoose.Types.ObjectId,
        ref: 'Song' // Danh sách bài hát trong album
    }]
}, { timestamps: true });

module.exports = mongoose.model('Album', albumSchema);
