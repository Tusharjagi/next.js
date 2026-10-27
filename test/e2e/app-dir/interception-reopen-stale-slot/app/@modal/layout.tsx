// Without a dynamic segment in the slot, `next start` serves the navigation
// from the prefetch cache and does not go through the affected code path.
export const dynamic = 'force-dynamic'

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
