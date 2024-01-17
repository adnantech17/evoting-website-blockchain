import siteMetadata from '@/data/siteMetadata'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import { MdHowToVote } from 'react-icons/md'
import { useContext } from 'react'
import { LoginContext } from 'context/LoginContext'

const Header = () => {
  const { loggedIn, handleLogout } = useContext(LoginContext)
  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <MdHowToVote size={32} />
            </div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden h-6 text-2xl font-semibold sm:block">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        {!loggedIn ? (
          <Link
            key={'Login'}
            href={'/login'}
            className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block"
          >
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block"
          >
            Logout
          </button>
        )}
        <Link
          key={'About'}
          href={'/about'}
          className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block"
        >
          About
        </Link>
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
