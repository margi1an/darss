import React, { useEffect } from 'react'
import { Form, Link, useActionData } from 'react-router-dom'
import { FormInput } from '../components'
import { useRegister } from '../hooks/useRegister'

export const action = async({request}) => {
  let formData = await request.formData()
  let email = formData.get('email')
  let password = formData.get('password')
  let displayName = formData.get('displayName')
  let photoUrl = formData.get('photoUrl')
  return {email , password , displayName,photoUrl}
}


function Register() {
  const userData = useActionData()
  const {registerWithEmail , isPending} = useRegister()

  useEffect(() => {
    if(userData){
      registerWithEmail(userData.email, userData.password, userData.displayName, userData.photoURL)
    }
  } , [userData])
  return (
    <div className='grid place-items-center min-h-screen'>
    <Form className='flex flex-col items-center gap-5 card bg-base-100 w-96 shadow-xl p-5' method='post'>
      <h1 className='text-5xl font-semibold'> Register</h1> 
      <FormInput type ='displayName' name = 'displayName' labelText ='displayName'></FormInput>
      <FormInput type ='photoUrl' name = 'PhotoUrl' labelText ='photoUrl'></FormInput>
      <FormInput type ='email' name = 'email' labelText ='email'></FormInput>
      <FormInput type ='password' name = 'password' labelText ='password'></FormInput>
      <div className='w-full'>
      {!isPending &&  <button className='btn btn-primary btn-block'>Register</button>}
      {isPending &&  <button disabled className='btn btn-primary btn-block'>Registered ....</button>}         
      </div>
      <div className="text-center">
        Already Login ? <Link className= ' text-primary' to='/login'>Login</Link>
      </div>
    </Form>
      
    </div>
  )
}

export default Register