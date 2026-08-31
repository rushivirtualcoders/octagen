import type { ActionState } from '@/lib/cms/action-state'

export default function FormBanner({ state }: { state: ActionState }) {
  if (!state?.error) return null
  return (
    <p className="rounded-md border border-lm-red/20 bg-lm-red/5 px-3 py-2 text-sm text-lm-red" role="alert">
      {state.error}
    </p>
  )
}
