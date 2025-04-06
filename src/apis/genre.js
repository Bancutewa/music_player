import axios from "../axios";

export const apiCreateGenre = (data) => axios({
    url: '/genre',
    method: 'POST',
    data,
    withCredentials: true
})
export const apiGetAllGenres = () => axios({
    url: '/genre',
    method: 'GET',
})

export const apiGetGenreById = (id) => axios({
    url: `/genre/${id}`,
    method: 'GET'
})

export const apiUpdateGenre = ({ id, data }) => axios({
    url: `/genre/${id}`,
    method: 'PUT',
    data,
    withCredentials: true
})

export const apiDeleteGenre = (id) => axios({
    url: `/genre/${id}`,
    method: 'DELETE',
    data,
    withCredentials: true
})