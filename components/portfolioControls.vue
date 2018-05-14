<template lang="pug">
  div()
    div(
      class = "portfolio-controls-desktop"
    )
      v-btn(
        round
        flat
        color = "green"
        @click = "addAssetDialog = true")
        v-icon(left) add
        |Add asset

      v-btn(
        fab
        flat
        small
        color="blue"
        @click="editPortfolioDialog = true")
        v-icon edit

    v-menu(
      bottom offset-y
      class = "portfolio-controls-mobile")
      v-btn(
        slot="activator"
        fab
        flat
        small)
        v-icon more_vert
      v-list
        v-list-tile(@click="addAssetDialog = true")
          v-list-tile-title Add coin
        v-list-tile(@click="editPortfolioDialog = true")
          v-list-tile-title Edit portfolio
    
    //- ADD ASSET DIALOG
    v-dialog(
      v-model="addAssetDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable)
      
      v-card(tile)
        
        v-toolbar(card dark)
          v-btn(icon @click.native="closeAddAssetDialog" dark)
            v-icon close
          v-toolbar-title Add asset
          v-spacer
        
        v-card-text
          
          v-layout(justify-center align-center)
            v-flex(xs12 sm6 md4)
              v-stepper(v-model="stepAssetDialog" vertical style="height: auto")
                v-stepper-step(step="1" :complete="stepAssetDialog > 1") Select an ticker
                  small {{ this.selectedTicker }}
                v-stepper-content(step="1")
                  div
                    v-text-field(
                      name="input-search-ticker"
                      label="Search ticker"
                      id="input-search-ticker"
                      v-model="searchTickerRequest"
                      ref="input-search-ticker"
                      :loading="searchPreloader"
                    )

                    v-alert( type="info" v-model="searchResultAlert") {{ this.searchResultMessage }}
                v-stepper-content(step="1" class="pt-0")
                  div
                    v-radio-group(v-if="foundTickers.length > 0" v-model="selectedTicker" column class="pt-0")
                      v-radio(
                        v-for="foundTicker in foundTickers"
                        :key="foundTicker.ticker"
                        :label="foundTicker.name + ' (' + foundTicker.symbol + ')'"
                        :value="foundTicker.ticker"
                      )
                v-stepper-content(step="1")
                  div
                    v-btn(
                      color="primary"
                      @click.native="stepAssetDialog = 2"
                      :disabled="disabledNextFirstStep") Continue
                    v-btn(flat @click.native="closeAddAssetDialog") Cancel
                
                v-stepper-step(step="2" :complete="stepAssetDialog > 2") Enter the data for this asset
                v-stepper-content(step="2")
                  v-text-field(
                    name="amount"
                    label="Amount"
                    id="amount"
                    v-model="amount"
                    ref="amount"
                    type="number"
                    @keyup.enter="stepAssetDialog = 3"
                  )
                  v-text-field(
                    name="buy-price"
                    label="Entry price"
                    id="buy-price"
                    v-model="buyPrice"
                    ref="buy-price"
                    hint="$"
                    type="number"
                    @keyup.enter="stepAssetDialog = 3"
                  )
                  v-btn(
                    color="primary"
                    @click.native="stepAssetDialog = 3"
                    :disabled="disabledNextSecondStep") Continue
                  v-btn(flat @click.native="stepAssetDialog -= 1") Back
                
                v-stepper-step(step="3") Confirm the data for this asset
                v-stepper-content(step="3")
                  |Ticker: {{ this.selectedTicker }}
                  br
                  |Amount: {{ this.amount }}
                  br
                  |Buy price: {{ this.buyPrice }}$
                  br
                  br
                  v-btn(color="green" @click.native="onSubmitAddAsset") Add asset
                  v-btn(flat @click.native="stepAssetDialog -= 1") Back
    
    //- EDIT PORTFOLIO DIALOG
    v-dialog(v-model="editPortfolioDialog" max-width="400")
      v-card
        v-card-title
          h3 Edit portfolio
          v-spacer
          my-remove-portfolio-dialog(:portfolioId="portfolioId")
        v-divider
        v-card-text
          v-text-field(
            name="portfolio-name"
            label="Name"
            id="portfolio-name"
            @keyup.enter="onSubmitEditPortfolio"
            :autofocus="true"
            v-model="newPortfolioName"
            ref="portfolioName"
          )
        v-divider
        v-card-actions
          v-spacer
          v-btn(
            color="red darken-1"
            flat="flat"
            @click.native="editPortfolioDialog = false"
          ) Cancel
          v-btn(
            color="green darken-1"
            flat="flat"
            @click.native="onSubmitEditPortfolio"
            :disabled="disabledSave"
          ) Save
</template>

<script>
import TickersService from '@/services/TickersService'
import _ from 'lodash'

export default {

  props: ['portfolioName', 'portfolioId'],

  data () {

    return {
      
      // ADD PORTFOLIO DIALOG
      addAssetDialog: false,
      stepAssetDialog: 1,
      searchTickerRequest: '',
      searchPreloader: false,
      selectedTicker: '',
      foundTickers: [],
      searchResultMessage: '',
      searchResultAlert: false,
      buyPrice: '',
      amount: '',
      
      // EDIT PORTFOLIO DIALOG
      editPortfolioDialog: false,
      newPortfolioName: ''
    
    }

  },

  methods: {

    async onSearchTicker () {

      if (this.searchTickerRequest !== '') {

        this.searchPreloader = true
        this.selectedTicker = ''
        this.foundTickers = []
        this.searchResultMessage = ''
        this.searchResultAlert = false

        // const foundTickersFromServer = await TickersService.searchTickers(val)
        const foundTickersFromServer = await TickersService.searchTickers(this.searchTickerRequest)

        if (foundTickersFromServer.data.msg === 'not found') {

          this.searchResultMessage = 'Ticker not found'
          this.searchResultAlert = true
          this.searchPreloader = false
          return

        }

        this.foundTickers = foundTickersFromServer.data
        this.searchPreloader = false

      }

    },

    closeAddAssetDialog () {

      this.addAssetDialog = false
      this.stepAssetDialog = 1
      this.searchTickerRequest = ''
      this.searchPreloader = false
      this.selectedTicker = ''
      this.buyPrice = ''
      this.amount = ''
      this.foundTickers = []
      this.searchResultMessage = ''
      this.searchResultAlert = false

    },

    onSubmitAddAsset () {

      for (var i = 0; i < this.foundTickers.length; i++) {

        if (this.foundTickers[i].ticker === this.selectedTicker) {

          this.$store.dispatch('portfolios/createAsset', {
            ticker: this.selectedTicker,
            amount: Number(this.amount),
            buyPrice: Number(this.buyPrice),
            portfolioId: this.portfolioId,
            name: this.foundTickers[i].name,
            symbol: this.foundTickers[i].symbol,
            price_btc: this.foundTickers[i].price_btc,
            price_usd: this.foundTickers[i].price_usd
          })

          break

        }

      }

      this.closeAddAssetDialog()

    },

    onSubmitEditPortfolio () {

      this.$store.dispatch('portfolios/updatePortfolio', {
        name: this.newPortfolioName,
        id: this.portfolioId
      })

      this.editPortfolioDialog = false

    }

  },

  computed: {

    disabledNextFirstStep () {

      if (this.selectedTicker === '') {

        return true

      }

    },

    disabledNextSecondStep () {

      if (this.amount <= 0 || this.buyPrice <= 0 || this.amount === '' || this.buyPrice === '') {

        return true

      }

    },

    disabledSave () {

      if (this.portfolioName === '') {

        return true

      }

    }

  },

  created () {

    this.newPortfolioName = this.portfolioName

  },

  watch: {

    searchTickerRequest: {
      
      handler: _.debounce(function () {

        this.onSearchTicker()

      }, 800)

    }

  }

}
</script>

<style>

  @media (min-width: 600px) {
    .portfolio-controls-mobile {
      display: none !important
    }
  }

  @media (max-width: 600px) {
    .portfolio-controls-desktop {
      display: none !important
    }
  }

</style>
