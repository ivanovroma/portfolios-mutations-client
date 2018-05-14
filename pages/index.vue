<template lang="pug">
  div
    my-summary-data
    transition(name="slide-fade")
      div(v-if="!preloader")
        my-portfolio(
          v-for="portfolio in portfolios"
          :key="portfolio.name"
          :portfolio="portfolio"
        )


</template>

<script>
  export default {

    data () {
      
      return {
        fab: false
      }
    
    },

    middleware: 'anonimus',

    computed: {

      portfolios () {

        return this.$store.getters['portfolios/getPortfolios']

      },

      preloader () {

        return this.$store.getters.getPreloader

      }

    },

    async mounted () {

      this.$store.dispatch('setPreloader', true)
      
      await this.$store.dispatch('portfolios/getAssets', {})
      await this.$store.dispatch('portfolios/getPortfolios', {})
      
      this.$store.dispatch('setPreloader', false)

    }

  }
</script>

<style>
  th:focus, th:active {
    outline: 0;
    outline-offset: 0;
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active до версии 2.1.8 */ {
    transform: translateY(1000px);
    opacity: 0;
  }
</style>
