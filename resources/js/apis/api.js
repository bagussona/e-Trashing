import axios from 'axios';

const apiUrl = "https://bts-id.herokuapp.com/api"

const loginAxios = (data) => {
  // var exportData = null;
  
  const axiosData = axios.post(`${apiUrl}/login`, data)
  .then(res => {
    // console.log(res)
    return res;
  })
  .catch(err => err)

  return axiosData;
}

const loginFetch = (data) => {
  // var exportData = null;

  const fetchData = fetch(
    `${apiUrl}/login`, 
    {
      method: 'POST',
      body: data
    }
  )
  .then(async res => {
    if (res.status == 200) {
      const body = await res.json();
      // return exportData = body.token;
      return body;
    }
  })
  .catch(err => err)

  return fetchData;
}


export { loginAxios, loginFetch };