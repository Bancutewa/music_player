const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const Song = require('../models/song.model');
const { default: slugify } = require('slugify');
const Album = require('../models/album.model');

// Cấu hình Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});


const songStorage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        const song = await Song.findById(req.params.sid);
        const title = req.body.title || song?.title;
        if (!title) throw new Error("Missing title");

        const fileName = slugify(title, { lower: true, strict: true });
        return {
            folder: 'music_player/songs',
            public_id: fileName,
            resource_type: 'auto',
        };
    },
});


const albumStorage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        const album = await Album.findById(req.params.aid);
        const title = req.body.title || album?.title;
        if (!title) throw new Error("Missing title");

        const fileName = slugify(title, { lower: true, strict: true });
        return {
            folder: 'music_player/albums',
            public_id: fileName,
            resource_type: 'auto',
        };
    }
});

// Middleware upload
const uploadSong = multer({ storage: songStorage });
const uploadAlbum = multer({ storage: albumStorage });

module.exports = { uploadSong, uploadAlbum };