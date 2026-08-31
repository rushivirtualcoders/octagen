export const inputClass =
  'mt-1 w-full rounded-md border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-lm-orange focus:ring-2 focus:ring-lm-orange/15'

export const inputErrorClass =
  'mt-1 w-full rounded-md border border-lm-red bg-white px-3 py-2.5 text-sm text-ink outline-none focus:ring-2 focus:ring-lm-red/20'

export function fieldClass(error?: string) {
  return error ? inputErrorClass : inputClass
}

export function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="tech-label text-muted">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-xs text-lm-red">{error}</span> : null}
    </label>
  )
}

export function Check({ name, label, defaultChecked }: { name: string; label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center gap-2 text-sm text-ink/80">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="accent-lm-red" />
      {label}
    </label>
  )
}
