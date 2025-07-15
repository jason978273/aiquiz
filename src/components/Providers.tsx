"use client"

import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { ThemeProvider as NextThemeProvider} from 'next-themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

//queryclient provider used to cache data and manage server state in react applications


const queryClient = new QueryClient()

const Providers = ({children}: React.ComponentProps<typeof NextThemeProvider>) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionProvider>
          {children}
        </SessionProvider>
      </NextThemeProvider>
    </QueryClientProvider>
    
  )
}

export default Providers