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


export { loginAxios };