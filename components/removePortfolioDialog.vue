<template lang="pug">
  div
    v-btn(
      fab
      flat
      small
      color="red"
      v-if="!checkRemove"
      @click="removePortfolio")
      v-icon delete
    v-btn(
      fab
      flat
      small
      color="green"
      v-if="checkRemove"
      @click="confirmRemove")
      v-icon check
    v-btn(
      fab
      flat
      small
      color="red"
      v-if="checkRemove"
      @click="unconfirmRemove")
      v-icon close
</template>

<script>
export default {

  props: ['portfolioId'],

  data () {

    return {
      checkRemove: false
    }

  },

  methods: {

    removePortfolio () {

      this.checkRemove = true

    },

    confirmRemove () {

      this.$store.dispatch('portfolios/removePortfolio', this.portfolioId)
      this.checkRemove = false

    },

    unconfirmRemove () {

      this.checkRemove = false

    }

  }

}
</script>
