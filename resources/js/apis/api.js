import axios from 'axios';

const apiUrl = "https://bts-id.herokuapp.com/api"

const loginAxios = (data) => {
  var exportData = null;
  
  axios.post('https://bts-id.herokuapp.com', data)
  .then(res => {
    console.log(res)
    exportData = res
  })
  .catch(err => console.error(err))

  return exportData;
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
      return body.token;
    }
  })
  .catch(err => err)

  return fetchData;
}


export { loginAxios, loginFetch };