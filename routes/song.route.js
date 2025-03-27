const songRouter = require("express").Router()
const { uploadFiles } = require("../config/cloundinary.config")
const songController = require("../controllers/song.controller")
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken.middleware")

songRouter.post("/", uploadFiles, songController.createAndUploadSong);
songRouter.get(("/"), songController.getAllSongs)

songRouter.put(("/uploadSong/:sid"), uploadFiles, songController.uploadMusic)
songRouter.put(("/:sid"), songController.updateSong)
songRouter.delete("/:sid", songController.deleteSong)

songRouter.get("/:sid", songController.getSong)
module.exports = songRouter

