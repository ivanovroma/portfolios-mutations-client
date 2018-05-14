import Api from '@/services/Api'

export default {

  signup (credentials) {

    return Api().post('/auth/signup', credentials)

  },

  signin (credentials) {

    return Api().post('/auth/signin', credentials)

  },

  getCurrentUserByJwt (credentials) {

    return Api().post('/auth/get-current-user-by-jwt', credentials)

  }

}
