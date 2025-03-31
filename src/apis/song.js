import axios from "../axios";


export const apiCreateSong = (data, config = {}) => axios({
    url: '/song',
    method: 'POST',
    data,
    withCredentials: true,
    headers: {
        "Content-Type": "multipart/form-data",
    },
    ...config,
});
export const apiGetAllSongs = () => axios({
    url: '/song',
    method: 'GET',
})

export const apiGetSongById = (id) => axios({
    url: `/song/${id}`,
    method: 'GET'
})

export const apiUpdateSong = ({ id, data }) => axios({
    url: `/song/${id}`,
    method: 'PUT',
    data,
    withCredentials: true
})
export const apiUploadSong = ({ id, data }) => axios({
    url: `/song/uploadSong/${id}`,
    method: 'PUT',
    data,
    withCredentials: true
})
export const apiDeleteSong = (id) => axios({
    url: `/song/${id}`,
    method: 'DELETE',
    data,
    withCredentials: true
})