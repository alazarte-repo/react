import React from 'react';
import ForgotPassword from '../../components/ForgotPassword';
import AlternativeLayout from '../AlternativeLayout';


function ForgotPasswordLayout(props) {
  return (
    <AlternativeLayout>
      <ForgotPassword {...props} />
    </AlternativeLayout>
  );
}

export default ForgotPasswordLayout;
