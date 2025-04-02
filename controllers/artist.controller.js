const Artist = require('../models/artist.model');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

// Get all artists
const getAllArtists = asyncHandler(async (req, res) => {
    const queries = { ...req.query };
    const excludeFields = ['limit', 'page', 'sort', 'fields'];
    excludeFields.forEach((field) => delete queries[field]);

    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (matchedEl) => `$${matchedEl}`);
    const queryObject = JSON.parse(queryString);

    let queryCommand = Artist.find(queryObject);

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
        const artists = await queryCommand.exec();
        const counts = await Artist.countDocuments(queryObject);

        res.status(200).json({
            success: artists.length > 0,
            total: artists.length,
            counts,
            data: artists.length > 0 ? artists : 'No artists found',
        });
    } catch (err) {
        console.error("Artist query error:", err);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: err.message,
        });
    }
});

// Get a single artist
const getArtist = asyncHandler(async (req, res) => {
    const { aid } = req.params;
    const artist = await Artist.findById(aid);
    return res.status(200).json({
        success: artist ? true : false,
        data: artist ? artist : 'Cannot get Artist',
    });
});

// Create and upload artist
const createAndUploadArtist = asyncHandler(async (req, res) => {
    if (!req.body.title) throw new Error("Missing title");
    if (!req.files || !req.files.artist) throw new Error("Missing artist avatar");

    const slug = slugify(req.body.title, { lower: true, strict: true });
    req.body.slugify = slug;

    req.body.avatar = req.files.artist[0].path;

    const newArtist = await Artist.create(req.body);

    return res.status(201).json({
        success: newArtist ? true : false,
        data: newArtist ? newArtist : 'Cannot create and upload Artist',
    });
});

// Update artist
const updateArtist = asyncHandler(async (req, res) => {
    const { aid } = req.params;
    if (Object.keys(req.body).length === 0 && (!req.files || Object.keys(req.files).length === 0)) {
        throw new Error("Missing input");
    }
    if (req.body.title) {
        req.body.slugify = slugify(req.body.title, { lower: true, strict: true });
    }
    if (req.files && req.files.artist) {
        req.body.avatar = req.files.artist[0].path;
    }

    const updatedArtist = await Artist.findByIdAndUpdate(aid, req.body, { new: true });
    return res.status(200).json({
        success: updatedArtist ? true : false,
        data: updatedArtist ? updatedArtist : 'Cannot update Artist',
    });
});

// Delete artist
const deleteArtist = asyncHandler(async (req, res) => {
    const { aid } = req.params;
    const deletedArtist = await Artist.findByIdAndDelete(aid);
    return res.status(200).json({
        success: deletedArtist ? true : false,
        data: deletedArtist ? deletedArtist : 'Cannot delete Artist',
    });
});

const addAlbumToArtist = asyncHandler(async (req, res) => {
    const { aid } = req.params;
    const albumsArray = req.body.albums?.split(',');
    if (!albumsArray) throw new Error("Invalid albums array");
    const updatedArtist = await Artist.findByIdAndUpdate(aid, { $push: { albums: { $each: albumsArray } } }, { new: true });
    return res.status(200).json({
        success: updatedArtist ? true : false,
        data: updatedArtist ? updatedArtist : 'Cannot add albums to artist',
    });
})
const addSongToArtist = asyncHandler(async (req, res) => {
    const { aid } = req.params;
    const songsArray = req.body.songs?.split(',');
    if (!songsArray) throw new Error("Invalid songs array");
    const updatedArtist = await Artist.findByIdAndUpdate(aid, { $push: { songs: { $each: songsArray } } }, { new: true });
    return res.status(200).json({
        success: updatedArtist ? true : false,
        data: updatedArtist ? updatedArtist : 'Cannot add songs to artist',
    });
});
const addGenreToArtist = asyncHandler(async (req, res) => {
    const { aid } = req.params;
    const genreId = req.body.genre;
    if (!genreId) throw new Error("Invalid Genre");
    const updatedArtist = await Artist.findByIdAndUpdate(aid, { $push: { genres: genreId } }, { new: true });
    return res.status(200).json({
        success: updatedArtist ? true : false,
        data: updatedArtist ? updatedArtist : 'Cannot add genre to artist',
    });
});
const removeAlbumFromArtist = asyncHandler(async (req, res) => {
    const { aid } = req.params;
    const albumsArray = req.body.albums?.split(',');
    if (!albumsArray) throw new Error("Invalid albums array");
    const updatedArtist = await Artist.findByIdAndUpdate(aid, { $pull: { albums: { $in: albumsArray } } }, { new: true });
    return res.status(200).json({
        success: updatedArtist ? true : false,
        data: updatedArtist ? updatedArtist : 'Cannot remove albums from artist',
    });
})

const removeSongFromArtist = asyncHandler(async (req, res) => {
    const { aid } = req.params;
    const songsArray = req.body.songs?.split(',');
    if (!songsArray) throw new Error("Invalid songs array");
    const updatedArtist = await Artist.findByIdAndUpdate(aid, { $pull: { songs: { $in: songsArray } } }, { new: true });
    return res.status(200).json({
        success: updatedArtist ? true : false,
        data: updatedArtist ? updatedArtist : 'Cannot remove songs from artist',
    });
});

const removeGenreFromArtist = asyncHandler(async (req, res) => {
    const { aid } = req.params;
    const genreId = req.body.genre;
    if (!genreId) throw new Error("Invalid Genre");
    const updatedArtist = await Artist.findByIdAndUpdate(aid, { $pull: { genres: genreId } }, { new: true });
    return res.status(200).json({
        success: updatedArtist ? true : false,
        data: updatedArtist ? updatedArtist : 'Cannot remove genre from artist',
    });
});

module.exports = {
    getAllArtists,
    getArtist,
    createAndUploadArtist,
    updateArtist,
    deleteArtist,
    addAlbumToArtist,
    addSongToArtist,
    addGenreToArtist,
    removeAlbumFromArtist,
    removeSongFromArtist,
    removeGenreFromArtist,
};