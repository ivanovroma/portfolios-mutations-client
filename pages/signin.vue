<template lang="pug">
  div
    
    v-layout(justify-center align-center)
      v-flex(xs12 sm6 md4)
        v-alert(type="error" v-model="error.length > 0") {{ this.error }}
    
    v-layout(justify-center align-center)
      v-flex(xs12 sm6 md4)
        
        v-card
          
          v-card-title
            h3 Sign In
            v-spacer
            v-btn(
              color="blue"
              flat="flat"
              to="/signup"
            ) Sign Up
          
          v-divider
          
          v-form(v-model="valid" ref="form" lazy-validation)
            
            v-card-text
              
              v-text-field(
                name="email"
                label="eMail"
                v-model="email"
                @keyup.enter="onSubmit"
                :rules="emailRules"
              )
              
              v-text-field(
                name="password"
                label="Password"
                @keyup.enter="onSubmit"
                hint="At least 8 characters"
                v-model="password"
                min="8"
                :rules="passwordRules"
                :append-icon="passwordVisible ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (passwordVisible = !passwordVisible)"
                :type="passwordVisible ? 'password' : 'text'"
                counter)
          
          v-divider
          
          v-card-actions
            v-btn(
              color="green"
              block
              @click="onSubmit"
              :loading="buttonLoading"
              :disabled="buttonLoading"
            ) Sign In
</template>

<script>
  export default {
    
    middleware: 'auth',

    data () {

      return {
        email: '',
        password: '',
        passwordVisible: true,
        buttonLoading: false,
        valid: true,
        emailRules: [
          v => !!v || 'eMail is required',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'eMail must be valid'
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 8) || 'Password must be less than 8 characters'
        ]
      }

    },

    methods: {
      async onSubmit () {

        if (this.$refs.form.validate()) {

          this.buttonLoading = true

          let userData = {
            email: this.email,
            password: this.password
          }
          
          await this.$store.dispatch('auth/signinFromData', userData)
          
          this.buttonLoading = false

        }

      }

    },

    computed: {

      error () {

        return this.$store.getters['auth/getError']

      }

    },

    mounted () {

      this.$store.dispatch('auth/setError', '')

    }

  }
</script>
