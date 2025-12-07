import { DynamicSignIn } from '@/components/auth/DynamicSignIn'
import { SignInWrapper } from '@/components/auth/sign-in-wrapper'
import { Suspense } from 'react'

const SignInPage =  () => {
  return (
    <Suspense><DynamicSignIn  /></Suspense>
  )
}

export default SignInPage