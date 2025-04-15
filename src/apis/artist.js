import axios from "../config/axios";

export const apiCreateArtist = (data) => axios({
    url: '/artist',
    method: 'POST',
    data,
    withCredentials: true
})
export const apiGetAllArtists = () => axios({
    url: '/artist',
    method: 'GET',
})

export const apiGetArtistById = (id) => axios({
    url: `/artist/${id}`,
    method: 'GET'
})

export const apiUpdateArtist = ({ id, data }) => axios({
    url: `/artist/${id}`,
    method: 'PUT',
    data,
    withCredentials: true
})

export const apiDeleteArtist = (id) => axios({
    url: `/artist/${id}`,
    method: 'DELETE',
    data,
    withCredentials: true
})

export const apiAddSongToArtist = ({ id, data }) => axios({
    url: `/artist/${id}/songs`,
    method: 'PUT',
    data,
    withCredentials: true
})

export const apiRemoveSongFromArtist = ({ id, data }) => axios({
    url: `/artist/${id}/songs`,
    method: 'DELETE',
    data,
    withCredentials: true
})

export const apiAddSongToGenre = ({ id, data }) => axios({
    url: `/artist/${id}/songs`,
    method: 'PUT',
    data,
    withCredentials: true
})
export const apiRemoveSongFromGenre = ({ id, data }) => axios({
    url: `/artist/${id}/songs`,
    method: 'DELETE',
    data,
    withCredentials: true
})

export const apiAddSongToAlbum = ({ id, data }) => axios({
    url: `/artist/${id}/songs`,
    method: 'PUT',
    data,
    withCredentials: true
})
export const apiRemoveSongFromAlbum = ({ id, data }) => axios({
    url: `/artist/${id}/songs`,
    method: 'DELETE',
    data,
    withCredentials: true
})
