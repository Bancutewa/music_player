const genreRouter = require("express").Router()
const genreController = require("../controllers/genre.controller")
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken.middleware")

genreRouter.post(("/"), [verifyAccessToken, isAdmin], genreController.createGenre)
genreRouter.post(("/:gid"), [verifyAccessToken, isAdmin], genreController.addSongToGenre)
genreRouter.get("/", genreController.getGenres)
genreRouter.put("/:gid", [verifyAccessToken, isAdmin], genreController.updateGenre)
genreRouter.delete("/:gid", [verifyAccessToken, isAdmin], genreController.deleteGenre)
genreRouter.get("/:gid", [verifyAccessToken, isAdmin], genreController.getGenreById)


module.exports = genreRouter

