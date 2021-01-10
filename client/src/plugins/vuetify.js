import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    light: true,
    themes: {
      light: {
        primary: '#311b92',
        secondary: '#ff4081',
        accent: '#8c9eff',
        error: '#b71c1c'
      }
    }
  }
})
