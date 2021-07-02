import axios from 'axios';

const apiURL = "https://bts-id.herokuapp.com/api"

const loginAxios = data => {
  
  const axiosData = axios.post(`${apiURL}/login`, data)
  .then(res => {
    return res
  })
  .catch(err => {
    return err
  })

  return axiosData;
}

const getUserList = token => {
  const axiosData = axios.get(`${apiURL}/get/user`, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res => {
    return res
  })
  .catch(err => {
    return err
  })

  return axiosData;
}

const getUser = token => {
  const axiosData = axios.get(`${apiURL}/profile`, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res => {
    return res
  })
  .catch(err => {
    return err
  })

  return axiosData;
}

const getGarbage = token => {
  const axiosData = axios.get(`${apiURL}/jenisSampah`, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res => {
    return res
  })
  .catch(err => {
    return err
  })

  return axiosData;
}

const getProfileById = (token, id) => {
  const axiosData = axios.get(`${apiURL}/api/profile/${id}`, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res => {
    return res
  })
  .catch(err => {
    return err
  })

  return axiosData;
}

const setGarbage = (token, data) => {
  const axiosData = axios.post(`${apiURL}/jenisSampah`, data, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res => {
    return res
  })
  .catch(err => {
    return err
  })

  return axiosData;
}

const editGarbage = (token, data, id) => {
  const axiosData = axios.post(`${apiURL}/jenisSampah/update/${id}`,data, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res => {
    return res
  })
  .catch(err => {
    return res
  })

  return axiosData;
}

const deleteGarbage = (token, id) => {
  const axiosData = axios.delete(`${apiURL}/jenisSampah/delete/${id}`, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res => {
    return res
  })
  .catch(err => {
    return err
  })

  return axiosData;
}


export { 
  loginAxios, 
  getUserList, 
  getUser,
  getGarbage,
  getProfileById,
  setGarbage,
  editGarbage,
  deleteGarbage
};