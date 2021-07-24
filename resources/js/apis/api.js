import axios from 'axios';

/** 
 * BTS ID Official APIs
*/
const API_URL = 'https://bts-id.herokuapp.com/api'

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

const updateStaffProfile = (token, data, id) => {
  const axiosData = axios.post(`${API_URL}/profile/update/${id}`, data, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res => res)
  .catch(err => err)

  return axiosData;
}

const updateProfile = (token, data, id) => {
  const axiosData = axios.post(`${API_URL}/customer/profile/update`, data, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res => res)
  .catch(err => err)

  return axiosData;
}

const updateStaffPhoto = (token, data) => {
  const axiosData = axios.post(`${API_URL}/customer/profile/image`, data, {headers: {'Authorization': `Bearer ${token}`}})
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
  const axiosData = axios.get(`${API_URL}/get/profile/${id}`, {headers: {'Authorization': `Bearer ${token}`}})
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
  const axiosData = axios.post(`${API_URL}/register/staff`, data, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res => res)
  .catch(err => err)

  return axiosData;
}

const getNotification = token => {
  const axiosData = axios.get(`${API_URL}/bendahara/all/tarikanKu`, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res => res)
  .catch(err => err)

  return axiosData;
}

// const getSetoranAll = token => {
//   const axiosData = axios.get(`${API_URL}/bendahara/all/setoran`, {headers: {'Authorization': `Bearer ${token}`}})
//   .then(res => res)
//   .catch(err => err)

//   return axiosData;
// }

// const getSetoranPengepul = token => {
//   const axiosData = axios.get(`${API_URL}/bendahara/4/setoran`, {headers: {'Authorization': `Bearer ${token}`}})
//   .then(res => res)
//   .catch(err => err)

//   return axiosData;
// }

const getTreasurerDashboardData = (token, id) => {
  const axiosMultipleData = Promise.all([
    axios.get(`${API_URL}/bendahara/all/setoran`, { headers: { 'Authorization': `Bearer ${token}` } }),
    id === 4 ? (
      axios.get(`${API_URL}/bendahara/all/setoran`, {headers: {'Authorization': `Bearer ${token}`}}),
      axios.get(`${API_URL}/bendahara/4/setoran`, {headers: {'Authorization': `Bearer ${token}`}}),
      axios.get(`${API_URL}/bendahara/4/passbook`, {headers: {'Authorization': `Bearer ${token}`}})
    ) : null
  ])
  .then(res => {
    // return res[0], res[1], res[2]
    // console.log(res)
    return res
  })
  .catch(err => err)

  return axiosMultipleData;
}

const createCustomer = (token, data) => {
  const axiosData = axios.post(`${API_URL}/register`, data, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res => res)
  .catch(err => err)

  return axiosData;
}

const getSetoranByID = (token, id) => {
  const axiosData = axios.get(`${API_URL}/bendahara/customer/${id}/setoran`, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res => res)
  .catch(err => err)

  return axiosData;
}

const getWithdrawDetail = (token, id) => {
  const axiosData = axios.get(`${API_URL}/bendahara/tarikanKu/${id}`, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res => res)
  .catch(err => err)

  return axiosData;
}

const getMessage = (token, id) => {
  const axiosData = axios.get(`${API_URL}/chats/message/${id}`, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res => res)
  .catch(err => err)

  return axiosData;
}

const getContacts = token => {
  const axiosData = axios.get(`${API_URL}/chats/contact`, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res => res)
  .catch(err => err)

  return axiosData;
}

const accTarikan = (token, id) => {
  const axiosData = axios.post(`${API_URL}/bendahara/${id}/accepted/tarikanKu`,null , { headers: { 'Authorization': `Bearer ${token}` } })
  .then(res => res)
  .catch(err => err)

  return axiosData;
}

const rejectTarikan = (token, id) => {
  const axiosData = axios.post(`${API_URL}/bendahara/${id}/rejected/tarikanKu`, null, { headers: { 'Authorization': `Bearer ${token}` } })
  .then(res => res)
  .catch(err => err)

  return axiosData;
}

const sendMessageAPI = (token, data) => {
  const axiosData = axios.post(`${API_URL}/chats/message`, data, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res => res)
  .catch(err => err)

  return axiosData;
}

/** End Of BTS ID Official APIs */


/** External APIs */

/**  Nominatim Open Source Geolocation APIs */
const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/';
  
// Reverse Geocode API

const getLocation = (lat, lon) => {
  const axiosData = axios.get(`${NOMINATIM_URL}reverse?lat=${lat}&lon=${lon}&format=json&zoom=18`)
  .then(async res => {
    const data = res;
    return data
  })
  .catch(err => err)

  return axiosData;
}

const getCoordinate = query => {
  const axiosData = axios.get(`${NOMINATIM_URL}search?q=${query}&format=json&addressdetails=1`)
  .then(res => res)
  .catch(err => err);

  return axiosData;
}

/** Kode Pos Open Source APIs */
const KODE_POS_URL = 'https://kodepos-496sqx5d6-sooluh.vercel.app/search?q=';

// Address Search API
const getAddress = query => {
  const axiosData = axios.get(`${KODE_POS_URL}${query}`)
  .then(res => res)
  .catch(err => err)
           
  return axiosData;
}

export { 
  loginAxios, 
  getUserList, 
  getUser,
  updateStaffProfile,
  updateStaffPhoto,
  updateProfile,
  getGarbage,
  setGarbage,
  editGarbage,
  deleteGarbage,
  getUserDetailsByID,
  getUserPassbook,
  createStaff,
  getNotification,
  // getSetoranAll,
  // getSetoranPengepul,
  getTreasurerDashboardData,
  getSetoranByID,
  getWithdrawDetail,
  getMessage,
  getContacts,
  sendMessageAPI,
  /** External APIs Export */
  getLocation,
  getAddress,
  getCoordinate,
  accTarikan,
  rejectTarikan,
  createCustomer
};