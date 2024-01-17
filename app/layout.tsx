'use client'

import 'css/tailwind.css'
import 'pliny/search/algolia.css'

import { Space_Grotesk } from 'next/font/google'
import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import { SearchProvider, SearchConfig } from 'pliny/search'
import Header from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'
import Footer from '@/components/Footer'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from './theme-providers'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useEffect, useState } from 'react'
import { LoginContext } from 'context/LoginContext'
import { ToastContainer } from 'react-toastify'

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  const handleLogin = () => {
    setLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('TOKEN')
    setLoggedIn(false)
  }

  useEffect(() => {
    if (localStorage.getItem('TOKEN')) handleLogin()
  }, [])

  return (
    <html
      lang={siteMetadata.language}
      className={`${space_grotesk.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
      <link rel="manifest" href="/static/favicons/site.webmanifest" />
      <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <body className="bg-white text-black antialiased dark:bg-gray-950 dark:text-white">
        <ThemeProviders>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <LoginContext.Provider value={{ loggedIn, setLoggedIn, handleLogin, handleLogout }}>
            <QueryClientProvider client={queryClient}>
              <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
              <SectionContainer>
                <div className="flex h-screen flex-col justify-between font-sans">
                  <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
                    <Header />
                    <main className="mb-auto">{children}</main>
                  </SearchProvider>
                  <Footer />
                </div>
              </SectionContainer>
            </QueryClientProvider>
          </LoginContext.Provider>
        </ThemeProviders>
      </body>
    </html>
  )
}
