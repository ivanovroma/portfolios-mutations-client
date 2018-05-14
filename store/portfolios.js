import PortfoliosService from '@/services/PortfoliosService'
import AssetsService from '@/services/AssetsService'
import TickersService from '@/services/TickersService'
import Vue from 'vue'

export const state = () => ({

  summaryData: {
    amountUsd: 0,
    amountBtc: 0,
    profitUsd: 0,
    profitPercent: 0
  },
  portfolios: [],
  assets: []

})

export const getters = {

  getPortfolios (state) {

    let portfolios = state.portfolios
    let assets = state.assets
    let amountUsd = 0
    
    for (let i = 0; i < portfolios.length; i++) {
      
      portfolios[i].buyAmountUsd = 0
      portfolios[i].amountUsd = 0
      portfolios[i].amountBtc = 0
      portfolios[i].share = 0

      for (let ii = 0; ii < assets.length; ii++) {

        if (portfolios[i].id === assets[ii]._portfolio) {
  
          portfolios[i].buyAmountUsd = portfolios[i].buyAmountUsd + (assets[ii].amount * assets[ii].buyPrice)
          portfolios[i].amountUsd = portfolios[i].amountUsd + (assets[ii].amount * assets[ii].price_usd)
          portfolios[i].amountBtc = portfolios[i].amountBtc + (assets[ii].amount * assets[ii].price_btc)

        }

      }

      amountUsd += portfolios[i].amountUsd

      portfolios[i].amountUsd = Number(portfolios[i].amountUsd.toFixed(2))
      portfolios[i].amountBtc = Number(portfolios[i].amountBtc.toFixed(6))

      portfolios[i].changeUsd = Number((portfolios[i].amountUsd - portfolios[i].buyAmountUsd).toFixed(2))
      portfolios[i].changePercent = Number((portfolios[i].changeUsd / (portfolios[i].buyAmountUsd / 100)).toFixed(2))

    }

    for (let i = 0; i < portfolios.length; i++) {

      portfolios[i].share = Number((portfolios[i].amountUsd / (amountUsd / 100)).toFixed(2))
      
      if (isNaN(portfolios[i].share)) portfolios[i].share = 0
      if (isNaN(portfolios[i].changePercent)) portfolios[i].changePercent = 0

    }

    return portfolios

  },

  getAssetsByPortfolioId: (state) => (portfolioId) => {

    let assetsFromStore = state.assets
    let assetsToReturn = []
    let portfolioAmountUsd = 0

    for (let i = 0; i < assetsFromStore.length; i++) {

      if (assetsFromStore[i]._portfolio === portfolioId) {

        assetsFromStore[i].amountUsd = Number((assetsFromStore[i].amount * assetsFromStore[i].price_usd).toFixed(2))
        assetsFromStore[i].amountBtc = Number((assetsFromStore[i].amount * assetsFromStore[i].price_btc).toFixed(8))

        assetsFromStore[i].changeUsd = Number((assetsFromStore[i].amountUsd - (assetsFromStore[i].amount * assetsFromStore[i].buyPrice)).toFixed(2))
        assetsFromStore[i].changePercent = Number((assetsFromStore[i].changeUsd / ((assetsFromStore[i].amountUsd - assetsFromStore[i].changeUsd) / 100)).toFixed(2))

        portfolioAmountUsd += assetsFromStore[i].amountUsd

        assetsToReturn.push(assetsFromStore[i])

      }

    }

    for (let i = 0; i < assetsToReturn.length; i++) {

      assetsToReturn[i].share = Number((assetsToReturn[i].amountUsd / (portfolioAmountUsd / 100)).toFixed(2))

    }

    return assetsToReturn

  },

  getSummaryData (state) {

    if (state.portfolios.length === 0) {

      return {
        amountUsd: 0,
        amountBtc: 0,
        changeUsd: 0,
        changePercent: 0
      }
      
    }

    let assets = state.assets

    let buyAmountUsd = 0
    let amountUsd = 0
    let amountBtc = 0
    let changeUsd = 0
    let changePercent = 0

    for (let ii = 0; ii < assets.length; ii++) {

      buyAmountUsd += assets[ii].amount * assets[ii].buyPrice
      amountUsd += assets[ii].amount * assets[ii].price_usd
      amountBtc += assets[ii].amount * assets[ii].price_btc
      
    }
      
    amountUsd = Number(amountUsd.toFixed(2))
    amountBtc = Number(amountBtc.toFixed(8))
    changeUsd = Number((amountUsd - buyAmountUsd).toFixed(2))
    changePercent = Number((changeUsd / (buyAmountUsd / 100)).toFixed(2))

    if (isNaN(changePercent)) changePercent = 0
      
    return {
      amountUsd,
      amountBtc,
      changeUsd,
      changePercent
    }

  }

}

export const mutations = {

  setPortfolios (state, payload) {

    Vue.set(state, 'portfolios', payload)

  },

  createPortfolio (state, payload) {

    state.portfolios.push(payload)

  },
  
  removePortfolio (state, payload) {

    for (let i = 0; i < state.portfolios.length; i++) {

      if (state.portfolios[i].id === payload) {

        state.portfolios.splice(i, 1)
        break

      }

    }

    for (let i = 0; i < state.assets.length; i++) {

      if (state.assets[i]._portfolio === payload) {

        state.assets.splice(i, 1)

      }

    }
    
  },
  
  updatePortfolio (state, payload) {
    
    for (let i = 0; i < state.portfolios.length; i++) {
      
      if (state.portfolios[i].id === payload.id) {
        
        Vue.set(state.portfolios, i, payload)
        break
        
      }
      
    }
    
  },

  setAssets (state, payload) {

    Vue.set(state, 'assets', payload)

  },
  
  createAsset (state, payload) {
    
    state.assets.push(payload)

  },

  removeAsset (state, payload) {

    for (let i = 0; i < state.assets.length; i++) {

      if (state.assets[i].id === payload) {

        state.assets.splice(i, 1)

      }

    }
    
  },
  
  updateAsset (state, payload) {
    
    for (let i = 0; i < state.assets.length; i++) {
      
      if (state.assets[i].id === payload.id) {
        
        state.assets[i].amount = payload.amount
        state.assets[i].buyPrice = payload.buyPrice

        break
        
      }
      
    }
    
  }

}

export const actions = {

  async getPortfolios ({ commit }) {

    let portfoliosData = await PortfoliosService.getListByUserId()

    let portfolios = portfoliosData.data

    commit('setPortfolios', portfolios)
  
  },

  async createPortfolio ({ commit }, payload) {

    let createdPortfolioData = await PortfoliosService.create(payload)
    
    let createdPortfolio = createdPortfolioData.data
    
    commit('createPortfolio', createdPortfolio)

  },

  async removePortfolio ({ commit }, payload) {

    let removedPortfolioData = await PortfoliosService.remove(payload)

    let removedPortfolio = removedPortfolioData.data

    commit('removePortfolio', removedPortfolio.id)

  },

  async updatePortfolio ({ commit }, payload) {

    let updatedPortfolioData = await PortfoliosService.update(payload)

    let updatedPortfolio = updatedPortfolioData.data

    commit('updatePortfolio', updatedPortfolio)

  },

  async getAssets ({ commit }) {

    let assetsData = await AssetsService.getListByUserId()
    let tickersData = await TickersService.getTickers()

    let assets = assetsData.data
    let tickers = tickersData.data

    for (let i = 0; i < assets.length; i++) {

      for (let ii = 0; ii < tickers.length; ii++) {

        if (assets[i].ticker === tickers[ii].ticker) {

          assets[i].name = tickers[ii].name
          assets[i].symbol = tickers[ii].symbol
          assets[i].price_usd = Number(tickers[ii].price_usd)
          assets[i].price_btc = Number(tickers[ii].price_btc)

          break

        }

      }

    }

    commit('setAssets', assets)

  },

  async createAsset ({ commit }, payload) {

    let createdAsset = await AssetsService.create({
      ticker: payload.ticker,
      amount: payload.amount,
      buyPrice: payload.buyPrice,
      portfolioId: payload.portfolioId
    })

    let assetData = {
      _portfolio: createdAsset.data._portfolio,
      _user: createdAsset.data._user,
      buyPrice: createdAsset.data.buyPrice,
      amount: createdAsset.data.amount,
      id: createdAsset.data.id,
      name: payload.name,
      symbol: payload.symbol,
      price_usd: payload.price_usd,
      price_btc: payload.price_btc
    }

    commit('createAsset', assetData)

  },

  async removeAsset ({ commit }, payload) {
    
    let removedAssetData = await AssetsService.remove(payload)

    let removedAsset = removedAssetData.data

    commit('removeAsset', removedAsset.id)

  },

  async updateAsset ({ commit }, payload) {
    
    let updatedAssetData = await AssetsService.update(payload)
    
    let updatedAsset = updatedAssetData.data

    commit('updateAsset', updatedAsset)

  }

}
