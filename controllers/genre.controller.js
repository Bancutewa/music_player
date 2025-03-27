const asyncHandler = require("express-async-handler")
const slugify = require('slugify')
const Genre = require("../models/genre.model")
const Song = require("../models/song.model")

const createGenre = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error("Missing input")
    if (req.body && req.body.name) req.body.slugify = slugify(req.body.name)
    const newGenre = await Genre.create(req.body)
    return res.status(201).json({
        success: newGenre ? true : false,
        data: newGenre ? newGenre : 'Cannot create Genre'
    })
})

const getGenres = asyncHandler(async (req, res) => {
    const queries = { ...req.query };

    const excludeFields = ['limit', 'page', 'sort', 'fields'];
    excludeFields.forEach((field) => delete queries[field]);

    // Chuyển đổi các toán tử so sánh (gte, gt, lt, lte) thành cú pháp MongoDB
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (matchedEl) => `$${matchedEl}`);
    const queryObject = JSON.parse(queryString);

    let queryCommand = Genre.find(queryObject);

    //(sort)
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        queryCommand = queryCommand.sort(sortBy);
    } else {
        queryCommand = queryCommand.sort('-createdAt');
    }

    // (fields)
    if (req.query.fields) {
        const fields = req.query.fields.split(',').map((field) => field.trim());
        queryCommand = queryCommand.select(fields);
    }

    // (pagination)
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

    // Thực thi truy vấn
    try {
        const genres = await queryCommand.exec();
        const counts = await Genre.countDocuments(queryObject);

        res.status(200).json({
            success: genres.length > 0,
            total: genres.length,
            counts,
            data: genres.length > 0 ? genres : 'No genres found',
        });
    } catch (err) {
        console.error("Genre query error:", err);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: err.message,
        });
    }
});
const getGenreById = asyncHandler(async (req, res) => {
    const { gid } = req.params
    const genre = await Genre.findById(gid)
    return res.status(200).json({
        success: genre ? true : false,
        data: genre ? genre : 'Cannot get Genre'
    })
})

const updateGenre = asyncHandler(async (req, res) => {
    const { gid } = req.params
    if (Object.keys(req.body).length === 0) throw new Error("Missing input")
    if (req.body && req.body.name) req.body.slugify = slugify(req.body.name)
    const updatedGenre = await Genre.findByIdAndUpdate(gid, req.body, { new: true })
    return res.status(200).json({
        success: updatedGenre ? true : false,
        data: updatedGenre ? updatedGenre : 'Cannot update Genre'
    })
})
const deleteGenre = asyncHandler(async (req, res) => {
    const { gid } = req.params
    const deletedGenre = await Genre.findByIdAndDelete(gid)
    return res.status(200).json({
        success: deletedGenre ? true : false,
        data: deletedGenre ? deletedGenre : 'Cannot delete Genre'
    })
})
const addSongToGenre = asyncHandler(async (req, res) => {
    const { gid } = req.params;
    const songsArray = req.body.songs?.split(',') || [];

    if (!songsArray.length) throw new Error("Invalid songs array");

    // Cập nhật Genre: Thêm bài hát vào danh sách songs
    const updatedGenre = await Genre.findByIdAndUpdate(
        gid,
        { $push: { songs: { $each: songsArray } } },
        { new: true }
    );

    if (!updatedGenre) throw new Error("Cannot add songs to Genre");

    // Cập nhật từng Song: Gán giá trị `genre` là `gid`
    await Song.updateMany(
        { _id: { $in: songsArray } },
        { $addToSet: { genre: gid } },
        { new: true }
    );
    return res.status(200).json({
        success: true,
        data: updatedGenre
    });
});

module.exports = {
    createGenre,
    getGenres,
    getGenreById,
    updateGenre,
    deleteGenre,
    addSongToGenre

}