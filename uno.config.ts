import { defineConfig, presetIcons, presetTypography, presetUno, presetWebFonts } from 'unocss'

export default defineConfig({
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
        sans: 'Dekko:400,500,700',
        headings: 'Berkshire Swash',
      },
    }),
  ],
})
