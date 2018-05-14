<template lang="pug">
  div
    div(class="portfolios-controls__desktop-menu")
      v-btn(
        round
        flat
        color="green"
        @click="addPortfolioDialog = true")
        v-icon(left) add
        |Add Portfolio
      v-btn(
        fab
        dark
        flat
        small
        color="orange"
        @click="refreshData")
        v-icon refresh
    div(class="portfolios-controls__mobile-menu")    
      v-speed-dial(
        v-model="fab"
        bottom
        right
        fixed
        direction="top"
        transition="slide-y-reverse-transition"
        style="z-index: 1")
        v-btn(
          slot="activator"
          color="blue darken-2"
          dark
          fab
          hover
          v-model="fab")
          v-icon menu
          v-icon close
        v-btn(
          fab
          dark
          small
          color="green"
          @click="addPortfolioDialog = true")
          v-icon add
        v-btn(
          fab
          dark
          small
          color="orange"
          @click="refreshData")
          v-icon refresh
    
    v-dialog(v-model="addPortfolioDialog" max-width="400")
      v-card
        v-card-title
          h3 Add portfolio
        v-divider
        v-card-text
          v-text-field(
            name="portfolio-name"
            label="Name"
            id="portfolio-name"
            @keyup.enter="onSubmit"
            :autofocus="true"
            v-model="portfolioName"
            ref="portfolioName"
          )
        v-divider
        v-card-actions
          v-spacer
          v-btn(
            color="red darken-1"
            flat="flat"
            @click.native="addPortfolioDialog = false"
          ) Cancel
          v-btn(
            color="green darken-1"
            flat="flat"
            @click.native="onSubmit"
            :disabled="disabledSave || buttonLoading"
            :loading="buttonLoading"
          ) Save
</template>

<script>
export default {

  data () {

    return {
      fab: false,
      addPortfolioDialog: false,
      portfolioName: '',
      buttonLoading: false
    }

  },
  
  methods: {

    async onSubmit () {

      if (!this.disabledSave) {

        this.buttonLoading = true

        let newPortfolio = {
          name: this.portfolioName
        }

        await this.$store.dispatch('portfolios/createPortfolio', newPortfolio)
        this.buttonLoading = false
        this.portfolioName = ''
        this.addPortfolioDialog = false

      }

    },

    async refreshData () {
      
      this.$store.dispatch('setPreloader', true)
      await this.$store.dispatch('portfolios/getPortfolios', {})
      await this.$store.dispatch('portfolios/getAssets', {})
      this.$store.dispatch('setPreloader', false)

    }

  },

  computed: {

    disabledSave () {

      if (this.portfolioName === '') {

        return true

      }

    }

  }

}
</script>

<style>
  @media (min-width: 600px) {
    .portfolios-controls__mobile-menu {
      display: none
    }
  }

  @media (max-width: 600px) {
    .portfolios-controls__desktop-menu {
      display: none
    }
  }
  .portfolios-controls__desktop-menu {
    width: 250px
  }
</style>
