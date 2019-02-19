import axios from 'axios'

export function deleteApplication (id){
    const url = `${process.env.API_HOST}/application?id=${id}`
    return axios.delete(url)
}
