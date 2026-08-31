'use client'

import { useRef, useState, useTransition } from 'react'
import ConfirmDialog from './ConfirmDialog'
import { TrashIcon, iconButtonClass } from './ActionIcons'

export default function DeleteButton({
  action,
  id,
  label = 'Delete',
  confirmMessage = 'Delete this record? This cannot be undone.',
}: {
  action: (formData: FormData) => void | Promise<void>
  id: string
  label?: string
  confirmMessage?: string
}) {
  const formRef = useRef<HTMLFormElement>(null)
  const [open, setOpen] = useState(false)
  const [pending, startTransition] = useTransition()

  function handleConfirm() {
    const form = formRef.current
    if (!form) return
    startTransition(() => {
      form.requestSubmit()
    })
  }

  return (
    <>
      <form ref={formRef} action={action} className="inline">
        <input type="hidden" name="id" value={id} />
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={label}
          title={label}
          className={iconButtonClass('danger')}
        >
          <TrashIcon />
        </button>
      </form>

      <ConfirmDialog
        open={open}
        title="Delete record"
        message={confirmMessage}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        tone="danger"
        pending={pending}
        onConfirm={handleConfirm}
        onCancel={() => {
          if (!pending) setOpen(false)
        }}
      />
    </>
  )
}
