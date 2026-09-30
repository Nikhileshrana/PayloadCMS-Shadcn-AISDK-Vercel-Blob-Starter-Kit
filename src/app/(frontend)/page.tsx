import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import { Suspense } from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './globals.css'

export default function HomePage() {
  return (
    <div className="home">
      <div className="content">
        <picture>
          <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/3.x/packages/ui/src/assets/payload-favicon.svg" />
          <Image
            alt="Payload Logo"
            height={65}
            src="https://raw.githubusercontent.com/payloadcms/payload/3.x/packages/ui/src/assets/payload-favicon.svg"
            width={65}
          />
        </picture>
        <Suspense fallback={<h1>Welcome to your new project.</h1>}>
          <Greeting />
        </Suspense>
        <div className="links">
          <a
            className="admin"
            href="/admin"
            rel="noopener noreferrer"
            target="_blank"
          >
            Go to admin panel
          </a>
          <a
            className="docs"
            href="https://payloadcms.com/docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Documentation
          </a>
        </div>
      </div>
      <div className="footer">
        <p>Update this page by editing</p>
        <a className="codeLink" href="vscode://file/src/app/(frontend)/page.tsx">
          <code>app/(frontend)/page.tsx</code>
        </a>
      </div>
    </div>
  )
}

async function Greeting() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  if (!user) {
    return <h1>Welcome to your new project.</h1>
  }

  return <h1>Welcome back, {user.email}</h1>
}
