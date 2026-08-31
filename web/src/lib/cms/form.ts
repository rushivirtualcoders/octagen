export function text(form: FormData, key: string) {
  return String(form.get(key) ?? '').trim()
}

export function asLines(value: unknown) {
  return Array.isArray(value) ? value.map(String).join('\n') : ''
}

export function checked(form: FormData, key: string) {
  const value = form.get(key)
  return value === 'on' || value === 'true' || value === '1'
}
