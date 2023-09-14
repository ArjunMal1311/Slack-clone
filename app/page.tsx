import Intro from '@/components/frontend/intro'
import SectionDivider from '@/components/frontend/section-divider'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Intro />
      <SectionDivider />
    </main>
  )
}
