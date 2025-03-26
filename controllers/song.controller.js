const Song = require("../models/song.model")
const asyncHandler = require("express-async-handler")
const slugify = require('slugify')





const getAllSongs = asyncHandler(async (req, res) => {
    const response = await Song.find()
    return res.json({
        success: true,
        data: response ? response : "Cannot get Songs"
    })
})
const createAndUploadSong = asyncHandler(async (req, res) => {
    if (!req.body.title) throw new Error("Missing title");
    if (!req.file) throw new Error("Missing file");

    req.body.slugify = slugify(req.body.title);
    req.body.url = req.file.path;

    const newSong = await Song.create(req.body);
    return res.status(201).json({
        success: newSong ? true : false,
        data: newSong ? newSong : 'Cannot create and upload Song'
    });
});

const uploadMusic = asyncHandler(async (req, res) => {
    const { sid } = req.params;
    console.log(sid);

    if (!req.file) throw new Error("Missing file");
    const song = await Song.findById(sid);
    console.log(song);

    const fileUrl = req.file.path;
    const response = await Song.findByIdAndUpdate(sid, { url: fileUrl }, { new: true });

    return res.status(200).json({
        status: response ? true : false,
        updatedSong: response ? response : 'Cannot update song file'
    });
}); ``

const getSong = asyncHandler(async (req, res) => {
    const { sid } = req.params
    const song = await Song.findById(sid)
    return res.status(200).json({
        success: song ? true : false,
        data: song ? song : 'Cannot get Song'
    })
})
const updateSong = asyncHandler(async (req, res) => {
    const { sid } = req.params;

    if (Object.keys(req.body).length === 0) throw new Error("Missing input");

    // Nếu có title trong req.body, tạo slug từ title
    if (req.body.title) {
        req.body.slug = slugify(req.body.title);
    }

    const updatedSong = await Song.findByIdAndUpdate(sid, req.body, { new: true });

    return res.status(200).json({
        success: updatedSong ? true : false,
        data: updatedSong ? updatedSong : 'Cannot update Song'
    });
});

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
