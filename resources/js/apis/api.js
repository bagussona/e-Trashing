import axios from 'axios';

/** BTS ID Official API */
const API_URL = "https://bts-id.herokuapp.com/api"

const loginAxios = data => {
  
  const axiosData = axios.post(`${API_URL}/login`, data)
  .then(res => res)
  .catch(err => err)

  return axiosData;
}

const getUserList = token => {
  const axiosData = axios.get(`${API_URL}/get/user`, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res => res)
  .catch(err => err)

  return axiosData;
}

const getUser = token => {
  const axiosData = axios.get(`${API_URL}/profile`, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res => res)
  .catch(err => err)

  return axiosData;
}

const getGarbage = token => {
  const axiosData = axios.get(`${API_URL}/jenisSampah`, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res => res)
  .catch(err => err)

  return axiosData;
}

const setGarbage = (token, data) => {
  const axiosData = axios.post(`${API_URL}/jenisSampah`, data, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res => res)
  .catch(err => err)

  return axiosData;
}

const editGarbage = (token, data, id) => {
  const axiosData = axios.post(`${API_URL}/jenisSampah/update/${id}`,data, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res => res)
  .catch(err => err)

  return axiosData;
}

const deleteGarbage = (token, id) => {
  const axiosData = axios.delete(`${API_URL}/jenisSampah/delete/${id}`, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res => res)
  .catch(err => err)

  return axiosData;
}

const getUserDetailsByID = (token, id) => {
  const axiosData = axios.get(`${API_URL}/profile/${id}`, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res => res)
  .catch(err => err)

  return axiosData;
}

const getUserPassbook = (token, id) => {
  const axiosData = axios.get(`${API_URL}/bendahara/customer/${id}/passbook`, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res => res)
  .catch(err => err)

  return axiosData;
}

const createStaff = (token, data) => {
  const axiosData = axios.post(`${API_URL}/register/staff`,data , {headers: {'Authorization': `Bearer ${token}`}})
  .then(res => res)
  .catch(err => err)

  return axiosData;
}
/** End Of BTS ID Official APIs */


/** External APIs */

/**  Nominatim Open Source Geolocation APIs */
const EXTERNAL_URL = "https://nominatim.openstreetmap.org/reverse?";
// Reverse Geocode API

const getLocation = (lat, lon) => {
  const axiosData = axios.get(`${EXTERNAL_URL}lat=${lat}&lon=${lon}&format=json&zoom=18`)
  .then(async res => {
    const data = res;
    return data
  })
  .catch(err => err)

  return axiosData;
}

export { 
  loginAxios, 
  getUserList, 
  getUser,
  getGarbage,
  setGarbage,
  editGarbage,
  deleteGarbage,
  getUserDetailsByID,
  getUserPassbook,
  createStaff,
  /** External APIs Export */
  getLocation
};