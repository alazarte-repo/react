import React from 'react';
import Error404 from '../../components/Error404';
import AlternativeLayout from '../AlternativeLayout';


function NotFound() {
  return (
    <AlternativeLayout>
      <Error404 />
    </AlternativeLayout>
  );
}

export default NotFound;
