const genreRouter = require("express").Router();
const genreController = require("../controllers/genre.controller");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken.middleware");
const { uploadFiles } = require("../config/cloundinary.config");

genreRouter.post("/", uploadFiles, genreController.createGenre);
genreRouter.post("/:gid", genreController.addSongToGenre);
genreRouter.get("/", genreController.getGenres);
genreRouter.put("/:gid", uploadFiles, genreController.updateGenre);
genreRouter.delete("/", genreController.deleteAllGenres);
genreRouter.delete("/:gid", genreController.deleteGenre);
genreRouter.get("/:gid", genreController.getGenreById);

module.exports = genreRouter;