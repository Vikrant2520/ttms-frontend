import React from 'react';
import uploadCSV from './uploadCSV';
import IITRlogo from '../assets/iitrlogo.jpg'

import { GoogleLogin } from 'react-google-login';
import { Route, useHistory } from 'react-router-dom';
// refresh token
import { refreshTokenSetup } from '../utils/refreshToken';

const clientId =
  '435658737912-838sapfjlmvb85g4s6f867l2clto2knq.apps.googleusercontent.com';

function Login() {
    const history = useHistory();
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    history.push('/');
   
    alert(
      `Logged in successfully welcome ${res.profileObj.name} 😍. `
    );
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
   
  };

  return (
    <div >
      
        <div style={{width:'100%', marginLeft:'auto', marginRight:'auto', textAlign:'center', Height:'100%'}}>
        <img src={IITRlogo} style={{width:'10%', height:'10%'}}/>
            <h2>Time Table Management System</h2>
            <h3>Electrical Engineering Department</h3>
            <h3>IIT Roorkee</h3>
           
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with Google" 
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
       </div>
    </div>
  );
}

export default Login;