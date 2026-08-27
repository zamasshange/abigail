import type { Metadata } from 'next'
import { SummonsCourt } from '@/components/summons-court'

export const metadata: Metadata = {
  title: 'The summons — Queen Ricky',
  description: 'Name the night Drake may finally see you.',
}

export default function SummonsPage() {
  return <SummonsCourt />
}
