<template lang="pug">
  v-app(dark)
    
    v-toolbar(fixed app)
      
      v-toolbar-title(v-text="title")
      
      v-spacer
      
      v-btn(
        round
        flat
        target="_blank"
        href="https://t.me/joinchat/Frd8XxEDQ2niIj4cBrZumw"
        class="button-telegram-desktop")
        v-icon(left) forum
        |Support
      v-btn(
        round
        flat
        fab
        small
        target="_blank"
        href="https://t.me/joinchat/Frd8XxEDQ2niIj4cBrZumw"
        class="button-telegram-mobile")
        v-icon() forum
      
      my-logout(v-if="userIsAuth")
    
    v-content
      
      v-container
        nuxt
</template>

<script>
  export default {

    data () {

      return {
        title: 'Portfolios'
      }

    },

    computed: {

      userIsAuth () {

        return this.$store.getters['auth/getUser']

      }

    },

    async mounted () {

      this.$store.dispatch('auth/signinByJwtFromLocaleStorage')

    }

  }
</script>

<style>
  @media (min-width: 420px) {
    .button-telegram-mobile {
      display: none
    }
  }

  @media (max-width: 420px) {
    .button-telegram-desktop {
      display: none
    }
  }
</style>
