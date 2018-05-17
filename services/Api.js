import axios from 'axios'

export default () => {

  var options = {
    baseURL: `http://188.225.74.38/api`,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (localStorage.getItem('mutationsUserJwt')) {

    options.headers = {
      'authorization': localStorage.getItem('mutationsUserJwt'),
      'Content-Type': 'application/json'
    }

  }

  return axios.create(options)

}
