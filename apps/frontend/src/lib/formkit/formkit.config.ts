import { generateClasses } from '@formkit/themes'
import { getAvailableLocales } from '../i18n'

const config = {
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
}

export default config