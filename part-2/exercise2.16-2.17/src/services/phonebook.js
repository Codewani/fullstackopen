import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/phonebook'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = id => {
  return axios.delete(`${baseUrl}/${id}`)
    .then(response => {
      console.log("Response status:", response.status);
      return response.status === 204 ? { id } : response.data;
    });
}

export default { getAll, create, update, remove }
