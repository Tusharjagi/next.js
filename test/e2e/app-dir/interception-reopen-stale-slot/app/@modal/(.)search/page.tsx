'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Page() {
  // After navigating away, the slot has no matching route and keeps rendering
  // this (now stale) segment. Only show the modal while it's active.
  const pathname = usePathname()
  if (pathname !== '/search') return null

  return (
    <div id="search-modal">
      <p>Search modal (intercepted)</p>
      <Link id="result-link" href="/items/1">
        Go to item 1
      </Link>
    </div>
  )
}
