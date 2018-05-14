import AuthService from '@/services/AuthService'

export const state = () => ({
  user: null,
  error: ''
})

export const mutations = {

  setUser (state, payload) {

    state.user = payload

  },

  setError (state, payload) {

    state.error = payload

  }

}

export const getters = {

  getUser (state) {

    return state.user

  },

  getError (state) {

    return state.error

  }

}

export const actions = {

  async signinByJwtFromLocaleStorage ({ commit }) {

    try {

      let jwt = localStorage.getItem('mutationsUserJwt')
      if (!jwt) return
      
      const recievedUser = await AuthService.getCurrentUserByJwt({})
      
      commit('setUser', {
        ...recievedUser.data,
        jwt
      })

      this.$router.push('/')
      
    } catch (error) {
      
      console.log(error)

    }

  },

  async signinFromData ({ commit }, payload) {

    try {

      const signinUser = await AuthService.signin(payload)

      if (signinUser.data.err) {

        let error = signinUser.data.err

        commit('setError', error)
        return

      }

      await localStorage.setItem('mutationsUserJwt', signinUser.data.jwt)
      
      commit('setUser', signinUser.data)
      
      this.$router.push('/')

    } catch (error) {
      
      console.log(error)

    }

  },

  async signupFromData ({ commit }, payload) {

    try {

      let signupUser = await AuthService.signup(payload)

      if (signupUser.data.err) {

        let error = signupUser.data.err

        commit('setError', error)
        return

      }

      let signinUser = await AuthService.signin(payload)

      if (signinUser.data.err) {

        let error = signinUser.data.err

        commit('setError', error)
        return

      }

      await localStorage.setItem('mutationsUserJwt', signinUser.data.jwt)
      
      commit('setUser', signinUser.data)
      
      this.$router.push('/')

    } catch (error) {

      console.log(error)

    }

  },

  async logout ({ commit }) {

    await localStorage.removeItem('mutationsUserJwt')
    await commit('setUser', null)
    this.$router.push('/signin')

  },

  async setError ({ commit }, payload) {

    commit('setError', payload)

  }

}
