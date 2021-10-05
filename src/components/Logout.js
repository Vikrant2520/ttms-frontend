import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { Route, useHistory } from 'react-router-dom';

const clientId =
  '435658737912-838sapfjlmvb85g4s6f867l2clto2knq.apps.googleusercontent.com';

function Logout() {
    const history = useHistory();
  const onSuccess = () => {
    console.log('Logout made successfully');
    history.push('/login');
    alert('Logout made successfully ✌');
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;