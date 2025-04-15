import axios from "../config/axios";

export const apiCreateGenre = (data, config = {}) => axios({
    url: '/genre',
    method: 'POST',
    data,
    withCredentials: true,
    headers: {
        "Content-Type": "multipart/form-data",
    },
    ...config,
})
export const apiGetAllGenres = () => axios({
    url: '/genre',
    method: 'GET',
})

export const apiGetGenreById = (id) => axios({
    url: `/genre/${id}`,
    method: 'GET'
})

export const apiUpdateGenre = ({ id, data }, config = {}) => axios({
    url: `/genre/${id}`,
    method: 'PUT',
    data,
    withCredentials: true,
    headers: {
        "Content-Type": "multipart/form-data",
    },
    ...config,
})

export const apiDeleteGenre = (id) => axios({
    url: `/genre/${id}`,
    method: 'DELETE',
    withCredentials: true
})