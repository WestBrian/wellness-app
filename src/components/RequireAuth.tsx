import { FC, ReactNode, useEffect } from 'react'
import { auth } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'

export interface RequireAuthProps {
  children: ReactNode
}

export const RequireAuth: FC<RequireAuthProps> = ({ children }) => {
  const router = useRouter()
  const [user, loading] = useAuthState(auth)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/sign-in')
    }
  }, [loading, user, router])

  if (loading) {
    return null
  }

  if (user) {
    return <>{children}</>
  } else {
    return null
  }
}
