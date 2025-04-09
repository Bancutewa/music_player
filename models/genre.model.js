const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    slugify: {
        type: String,
        unique: true
    },
    coverImage: {
        type: String,
        default: 'https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko='
    },
    songs: [{
        type: mongoose.Types.ObjectId,
        ref: 'Song'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Genre', genreSchema);
