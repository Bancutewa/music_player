const asyncHandler = require("express-async-handler")
const slugify = require('slugify')
const Album = require("../models/album.model")

const createAlbum = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error("Missing input")
    if (!req.file) throw new Error("Missing Images File");
    if (req.body && req.body.title) req.body.slugify = slugify(req.body.title)
    req.body.coverImageURL = req.file.path;
    const newAlbum = await Album.create(req.body)
    return res.status(201).json({
        success: newAlbum ? true : false,
        data: newAlbum ? newAlbum : 'Cannot create album'
    })
})

const getAlbums = asyncHandler(async (req, res) => {
    const albums = await Album.find()
    return res.status(200).json({
        success: albums ? true : false,
        data: albums
    })
})
const getAlbumById = asyncHandler(async (req, res) => {
    const { aid } = req.params
    const album = await Album.findById(aid)
    return res.status(200).json({
        success: album ? true : false,
        data: album ? album : 'Cannot get album'
    })
})

const updateAlbum = asyncHandler(async (req, res) => {
    const { aid } = req.params
    if (Object.keys(req.body).length === 0) throw new Error("Missing input")
    if (req.body && req.body.title) req.body.slugify = slugify(req.body.title)
    if (req.file) {
        req.body.coverImageURL = req.file.path;
    }
    const updatedAlbum = await Album.findByIdAndUpdate(aid, req.body, { new: true })
    return res.status(200).json({
        success: updatedAlbum ? true : false,
        data: updatedAlbum ? updatedAlbum : 'Cannot update album'
    })
})
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
    createAlbum,
    getAlbums,
    getAlbumById,
    updateAlbum,
    deleteAlbum,
    addSongToAlbum,
    addGenreToAlbum
}