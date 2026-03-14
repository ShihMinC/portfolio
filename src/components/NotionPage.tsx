'use client'
import { NotionRenderer } from 'react-notion-x'
import type { ExtendedRecordMap } from 'notion-types'
import 'react-notion-x/src/styles.css'

// Lazy load heavy components
import dynamic from 'next/dynamic'
const Code = dynamic(() => import('react-notion-x/build/third-party/code').then(m => m.Code))
const Collection = dynamic(() => import('react-notion-x/build/third-party/collection').then(m => m.Collection))
const Modal = dynamic(() => import('react-notion-x/build/third-party/modal').then(m => m.Modal), { ssr: false })

export default function NotionPage({ recordMap }: { recordMap: ExtendedRecordMap }) {
  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage={false}
      darkMode={false}
      disableHeader={true}
      components={{
        Code,
        Collection,
        Modal,
      }}
    />
  )
}
