const Song = require("../models/song.model")
const Genre = require("../models/genre.model")
const asyncHandler = require("express-async-handler")
const slugify = require('slugify')
const cloudinary = require('cloudinary').v2;




const getAllSongs = asyncHandler(async (req, res) => {
    // Copy query from req.query
    const queries = { ...req.query };

    // Remove fields not used for filtering
    const excludeFields = ['limit', 'page', 'sort', 'fields'];
    excludeFields.forEach((field) => delete queries[field]);

    // Convert comparison operators (gte, gt, lt, lte) to MongoDB syntax
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (matchedEl) => `$${matchedEl}`);
    let queryObject = JSON.parse(queryString);

    if (req.query.title) {
        queryObject.title = {
            $regex: req.query.title,
            $options: 'i'
        };
    }

    let queryCommand = Song.find(queryObject).populate('artist', 'title').populate('genre', 'name');;

    // Sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        queryCommand = queryCommand.sort(sortBy);
    } else {
        queryCommand = queryCommand.sort('-createdAt');
    }

    // Field selection
    if (req.query.fields) {
        const fields = req.query.fields.split(',').map((field) => field.trim());
        queryCommand = queryCommand.select(fields);
    }

    // Pagination
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

    // Execute query
    try {
        const songs = await queryCommand.exec();
        const counts = await Song.countDocuments(queryObject);

        res.status(200).json({
            success: songs.length > 0,
            total: songs.length,
            counts,
            data: songs.length > 0 ? songs : 'No songs found',
        });
    } catch (err) {
        console.error("Song query error:", err);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: err.message,
        });
    }
});
const createAndUploadSong = asyncHandler(async (req, res) => {
    if (!req.body.title) throw new Error("Missing title");
    if (!req.files || !req.files.song) throw new Error("Missing song file");

    const slug = slugify(req.body.title, { lower: true, strict: true });
    req.body.slugify = slug;
    req.body.url = req.files.song[0].path;

    if (req.files.cover) {
        req.body.coverImage = req.files.cover[0].path;
    }

    let genreIds = [];
    if (req.body.genre) {
        genreIds = req.body.genre.split(",").map((id) => id.trim());
        req.body.genre = genreIds;
    }

    const newSong = await Song.create(req.body);

    if (genreIds.length > 0) {
        await Genre.updateMany(
            { _id: { $in: genreIds } },
            { $addToSet: { songs: newSong._id } }
        );
    }

    return res.status(201).json({
        success: newSong ? true : false,
        data: newSong ? newSong : "Cannot create and upload Song",
    });
});

const updateSong = asyncHandler(async (req, res) => {
    const { sid } = req.params;
    if (
        Object.keys(req.body).length === 0 &&
        (!req.files || Object.keys(req.files).length === 0)
    ) {
        throw new Error("Missing input");
    }

    if (req.body.title) {
        req.body.slugify = slugify(req.body.title, { lower: true, strict: true });
    }
    if (req.files && req.files.song) {
        req.body.url = req.files.song[0].path;
    }
    if (req.files && req.files.cover) {
        req.body.coverImage = req.files.cover[0].path;
    }

    let newGenreIds = [];
    if (req.body.genre) {
        newGenreIds = req.body.genre.split(",").map((id) => id.trim());
        req.body.genre = newGenreIds;
    }

    const oldSong = await Song.findById(sid);
    const oldGenreIds = oldSong.genre || [];

    const updatedSong = await Song.findByIdAndUpdate(sid, req.body, { new: true });


    if (newGenreIds.length > 0 || oldGenreIds.length > 0) {
        const genresToRemove = oldGenreIds.filter((id) => !newGenreIds.includes(id));
        if (genresToRemove.length > 0) {
            await Genre.updateMany(
                { _id: { $in: genresToRemove } },
                { $pull: { songs: sid } }
            );
        }

        if (newGenreIds.length > 0) {
            await Genre.updateMany(
                { _id: { $in: newGenreIds } },
                { $addToSet: { songs: sid } }
            );
        }
    }

    return res.status(200).json({
        success: updatedSong ? true : false,
        data: updatedSong ? updatedSong : "Cannot update Song",
    });
});

const uploadMusic = asyncHandler(async (req, res) => {
    const { sid } = req.params;
    if (!req.file) throw new Error("Missing file");
    const song = await Song.findById(sid);
    const fileUrl = req.file.path;

    const response = await Song.findByIdAndUpdate(sid, { url: fileUrl }, { new: true });

    return res.status(200).json({
        status: response ? true : false,
        updatedSong: response ? response : 'Cannot update song file'
    });
}); ``

const getSong = asyncHandler(async (req, res) => {
    const { sid } = req.params
    const song = await Song.findById(sid).populate('artist', 'title').populate('genre', 'name');
    return res.status(200).json({
        success: song ? true : false,
        data: song ? song : 'Cannot get Song'
    })
})


const deleteSong = asyncHandler(async (req, res) => {
    const { sid } = req.params
    const deletedSong = await Song.findByIdAndDelete(sid)
    return res.status(200).json({
        success: deletedSong ? true : false,
        data: deletedSong ? deletedSong : 'Cannot delete Song'
    })
})




module.exports = {
    getAllSongs,
    getSong,
    createAndUploadSong,
    updateSong,
    deleteSong,
    uploadMusic
}
