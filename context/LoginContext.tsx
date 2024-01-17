import React, { createContext, Dispatch, SetStateAction } from 'react'

interface LoginContextType {
  loggedIn: boolean
  setLoggedIn: Dispatch<SetStateAction<boolean>>
  handleLogin: () => void
  handleLogout: () => void
}

const initialContextValue: LoginContextType = {
  loggedIn: false,
  setLoggedIn: () => {},
  handleLogin: () => {},
  handleLogout: () => {},
}

export const LoginContext = createContext<LoginContextType>(initialContextValue)
