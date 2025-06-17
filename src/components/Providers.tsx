"use client"

import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { ThemeProvider as NextThemeProvider} from 'next-themes'

const Providers = ({children}: React.ComponentProps<typeof NextThemeProvider>) => {
  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider>
        {children}
      </SessionProvider>
    </NextThemeProvider>
  )
}

export default Providers