<template lang="pug">
  v-layout(justify-center align-center)
    v-flex(xs12)
              
      v-card(class="mb-3" class="summary-data")
        
        v-card-title(v-show="preloader" style="height: 84px")
          v-progress-linear(:indeterminate="true")
      
        v-card-title(v-show="!preloader" class="summary-data__wrap")
      
          h3
            div(class="summary-data__item") Amount USD : {{ summaryData.amountUsd }}$ 
            div(class="summary-data__item") Amount BTC : {{ summaryData.amountBtc }}BTC
            div(class="summary-data__item") Change : {{ summaryData.changeUsd }}$ ({{ summaryData.changePercent }}%)
      
          v-spacer

          my-summary-controls   
</template>

<script>
export default {

  data () {

    return {
      buttonLoading: false,
      addPortfolioDialog: false
    }

  },

  computed: {

    summaryData () {

      return this.$store.getters['portfolios/getSummaryData']

    },

    preloader () {

      return this.$store.getters.getPreloader

    }

  },

  methods: {

    async refreshData () {

      await this.$store.dispatch('portfolios/getPortfolios', {})
      await this.$store.dispatch('portfolios/getAssets', {})

    },

    openAddPortfolioDialog () {

      this.$store.dispatch('portfolios/openAddPortfolioDialog')

    }

  }

}
</script>

<style>

  .summary-data__wrap {
    flex-wrap: nowrap
  }

  .summary-data__item {
    display: inline-block;
    margin-right: 15px;
  }

</style>
