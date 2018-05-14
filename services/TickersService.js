import Api from '@/services/Api'

export default {

  searchTickers (credentials) {

    return Api().get('/tickers/search/' + credentials)

  },

  getTickers (credentials) {

    return Api().get('/tickers/get-list', credentials)

  }

}
