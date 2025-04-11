const asyncHandler = require("express-async-handler")
const slugify = require('slugify')
const Album = require("../models/album.model")


const createAndUploadAlbum = asyncHandler(async (req, res) => {
    if (!req.body.title) throw new Error("Missing title");
    if (!req.files || !req.files.album) throw new Error("Missing album file");

    req.body.slugify = slugify(req.body.title, { lower: true, strict: true });

    req.body.coverImageURL = req.files.album[0].path;

    const newAlbum = await Album.create(req.body);

    return res.status(201).json({
        success: newAlbum ? true : false,
        data: newAlbum ? newAlbum : 'Cannot create and upload Album',
    });
});
const getAlbums = asyncHandler(async (req, res) => {
    const queries = { ...req.query };
    const excludeFields = ['limit', 'page', 'sort', 'fields'];
    excludeFields.forEach((field) => delete queries[field]);


    // $gte=500
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (matchedEl) => `$${matchedEl}`);
    const queryObject = JSON.parse(queryString);

    let queryCommand = Album.find(queryObject);

    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        queryCommand = queryCommand.sort(sortBy);
    } else {
        queryCommand = queryCommand.sort('-createdAt');
    }

    if (req.query.fields) {
        const fields = req.query.fields.split(',').map((field) => field.trim());
        queryCommand = queryCommand.select(fields);
    }

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    if (page < 1 || limit < 1) {
        return res.status(400).json({
            success: false,
            message: 'Page and limit must be positive numbers',
        });
    }

    queryCommand = queryCommand.skip(skip).limit(limit);

    try {
        const albums = await queryCommand.exec();
        const counts = await Album.countDocuments(queryObject);

        res.status(200).json({
            success: albums.length > 0,
            total: albums.length,
            counts,
            data: albums.length > 0 ? albums : 'No albums found',
        });
    } catch (err) {
        console.error("Album query error:", err);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: err.message,
        });
    }
});

const getAlbumById = asyncHandler(async (req, res) => {
    const { aid } = req.params;
    const album = await Album.findById(aid);
    return res.status(200).json({
        success: album ? true : false,
        data: album ? album : 'Cannot get Album',
    });
})

const updateAlbum = asyncHandler(async (req, res) => {
    const { aid } = req.params;
    if (Object.keys(req.body).length === 0 && (!req.files || Object.keys(req.files).length === 0)) {
        throw new Error("Missing input");
    }
    if (req.body.title) {
        req.body.slugify = slugify(req.body.title, { lower: true, strict: true });
    }
    if (req.files && req.files.album) {
        req.body.coverImage = req.files.album[0].path;
    }

    const updatedAlbum = await Album.findByIdAndUpdate(aid, req.body, { new: true });
    return res.status(200).json({
        success: updatedAlbum ? true : false,
        data: updatedAlbum ? updatedAlbum : 'Cannot update Album',
    });
});
const deleteAlbum = asyncHandler(async (req, res) => {
    const { aid } = req.params
    const deletedAlbum = await Album.findByIdAndDelete(aid)
    return res.status(200).json({
        success: deletedAlbum ? true : false,
        data: deletedAlbum ? deletedAlbum : 'Cannot delete album'
    })
})
const addSongToAlbum = asyncHandler(async (req, res) => {
    const { aid } = req.params
    console.log(aid);
    const songsArray = req.body.songs?.split(',');
    if (!songsArray) throw new Error("Invalid songs array")
    const updatedAlbum = await Album.findByIdAndUpdate(aid, { $push: { songs: { $each: songsArray } } }, { new: true })
    return res.status(200).json({
        success: updatedAlbum ? true : false,
        data: updatedAlbum ? updatedAlbum : 'Cannot add songs to album'
    })
})

const addGenreToAlbum = asyncHandler(async (req, res) => {
    const { aid } = req.params
    const genreId = req.body.genre
    if (!genreId) throw new Error("Invalid Genre")
    const updatedAlbum = await Album.findByIdAndUpdate(aid, { $push: { genre: genreId } }, { new: true })
    return res.status(200).json({
        success: updatedAlbum ? true : false,
        data: updatedAlbum ? updatedAlbum : 'Cannot add genre to album'
    })
})
module.exports = {
    createAndUploadAlbum,
    getAlbums,
    getAlbumById,
    updateAlbum,
    deleteAlbum,
    addSongToAlbum,
    addGenreToAlbum
}