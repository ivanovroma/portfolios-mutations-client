import axios from 'axios'

export default () => {

  var options = {
    baseURL: `http://localhost:1337/api`,
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
