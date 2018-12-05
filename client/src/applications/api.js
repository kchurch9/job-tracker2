import axios from 'axios'

export function deleteApplication (id){
    const url = `http://localhost:4001/application?id=${id}`
    return axios.delete(url)
}