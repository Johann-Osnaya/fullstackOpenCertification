import axios from 'axios'
import { useEffect, useState } from 'react' 
let token = null

  const setToken = newToken => {
  token = `bearer ${newToken}`
}

  const getAll = async (baseUrl) => {
  const response = await axios.get(baseUrl)
  return response.data
}

 const createResource = async (baseUrl, newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

 const update = async (id, newObject, baseUrl) => {
  const response = await axios.put(`${ baseUrl }/${id}`, newObject)
  return response.data
}

 export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    getAll(baseUrl).then(response => setResources(response))

  },[baseUrl])


  const create = (resource) => {
    const response = createResource(baseUrl , resource)
    setResources(resources.concat(response))
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}
