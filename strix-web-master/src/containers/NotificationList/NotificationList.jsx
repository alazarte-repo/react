import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { NotificationItem } from '../../components/Notifications';

class NotificationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alreadyScrolled: false,
    };
    this.scrollbarRef = null;
    this.itemRefs = {};
    this.handleScrollStop = this.handleScrollStop.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.alreadyScrolled &&
        nextProps.selectedId != null &&
        this.scrollbarRef != null &&
        this.itemRefs[nextProps.selectedId] != null) {
      this.scrollbarRef.scrollTop(this.itemRefs[nextProps.selectedId]);
      this.setState({ alreadyScrolled: true });
    }
  }

  handleScrollStop() {
    const distanceFromTop = this.scrollbarRef.getValues().top;
    if (distanceFromTop >= 0.9 && !this.props.loading) {
      this.props.getNotifications(this.props.page);
    }
  }

  render() {
    return (
      <Scrollbars
        style={{ height: '100%', width: '100%' }}
        ref={(scrollbar) => { this.scrollbarRef = scrollbar; }}
        onScrollStop={this.handleScrollStop}
      >
        {
          this.props.list != null &&
          this.props.list.length > 0 &&
          this.props.list.map(n => (
            <div
              ref={(item) => {
                this.itemRefs[n.id] = item != null ? item.getBoundingClientRect().top - 100 : null;
              }}
              key={n.id}
            >
              <NotificationItem
                id={n.id}
                icon={n.icon}
                subject={n.subject}
                body={n.body}
                time={n.humanizedTimestamp}
                read={n.read}
                onClick={this.props.onClickNotification}
                highlightActive={this.props.highlightActive}
                showGoArrow={!this.props.highlightActive}
              />
            </div>
          ))
        }
      </Scrollbars>
    );
  }
}

NotificationList.propTypes = {
  getNotifications: PropTypes.func,
  onClickNotification: PropTypes.func,
  list: PropTypes.array,
  highlightActive: PropTypes.bool,
  loading: PropTypes.bool,
  page: PropTypes.number,
  selectedId: PropTypes.string,
};

NotificationList.defaultProps = {
  highlightActive: true,
};

export default NotificationList;
