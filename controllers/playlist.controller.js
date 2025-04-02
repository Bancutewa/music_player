const Playlist = require('../models/playlist.model');
const Song = require('../models/song.model');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');


const DEFAULT_COVER_IMAGE = 'https://example.com/default-cover.jpg';
// Get all playlists
const getAllPlaylists = asyncHandler(async (req, res) => {
    const queries = { ...req.query };
    const excludeFields = ['limit', 'page', 'sort', 'fields'];
    excludeFields.forEach((field) => delete queries[field]);

    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (matchedEl) => `$${matchedEl}`);
    const queryObject = JSON.parse(queryString);

    let queryCommand = Playlist.find(queryObject).populate('user', 'email').populate('songs', 'title');

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
        const playlists = await queryCommand.exec();
        const counts = await Playlist.countDocuments(queryObject);

        res.status(200).json({
            success: playlists.length > 0,
            total: playlists.length,
            counts,
            data: playlists.length > 0 ? playlists : 'No playlists found',
        });
    } catch (err) {
        console.error("Playlist query error:", err);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: err.message,
        });
    }
});

// Get a single playlist
const getPlaylist = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    const playlist = await Playlist.findById(pid).populate('user', 'name').populate('songs', 'title');
    return res.status(200).json({
        success: playlist ? true : false,
        data: playlist ? playlist : 'Cannot get Playlist',
    });
});

// Create and upload playlist
const createAndUploadPlaylist = asyncHandler(async (req, res) => {
    if (!req.body.title) throw new Error("Missing title");
    if (!req.body.user) throw new Error("Missing user ID");

    const slug = slugify(req.body.title, { lower: true, strict: true });
    req.body.slugify = slug;

    if (req.files && req.files.cover) {
        req.body.coverImageURL = req.files.cover[0].path;
    } else {
        req.body.coverImageURL = DEFAULT_COVER_IMAGE
    }

    const newPlaylist = await Playlist.create(req.body);

    return res.status(201).json({
        success: newPlaylist ? true : false,
        data: newPlaylist ? newPlaylist : 'Cannot create and upload Playlist',
    });
});

// Update playlist
const updatePlaylist = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    if (Object.keys(req.body).length === 0 && (!req.files || Object.keys(req.files).length === 0)) {
        throw new Error("Missing input");
    }
    if (req.body.title) {
        req.body.slugify = slugify(req.body.title, { lower: true, strict: true });
    }
    if (req.files && req.files.cover) {
        req.body.coverImageURL = req.files.cover[0].path;
    }

    const updatedPlaylist = await Playlist.findByIdAndUpdate(pid, req.body, { new: true });
    return res.status(200).json({
        success: updatedPlaylist ? true : false,
        data: updatedPlaylist ? updatedPlaylist : 'Cannot update Playlist',
    });
});

// Delete playlist
const deletePlaylist = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    const deletedPlaylist = await Playlist.findByIdAndDelete(pid);
    return res.status(200).json({
        success: deletedPlaylist ? true : false,
        data: deletedPlaylist ? deletedPlaylist : 'Cannot delete Playlist',
    });
});

// Add songs to playlist
const addSongsToPlaylist = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    const songsArray = req.body.songs?.split(',');
    if (!songsArray || songsArray.length === 0) throw new Error("Invalid songs array");

    const playlist = await Playlist.findById(pid);
    if (!playlist) {
        return res.status(404).json({
            success: false,
            message: 'Playlist not found',
        });
    }
    if (playlist.coverImageURL === DEFAULT_COVER_IMAGE) {
        const firstSongId = songsArray[0];
        const firstSong = await Song.findById(firstSongId);
        if (firstSong && firstSong.coverImage) {
            playlist.coverImageURL = firstSong.coverImage;
            await playlist.save();
        }
    }

    const updatedPlaylist = await Playlist.findByIdAndUpdate(
        pid,
        { $push: { songs: { $each: songsArray } } },
        { new: true }
    ).populate('songs', 'title coverImage');

    return res.status(200).json({
        success: updatedPlaylist ? true : false,
        data: updatedPlaylist ? updatedPlaylist : 'Cannot add songs to playlist',
    });
});

// Remove songs from playlist
const removeSongsFromPlaylist = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    const songsArray = req.body.songs?.split(',');
    if (!songsArray) throw new Error("Invalid songs array");
    const updatedPlaylist = await Playlist.findByIdAndUpdate(pid, { $pull: { songs: { $in: songsArray } } }, { new: true });
    return res.status(200).json({
        success: updatedPlaylist ? true : false,
        data: updatedPlaylist ? updatedPlaylist : 'Cannot remove songs from playlist',
    });
});

module.exports = {
    getAllPlaylists,
    getPlaylist,
    createAndUploadPlaylist,
    updatePlaylist,
    deletePlaylist,
    addSongsToPlaylist,
    removeSongsFromPlaylist,
};