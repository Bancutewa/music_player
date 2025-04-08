const albumRouter = require("express").Router()
const { uploadFiles } = require("../config/cloundinary.config")
const albumController = require("../controllers/album.controller")
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken.middleware")

albumRouter.post(("/"), uploadFiles, albumController.createAndUploadAlbum)
albumRouter.post(("/add-song/:aid"), albumController.addSongToAlbum)
albumRouter.post(("/add-genre/:aid"), albumController.addGenreToAlbum)
albumRouter.get("/", albumController.getAlbums)
albumRouter.put("/:aid", uploadFiles, albumController.updateAlbum)
albumRouter.delete("/:aid", albumController.deleteAlbum)
albumRouter.get("/:aid", albumController.getAlbumById)


module.exports = albumRouter

