import Api from '@/services/Api'

export default {

  create (credentials) {

    return Api().post('/assets/create', credentials)

  },

  getListByUserId (credentials) {

    return Api().get('/assets/get-list-by-user-id', credentials)

  },

  remove (credentials) {

    return Api().delete('/assets/remove/' + credentials.id)

  },

  update (credentials) {

    return Api().put('/assets/update/' + credentials.id, credentials)

  }

}
