'use client'

import { useActionState } from 'react'
import { updateInquiryStatus } from '@/lib/cms/actions'
import FormBanner from './FormBanner'
import { inputClass } from './Fields'

export default function InquiryStatusForm({ id, status }: { id: string; status: string }) {
  const [state, action, pending] = useActionState(updateInquiryStatus, null)

  return (
    <form action={action} className="mt-6 flex flex-wrap items-center gap-3">
      <input type="hidden" name="id" value={id} />
      <FormBanner state={state} />
      <select name="status" defaultValue={status === 'NEW' ? 'READ' : status} className={inputClass} required>
        <option value="NEW">New</option>
        <option value="READ">Read</option>
        <option value="REPLIED">Replied</option>
        <option value="CLOSED">Closed</option>
      </select>
      <button type="submit" disabled={pending} className="rounded-md bg-lm-red px-4 py-2 text-sm font-bold uppercase text-white disabled:opacity-60">
        {pending ? 'Saving…' : 'Update status'}
      </button>
    </form>
  )
}
