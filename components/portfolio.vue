<template lang="pug">
  v-layout(justify-center align-center)
    
    v-flex(xs12)
      
      v-card(class="mb-2")
        
        v-card-title(extended style="flex-wrap: nowrap")
          h3 {{ portfolio.name }}
          v-spacer
          
          my-portfolio-controls(
            :portfolioId = "portfolio.id"
            :portfolioName = "portfolio.name"
          )

          v-btn(
            fab
            flat
            small
            color = "orange"
            @click.native = "showAssets = !showAssets")
            v-icon(v-if = "showAssets") expand_less
            v-icon(v-else) expand_more

        v-divider(v-show = "showAssets")

        v-card-text(
          class = "px-0 py-0"
          v-show = "showAssets"
        )
          
          v-data-table(
            :headers="headers"
            :items="assetsList"
            hide-actions
            class="elevation-1")
            
            template(slot="items" slot-scope="props")
              td {{ props.item.name }} ({{ props.item.symbol }})
              td(class="text-xs-right") {{ props.item.amount }}
              td(class="text-xs-right") {{ props.item.buyPrice }}$
              td(class="text-xs-right") {{ props.item.price_usd }}$
              td(class="text-xs-right") {{ props.item.amountUsd }}$
              td(class="text-xs-right") {{ props.item.amountBtc }}
              td(class="text-xs-right") {{ props.item.changeUsd }}$
              td(class="text-xs-right") {{ props.item.changePercent }}%
              td(class="text-xs-right") {{ props.item.share }}%
              td(class="justify-center layout px-0")
                
                my-edit-asset-dialog(
                  :id="props.item.id"
                  :name="props.item.name"
                  :symbol="props.item.symbol"
                  :sizeAsset="props.item.sizeAsset"
                  :entryPrice="props.item.entryPrice"
                )
        
        v-divider

        v-card-title(class="portfolio-summary-data")
          
          h4

            div(class="portfolio-summary-data__item") Amount USD : {{ portfolio.amountUsd }}$
            div(class="portfolio-summary-data__item") Amount BTC : {{ portfolio.amountBtc }}BTC
            div(class="portfolio-summary-data__item") Change : {{ portfolio.changeUsd }}$ ({{ portfolio.changePercent }}%)
            div(class="portfolio-summary-data__item") Share : {{ portfolio.share }}%
</template>
<script>
export default {

  props: ['portfolio'],

  data () {

    return {
      headers: [
        {
          text: 'Coin',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Amount', align: 'right', value: 'sizeAsset' },
        { text: 'Buy price', align: 'right', value: 'entryPrice', sortable: false },
        { text: 'Current Price', align: 'right', value: 'price_usd', sortable: false },
        { text: 'Amount USD', align: 'right', value: 'amountUsd' },
        { text: 'Amount BTC', align: 'right', value: 'amountBtc' },
        { text: 'Change USD', align: 'right', value: 'profitUsd' },
        { text: 'Change %', align: 'right', value: 'profitPercent' },
        { text: 'Share', align: 'right', value: 'share' },
        { text: ' ', align: 'right', value: 'name', sortable: false }
      ],
      showAssets: true
    }

  },
  
  computed: {
    assetsList () {

      return this.$store.getters['portfolios/getAssetsByPortfolioId'](this.portfolio.id)

    }
  }

}
</script>

<style>
  .portfolio-summary-data__item {
    display: inline-block;
    margin-right: 15px;
  }
</style>