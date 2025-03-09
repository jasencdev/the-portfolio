import { generateClasses } from '@formkit/themes'
import { defaultConfig } from '@formkit/vue'
import { genesisIcons } from '@formkit/icons'

export default defaultConfig({
  icons: {
    ...genesisIcons
  },
  config: {
    classes: generateClasses({
      global: {
        wrapper: 'max-w-md mb-6',
        label: 'block mb-1 font-semibold text-sm formkit-invalid:text-red-500',
        input: 'w-full p-2 border border-gray-300 rounded formkit-invalid:border-red-500',
        help: 'text-xs text-gray-500 mt-1',
        message: 'text-red-500 text-xs mt-1',
        outer: 'mb-4'
      }
    })
  }
})