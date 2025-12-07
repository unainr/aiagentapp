import { DynamicSignUp } from '@/components/auth/DynamicSignUp'
import { SignUpWrapper } from '@/components/auth/sign-up-wrapper'
import { Suspense } from 'react'

const SignUpPage =  () => {
  return (
    <Suspense><DynamicSignUp /></Suspense>
  )
}

export default SignUpPage