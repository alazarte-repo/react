import React from 'react';
import Registration from '../../containers/Registration';
import AlternativeLayout from '../AlternativeLayout';


function FirstLoginLayout(props) {
  return (
    <AlternativeLayout>
      <Registration {...props} />
    </AlternativeLayout>
  );
}

export default FirstLoginLayout;
