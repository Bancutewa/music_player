const artistRoutes = require('express').Router();
const { uploadFiles } = require('../config/cloundinary.config');
const artistController = require('../controllers/artist.controller');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken.middleware');

artistRoutes.post('/', uploadFiles, artistController.createAndUploadArtist);
artistRoutes.get('/', artistController.getAllArtists);
artistRoutes.put('/:aid', uploadFiles, artistController.updateArtist);
artistRoutes.delete('/:aid', artistController.deleteArtist);


artistRoutes.put('/:aid/songs', artistController.addSongToArtist);
artistRoutes.put('/:aid/genres', artistController.addGenreToArtist);
artistRoutes.put('/:aid/albums', artistController.addAlbumToArtist);

artistRoutes.delete('/:aid/genres', artistController.removeGenreFromArtist);
artistRoutes.delete('/:aid/albums', artistController.removeAlbumFromArtist);
artistRoutes.delete('/:aid/songs', artistController.removeSongFromArtist);

artistRoutes.get('/:aid', artistController.getArtist);


module.exports = artistRoutes;