const songRouter = require("express").Router()
const uploadCloud = require("../config/cloundinary.config")
const songController = require("../controllers/song.controller")
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken.middleware")

songRouter.post(("/"), songController.createSong)
songRouter.get(("/"), songController.getAllSongs)

songRouter.put(("/uploadSong/:sid"), uploadCloud.single('song'), songController.uploadMusic)
songRouter.put(("/:sid"), songController.updateSong)
songRouter.delete("/:sid", songController.deleteSong)

songRouter.get("/:sid", songController.getSong)
module.exports = songRouter

