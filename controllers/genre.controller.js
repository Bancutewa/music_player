const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const Genre = require("../models/genre.model");
const Song = require("../models/song.model");

const createGenre = asyncHandler(async (req, res) => {
    if (!req.body.title) throw new Error("Missing title");

    const slug = slugify(req.body.title, { lower: true, strict: true });
    if (!slug) throw new Error("Cannot generate a valid slug from the provided title");

    const exitingGenre = await Genre.findOne({ slugify: slug });
    if (exitingGenre) throw new Error("Genre already exists");

    req.body.slugify = slug;

    if (req.files && req.files.genre) {
        req.body.coverImage = req.files.genre[0].path;
    }

    let songsArray = [];
    if (req.body.songs) {
        try {
            songsArray = req.body.songs
                .split(",")
                .map(id => id.trim())
                .filter(id => id);

            if (!songsArray.length) throw new Error("Invalid songs array");

            const existingSongs = await Song.find({ _id: { $in: songsArray } });
            if (existingSongs.length !== songsArray.length) {
                throw new Error("One or more songs do not exist");
            }
        } catch (error) {
            throw new Error(`Invalid songs input: ${error.message}`);
        }
    }

    const genreData = { ...req.body, songs: songsArray };
    const newGenre = await Genre.create(genreData);

    if (songsArray.length) {
        await Song.updateMany(
            { _id: { $in: songsArray } },
            { $addToSet: { genre: newGenre._id } },
            { new: true }
        );
    }

    return res.status(201).json({
        success: newGenre ? true : false,
        data: newGenre ? newGenre : "Cannot create Genre",
    });
});

const updateGenre = asyncHandler(async (req, res) => {
    const { gid } = req.params;

    if (Object.keys(req.body).length === 0 && (!req.files || Object.keys(req.files).length === 0)) {
        throw new Error("Missing input");
    }

    const updateData = { ...req.body };

    if (req.body.title) {
        updateData.slugify = slugify(req.body.title, { lower: true, strict: true });
    }

    if (req.files && req.files.genre) {
        updateData.coverImage = req.files.genre[0].path;
    }


    if (req.body.songs) {
        const songsArray = req.body.songs.split(",").map(id => id.trim()).filter(id => id);
        console.log("Songs Array:", songsArray);

        if (!songsArray.length) {
            throw new Error("Invalid songs array");
        }


        const existingSongs = await Song.find({ _id: { $in: songsArray } });
        if (existingSongs.length !== songsArray.length) {
            throw new Error("One or more songs do not exist");
        }

        updateData.songs = songsArray;

        await Song.updateMany(
            { _id: { $in: songsArray } },
            { $addToSet: { genre: gid } },
            { new: true }
        );
    }

    const updatedGenre = await Genre.findByIdAndUpdate(gid, updateData, { new: true });

    return res.status(200).json({
        success: updatedGenre ? true : false,
        data: updatedGenre ? updatedGenre : "Cannot update Genre",
    });
});

const addSongToGenre = asyncHandler(async (req, res) => {
    const { gid } = req.params;
    const songsArray = req.body.songs?.split(",").map(id => id.trim()).filter(id => id) || [];

    if (!songsArray.length) throw new Error("Invalid songs array");

    const existingSongs = await Song.find({ _id: { $in: songsArray } });
    if (existingSongs.length !== songsArray.length) {
        throw new Error("One or more songs do not exist");
    }

    const updatedGenre = await Genre.findByIdAndUpdate(
        gid,
        { $push: { songs: { $each: songsArray } } },
        { new: true }
    );

    if (!updatedGenre) throw new Error("Cannot add songs to Genre");

    await Song.updateMany(
        { _id: { $in: songsArray } },
        { $addToSet: { genre: gid } },
        { new: true }
    );

    return res.status(200).json({
        success: true,
        data: updatedGenre,
    });
});

const getGenres = asyncHandler(async (req, res) => {
    const queries = { ...req.query };

    const excludeFields = ["limit", "page", "sort", "fields"];
    excludeFields.forEach((field) => delete queries[field]);

    // Chuyển đổi các toán tử so sánh (gte, gt, lt, lte) thành cú pháp MongoDB
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, (matchedEl) => `$${matchedEl}`);
    const queryObject = JSON.parse(queryString);

    if (req.query.title) {
        queryObject.title = {
            $regex: req.query.title,
            $options: "i",
        };
    }
    let queryCommand = Genre.find(queryObject).populate({
        path: "songs",
        select: "title",
        populate: {
            path: "artist",
            select: "title",
        },
    });

    // Sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        queryCommand = queryCommand.sort(sortBy);
    } else {
        queryCommand = queryCommand.sort("-createdAt");
    }

    // Field selection
    if (req.query.fields) {
        const fields = req.query.fields.split(",").map((field) => field.trim());
        queryCommand = queryCommand.select(fields);
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    if (page < 1 || limit < 1) {
        return res.status(400).json({
            success: false,
            message: "Page and limit must be positive numbers",
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
            data: genres.length > 0 ? genres : "No genres found",
        });
    } catch (err) {
        console.error("Genre query error:", err);
        res.status(500).json({
            success: false,
            error: "Internal server error",
            message: err.message,
        });
    }
});

const getGenreById = asyncHandler(async (req, res) => {
    const { gid } = req.params;
    const genre = await Genre.findById(gid).populate({
        path: "songs",
        select: "title",
        populate: {
            path: "artist",
            select: "title",
        },
    });;
    return res.status(200).json({
        success: genre ? true : false,
        data: genre ? genre : "Cannot get Genre",
    });
});

const deleteGenre = asyncHandler(async (req, res) => {
    const { gid } = req.params;
    const deletedGenre = await Genre.findByIdAndDelete(gid);
    return res.status(200).json({
        success: deletedGenre ? true : false,
        data: deletedGenre ? deletedGenre : "Cannot delete Genre",
    });
});
const deleteAllGenres = asyncHandler(async (req, res) => {
    const deletedGenres = await Genre.deleteMany({});
    return res.status(200).json({
        success: deletedGenres ? true : false,
        data: deletedGenres ? deletedGenres : "Cannot delete Genres",
    });
}
);


module.exports = {
    createGenre,
    getGenres,
    getGenreById,
    updateGenre,
    deleteGenre,
    addSongToGenre,
    deleteAllGenres
};