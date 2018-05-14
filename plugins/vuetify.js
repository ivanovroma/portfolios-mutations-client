import Vue from 'vue'
import Vuetify from 'vuetify'

import editAssetDialog from '../components/editAssetDialog.vue'
import logout from '../components/logout.vue'
import portfolio from '../components/portfolio.vue'
import portfolioControls from '../components/portfolioControls.vue'
import removePortfolioDialog from '../components/removePortfolioDialog.vue'
import summaryControls from '../components/summaryControls.vue'
import summaryData from '../components/summaryData.vue'

Vue.use(Vuetify)

Vue.component('my-edit-asset-dialog', editAssetDialog)
Vue.component('my-logout', logout)
Vue.component('my-portfolio', portfolio)
Vue.component('my-portfolio-controls', portfolioControls)
Vue.component('my-remove-portfolio-dialog', removePortfolioDialog)
Vue.component('my-summary-controls', summaryControls)
Vue.component('my-summary-data', summaryData)
