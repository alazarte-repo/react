import React from 'react';
import PropTypes from 'prop-types';
import WithLocation from './WithLocation/WithLocation';
import WithLink from './WithLink/WithLink';
import NotificationDetailType from '../../constants/notificationDetailType';

const NotificationEventDetails = ({ eventDetail, detailType }) => {
  switch (detailType) {
    case NotificationDetailType.WithLocation:
      return <WithLocation {...eventDetail} />;
    case NotificationDetailType.WithLink:
      return <WithLink {...eventDetail} />;
    default:
      return null;
  }
};

NotificationEventDetails.propTypes = {
  detailType: PropTypes.string,
  eventDetail: PropTypes.object,
};

export default NotificationEventDetails;
