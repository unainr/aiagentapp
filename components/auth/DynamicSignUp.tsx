import { connection } from 'next/server';
import { SignInWrapper } from './sign-in-wrapper'
import { SignUpWrapper } from './sign-up-wrapper';

export const DynamicSignUp = async () => {
    await connection();
  return (
    <><SignUpWrapper /></>
  )
}
