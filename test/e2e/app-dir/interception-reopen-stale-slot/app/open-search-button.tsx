'use client'

import { useRouter } from 'next/navigation'

export function OpenSearchButton() {
  const router = useRouter()
  return (
    <button
      id="open-search"
      type="button"
      onClick={() => router.push('/search')}
    >
      Open search
    </button>
  )
}
