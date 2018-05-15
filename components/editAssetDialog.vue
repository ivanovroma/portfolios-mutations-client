<template lang="pug">
  div
    v-btn(
      fab
      flat
      small
      color="blue"
      @click="editAssetDialog = true")
      v-icon edit
    
    v-dialog(v-model="editAssetDialog" max-width="400")
      
      v-card
        
        v-card-title
          
          h3 Edit asset
          
          v-spacer
          
          v-btn(
            fab
            flat
            small
            color="red"
            v-if="!checkDelete"
            @click="deleteAsset")
            v-icon delete
          v-btn(
            fab
            flat
            small
            color="green"
            v-if="checkDelete"
            @click="confirmDelete")
            v-icon check
          v-btn(
            fab
            flat
            small
            color="red"
            v-if="checkDelete"
            @click="unconfirmDelete")
            v-icon close
        
        v-divider
        
        v-card-text
          h4 {{ name }} ({{ symbol }})
          v-text-field(
            name="amount"
            label="Amount"
            id="amount"
            v-model="newAmount"
            ref="amount"
            type="number"
            @keyup.enter="onSubmit"
          )
          v-text-field(
            name="buy-price"
            label="Buy price"
            id="buy-price"
            v-model="newBuyPrice"
            ref="buy-price"
            hint="$"
            type="number"
            @keyup.enter="onSubmit"
          )
        
        
        v-divider
        
        v-card-actions
          
          v-spacer
          
          v-btn(
            color="red darken-1"
            flat="flat"
            @click.native="editAssetDialog = false"
          ) Cancel
          
          v-btn(
            color="green darken-1"
            flat="flat"
            @click.native="onSubmit"
            :disabled="disabledSave"
          ) Save
</template>

<script>
export default {

  props: ['id', 'amount', 'buyPrice', 'name', 'symbol'],

  data () {

    return {
      editAssetDialog: false,
      checkDelete: false,
      newAmount: '',
      newBuyPrice: ''
    }

  },

  methods: {

    onSubmit () {

      if (!this.disabledSave) {

        this.$store.dispatch('portfolios/updateAsset', {
          id: this.id,
          amount: this.newAmount,
          buyPrice: this.newBuyPrice
        })

        this.editAssetDialog = false
        
      }

    },

    deleteAsset () {

      this.checkDelete = true

    },

    confirmDelete () {

      this.$store.dispatch('portfolios/removeAsset', { id: this.id })
      this.checkDelete = false
      this.editAssetDialog = false
      // Comment

    },

    unconfirmDelete () {

      this.checkDelete = false

    }

  },

  computed: {

    disabledSave () {

      if (this.newAmount <= 0 || this.newBuyPrice <= 0 || this.newAmount === '' || this.newBuyPrice === '') {

        return true

      }

    }

  },

  created () {

    this.newAmount = this.amount
    this.newBuyPrice = this.buyPrice

  }

}
</script>

