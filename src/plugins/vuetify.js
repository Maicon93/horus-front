import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
  theme: {
    themes: {
      myCustomTheme: {
        dark: false,
        colors: {
          primary: '#f57e16',
          secondary: '#168bf5',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
        },
        variables: {
          fontFamily: 'Lexend, sans-serif',
          fontWeight: '400',
        },
      },
    },
  },
})
