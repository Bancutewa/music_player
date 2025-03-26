const albumRouter = require("express").Router()
const { uploadAlbum } = require("../config/cloundinary.config")
const albumController = require("../controllers/album.controller")
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken.middleware")

albumRouter.post(("/"), [verifyAccessToken, isAdmin,], uploadAlbum.single('coverImage'), albumController.createAlbum)
albumRouter.post(("/add-song/:aid"), [verifyAccessToken, isAdmin], albumController.addSongToAlbum)
albumRouter.post(("/add-genre/:aid"), [verifyAccessToken, isAdmin], albumController.addGenreToAlbum)
albumRouter.get("/", albumController.getAlbums)
albumRouter.put("/:aid", [verifyAccessToken, isAdmin], uploadAlbum.single('coverImage'), albumController.updateAlbum)
albumRouter.delete("/:aid", [verifyAccessToken, isAdmin], albumController.deleteAlbum)
albumRouter.get("/:aid", [verifyAccessToken, isAdmin], albumController.getAlbumById)


module.exports = albumRouter

