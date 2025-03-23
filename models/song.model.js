const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: mongoose.Types.ObjectId,
        ref: 'Artist', // Liên kết với nghệ sĩ
        // required: true
    },
    album: {
        type: mongoose.Types.ObjectId,
        ref: 'Album' // Liên kết với album
    },
    genre: {
        type: mongoose.Types.ObjectId,
        ref: 'Genre', // Liên kết với thể loại nhạc
        // required: true
    },
    duration: {
        type: String, // Lưu định dạng "mm:ss"
        // required: true
    },
    slugify: {
        type: String,
    },

    url: {
        type: String,
        // required: true // Đường dẫn file nhạc
    },
    coverImage: {
        type: String // Ảnh bìa bài hát
    },
    likes: [{
        type: mongoose.Types.ObjectId,
        ref: 'User' // Người dùng thích bài hát
    }],
    comments: [{
        user: { type: mongoose.Types.ObjectId, ref: 'User' },
        text: { type: String },
        createdAt: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Song', songSchema);
