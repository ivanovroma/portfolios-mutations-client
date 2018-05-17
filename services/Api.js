import axios from 'axios'
import env from '../env.js'

export default () => {

  var options = {
    baseURL: `${env.server}/api`,
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
