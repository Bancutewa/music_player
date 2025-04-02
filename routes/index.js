const { notFound, errHandler } = require("../middlewares/errHandler.middleware")
const albumRouter = require("./album.route")
const genreRouter = require("./genre.route")
const songRouter = require("./song.route")
const userRouter = require("./user.route")
const artistRouter = require("./artist.route")
const playlistRouter = require("./playlist.routes")

const initRoutes = (app) => {
    app.use("/api/v1/user", userRouter)
    app.use("/api/v1/song", songRouter)
    app.use("/api/v1/album", albumRouter)
    app.use("/api/v1/genre", genreRouter)
    app.use("/api/v1/artist", artistRouter)
    app.use("/api/v1/playlist", playlistRouter)

    app.use(notFound)
    app.use(errHandler)
}

module.exports = initRoutes