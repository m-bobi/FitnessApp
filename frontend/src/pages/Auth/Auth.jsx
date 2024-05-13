import React from 'react'
import SignIn from '../../components/SignIn/SignIn'
import SignUp from '../../components/SignUp/SignUp'
import Navbar from '../../components/shared/Navbar/Navbar'
import './Auth.css';

const Auth = () => {
  return (
    <div className='authPage'>
        <Navbar/>
        <SignIn/>
    </div>
  )
}

export default Auth
