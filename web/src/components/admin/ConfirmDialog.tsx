'use client'

type ConfirmDialogProps = {
  open: boolean
  title?: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  tone?: 'danger' | 'default'
  pending?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({
  open,
  title = 'Confirm action',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  tone = 'default',
  pending = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null

  const confirmClass =
    tone === 'danger'
      ? 'rounded-md bg-lm-red px-4 py-2 text-sm font-bold uppercase text-white hover:bg-lm-red/90 disabled:opacity-60'
      : 'rounded-md bg-lm-orange px-4 py-2 text-sm font-bold uppercase text-white hover:bg-lm-orange/90 disabled:opacity-60'

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-ink/40 backdrop-blur-[1px]"
        onClick={pending ? undefined : onCancel}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        className="relative w-full max-w-md rounded-xl border border-line bg-white p-5 shadow-2xl"
      >
        <p className="tech-label text-lm-red">Octagen CMS</p>
        <h2 id="confirm-dialog-title" className="font-display mt-2 text-xl font-bold uppercase text-ink">
          {title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink/75">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={pending}
            className="rounded-md border border-line px-4 py-2 text-sm font-semibold uppercase text-muted hover:bg-surface disabled:opacity-60"
          >
            {cancelLabel}
          </button>
          <button type="button" onClick={onConfirm} disabled={pending} className={confirmClass}>
            {pending ? 'Please wait…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
