export const dynamic = 'force-static';

import React, { Suspense } from 'react'
import ClientResumePage from './ClientResumePage'

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
      <ClientResumePage />
    </Suspense>
  )
}