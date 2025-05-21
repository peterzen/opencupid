// FormKit
import { plugin as formKitPlugin, defaultConfig } from '@formkit/vue'
import '@/lib/formkit/formkit-custom.scss'

import { generateClasses } from '@formkit/themes'
import { getAvailableLocales } from '../i18n'
import { createAutoHeightTextareaPlugin, createFloatingLabelsPlugin } from '@formkit/addons'
import '@formkit/addons/css/floatingLabels'

const config = defaultConfig({
  // theme: 'genesis',
  plugins: [
    createAutoHeightTextareaPlugin(),
    createFloatingLabelsPlugin({
      useAsDefault: true,
    }),
  ],
  config: {
    locales: getAvailableLocales(),
    classes: generateClasses({
      global: {
        outer: '$reset mb-3',
        input: 'form-control',
        label: 'form-label',
        help: 'form-text text-muted'
      },
      form: {
        form: "mx-auto d-flex flex-column flex-grow-1",
        actions: "d-flex justify-content-end mt-auto"
      },
      range: {
        input: '$reset form-range',
      },
      checkbox: {
        input: '$reset form-check-input',
        outer: '$reset ps-0 form-check',
        label: '$reset form-check-label'
      },
      submit: {
        outer: '$reset mt-3',
        input: '$reset btn btn-primary'
      }
    })
  }
})



export const useFormKit = (app: any) => {
  app.use(formKitPlugin, config)
}

