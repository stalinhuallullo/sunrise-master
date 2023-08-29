import * as React from 'react'
import 'antd/dist/antd.css'

import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { UserSunlightContext } from 'interfaces/userInfo-context'
import { User } from 'interfaces/userFromSunlight'
import { IntercomProvider } from 'react-use-intercom'

const INTERCOM_APP_ID = process.env.NEXT_PUBLIC_INTERCOM_ID as string

function MyApp({ Component, pageProps }: AppProps) {
  const [userDataSession, setUserDataSession] = useState<User>({})

  return (
    <IntercomProvider appId={INTERCOM_APP_ID} autoBoot>
      <UserSunlightContext.Provider
        value={{ userDataSession, setUserDataSession }}>
        <Component {...pageProps} />
      </UserSunlightContext.Provider>
    </IntercomProvider>
  )
}

export default MyApp
