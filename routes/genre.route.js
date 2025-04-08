const genreRouter = require("express").Router()
const genreController = require("../controllers/genre.controller")
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken.middleware")

genreRouter.post(("/"), genreController.createGenre)
genreRouter.post(("/:gid"), genreController.addSongToGenre)
genreRouter.get("/", genreController.getGenres)
genreRouter.put("/:gid", genreController.updateGenre)
genreRouter.delete("/:gid", genreController.deleteGenre)
genreRouter.get("/:gid", genreController.getGenreById)


module.exports = genreRouter

