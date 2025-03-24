const asyncHandler = require("express-async-handler")
const slugify = require('slugify')
const Genre = require("../models/genre.model")

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
    const genres = await Genre.find()
    return res.status(200).json({
        success: genres ? true : false,
        data: genres
    })
})
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
    const { gid } = req.params
    const songsArray = req.body.songs?.split(',')
    console.log(songsArray);

    if (!songsArray) throw new Error("Invalid songs array")
    const updatedGenre = await Genre.findByIdAndUpdate(gid, { $push: { songs: { $each: songsArray } } }, { new: true })
    return res.status(200).json({
        success: updatedGenre ? true : false,
        data: updatedGenre ? updatedGenre : 'Cannot add songs to Genre'
    })
})
module.exports = {
    createGenre,
    getGenres,
    getGenreById,
    updateGenre,
    deleteGenre,
    addSongToGenre

}