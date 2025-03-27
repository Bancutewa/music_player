const albumRouter = require("express").Router()
const { uploadFiles } = require("../config/cloundinary.config")
const albumController = require("../controllers/album.controller")
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken.middleware")

albumRouter.post(("/"), [verifyAccessToken, isAdmin,], uploadFiles, albumController.createAndUploadAlbum)
albumRouter.post(("/add-song/:aid"), [verifyAccessToken, isAdmin], albumController.addSongToAlbum)
albumRouter.post(("/add-genre/:aid"), [verifyAccessToken, isAdmin], albumController.addGenreToAlbum)
albumRouter.get("/", albumController.getAlbums)
albumRouter.put("/:aid", [verifyAccessToken, isAdmin], uploadFiles, albumController.updateAlbum)
albumRouter.delete("/:aid", [verifyAccessToken, isAdmin], albumController.deleteAlbum)
albumRouter.get("/:aid", [verifyAccessToken, isAdmin], albumController.getAlbumById)


module.exports = albumRouter

