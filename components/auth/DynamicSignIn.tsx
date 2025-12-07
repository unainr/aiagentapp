import { connection } from 'next/server';
import { SignInWrapper } from './sign-in-wrapper'

export const DynamicSignIn = async () => {
    await connection();
  return (
    <><SignInWrapper /></>
  )
}
