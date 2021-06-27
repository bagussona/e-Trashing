import axios from 'axios';

const apiUrl = "https://bts-id.herokuapp.com/api"

const loginAxios = (data) => {
  
  const axiosData = axios.post(`${apiUrl}/login`, data)
  .then(res => {
    return res
  })
  .catch(err => {
    return err
  })

  return axiosData;
}

const getUserList = (token) => {
  const axiosData = axios.get(`${apiUrl}/get/user`, {headers: {'Authorization': `Bearer ${token}`}})
  .then(res => {
    return res
  })
  .catch(err => {
    return err
  })

  return axiosData;
}

const getUser = (token) => {
  const axiosData = axios.get(`${apiUrl}/profile`, {headers: {'Authorization': `Bearer ${token}`}})
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
  getUser 
};