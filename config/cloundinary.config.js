const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const Song = require('../models/song.model');
const Album = require('../models/album.model');
const Artist = require('../models/artist.model');
const slugify = require('slugify');

// Cấu hình Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

// Cấu hình CloudinaryStorage
const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        const title = req.body.title;
        if (!title) throw new Error("Missing title");
        const slug = slugify(title, { lower: true, strict: true });
        let folder, resource_type;

        switch (file.fieldname) {
            case 'song':
                folder = 'music_player/songs';
                resource_type = 'auto'; // Audio file
                break;
            case 'cover':
                folder = 'music_player/covers';
                resource_type = 'image'; // Image file
                break;
            case 'album':
                folder = 'music_player/albums';
                resource_type = 'image'; // Image file
                break;
            case 'artist':
                folder = 'music_player/artists';
                resource_type = 'image'; // Image file
                break;
            default:
                throw new Error('Invalid file field');
        }

        return {
            folder,
            public_id: slug,
            resource_type,
        };
    },
});

// Middleware upload
const uploadFiles = multer({ storage }).fields([
    { name: 'song', maxCount: 1 },
    { name: 'cover', maxCount: 1 },
    { name: 'album', maxCount: 1 },
    { name: 'artist', maxCount: 1 },
    { name: 'playlist', maxCount: 1 },
]);

module.exports = { uploadFiles };