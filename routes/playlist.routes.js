const playlistRouter = require('express').Router();
const { uploadFiles } = require('../config/cloundinary.config');
const playlistController = require('../controllers/playlist.controller');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken.middleware');

playlistRouter.post('/', uploadFiles, playlistController.createAndUploadPlaylist);
playlistRouter.get('/', playlistController.getAllPlaylists);
playlistRouter.get('/:pid', playlistController.getPlaylist);
playlistRouter.put('/:pid', uploadFiles, playlistController.updatePlaylist);
playlistRouter.delete('/:pid', playlistController.deletePlaylist);
playlistRouter.put('/:pid/songs', playlistController.addSongsToPlaylist);

module.exports = playlistRouter