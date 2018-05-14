import Api from '@/services/Api'

export default {

  create (credentials) {

    return Api().post('/portfolios/create', credentials)

  },

  getListByUserId (credentials) {

    return Api().get('/portfolios/get-list-by-user-id', credentials)

  },

  remove (credentials) {

    return Api().delete('/portfolios/remove/' + credentials)

  },

  update (credentials) {

    return Api().put('/portfolios/update/' + credentials.id, credentials)

  }

}
