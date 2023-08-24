import { defineConfig, presetIcons, presetTypography, presetUno, presetWebFonts } from 'unocss'
import { presetHeroPatterns } from '@julr/unocss-preset-heropatterns'

export default defineConfig({
  theme: {
    colors: {
      betterblue: {
        50: '#E9F4F6',
        100: '#D0E7EC',
        200: '#A1CED8',
        300: '#72B6C5',
        400: '#489AAD',
        500: '#357280',
        600: '#2A5A65',
        700: '#1F444C',
        800: '#152D32',
        900: '#0A1719',
        950: '#060D0E',
      },
    },
  },
  rules: [
    [/^scrollbar-hide$/, ([_]) => {
      return `.scrollbar-hide{scrollbar-width:none}
              .scrollbar-hide::-webkit-scrollbar{display:none}`
    }],
    [/^scrollbar-default$/, ([_]) => {
      return `.scrollbar-default{scrollbar-width:auto}
              .scrollbar-default::-webkit-scrollbar{display:block}`
    }],
  ],
  presets: [
    presetUno(),
    presetHeroPatterns(),
    presetTypography(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
      cdn: 'https://esm.sh/',
    }),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Kalam:400,500,700',
        headings: 'Bree Serif',
      },
    }),
  ],
})
