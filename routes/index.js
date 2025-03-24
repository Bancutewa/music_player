const { notFound, errHandler } = require("../middlewares/errHandler.middleware")
const songRouter = require("./song.route")
const userRouter = require("./user.route")
const initRoutes = (app) => {
    app.use("/api/v1/user", userRouter)
    app.use("/api/v1/song", songRouter)


    app.use(notFound)
    app.use(errHandler)
}

module.exports = initRoutes