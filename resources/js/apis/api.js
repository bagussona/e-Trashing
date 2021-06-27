import axios from 'axios';

const apiUrl = "https://bts-id.herokuapp.com/api"

const loginAxios = (data) => {
  // var exportData = null;
  
  const axiosData = axios.post(`${apiUrl}/login`, data)
  .then(res => {
    return res
  })
  .catch(err => {
    // console.log(err)
    return err
  })

  return axiosData;
}

const getUserList = () => {
  const axiosData = axios.get(`${apiUrl}/get/user`)
  .then(res => {
    return res
  })
  .catch(err => {
    return err
  })

  return axiosData;
}

const getUser = (headers) => {
  const axiosData = axios.get(`${apiUrl}/profile`, {headers: {'Authorization': `Bearer ${headers}`}})
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