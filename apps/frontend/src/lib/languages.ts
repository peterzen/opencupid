import iso6391 from 'iso-639-1'



export function getLanguageSelectorOptions() {
  return iso6391.getAllCodes().map((code) => ({
    value: code,
    label: iso6391.getNativeName(code),
  }))
}

