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
        type: String // URL ảnh nghệ sĩ
    },
    genres: [{
        type: mongoose.Types.ObjectId,
        ref: 'Genre' // Liên kết với thể loại nhạc
    }],
    albums: [{
        type: mongoose.Types.ObjectId,
        ref: 'Album' // Liên kết với album
    }],
    songs: [{
        type: mongoose.Types.ObjectId,
        ref: 'Song' // Liên kết với bài hát
    }]
}, { timestamps: true });

module.exports = mongoose.model('Artist', artistSchema);
