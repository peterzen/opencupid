// FormKit
import { plugin as formKitPlugin, defaultConfig } from '@formkit/vue'
import { en } from '@formkit/i18n'
import '@/lib/formkit/formkit-custom.scss'

import { generateClasses } from '@formkit/themes'
import { createAutoAnimatePlugin, createAutoHeightTextareaPlugin, createFloatingLabelsPlugin } from '@formkit/addons'
import '@formkit/addons/css/floatingLabels'

const config = defaultConfig({
  // theme: 'genesis',
  plugins: [
    createAutoHeightTextareaPlugin(),
    createFloatingLabelsPlugin({
      useAsDefault: true,
    }),
    createAutoAnimatePlugin(
      {
        /* optional AutoAnimate config */
        // default:
        duration: 150,
        easing: 'ease-in-out',
      },
      {
        /* optional animation targets object */
        // default:
        global: ['outer', 'inner'],
        form: ['form'],
        repeater: ['items'],
      }
    )
  ],
  config: {
    locales: { en },
    locale: 'en',
    classes: generateClasses({
      global: {
        outer: '$reset',
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
      radio: {
        input: '$reset form-check-input',
        outer: '$reset ps-0 form-check',
        label: '$reset form-check-label'
      },
      submit: {
        outer: '$reset',
        wrapper: '$reset',
        input: '$reset btn'
      }
    })
  }
})



export const useFormKit = (app: any) => {
  app.use(formKitPlugin, config)
}

