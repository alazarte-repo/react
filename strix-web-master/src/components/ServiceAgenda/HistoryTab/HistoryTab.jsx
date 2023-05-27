import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Scrollbars from 'react-custom-scrollbars';
import ReminderHistoryItem from './ReminderHistoryItem';
import WorkingIcon from '../../WorkingIcon';
import './HistoryTab.scss';

class HistoryTab extends Component {
  constructor(props) {
    super(props);
    this.scrollbarRef = null;
    this.handleScrollStop = this.handleScrollStop.bind(this);
  }

  handleScrollStop() {
    const distanceFromTop = this.scrollbarRef.getValues().top;
    if (distanceFromTop >= 0.9 && !this.props.loading && !this.props.noMorePages) {
      this.props.getMoreItems(this.props.thingId);
    }
  }

  render() {
    return (
      <div className="history-tab-container">
        <Scrollbars
          style={{ height: '100%', width: '100%' }}
          ref={(scrollbar) => { this.scrollbarRef = scrollbar; }}
          onScrollStop={this.handleScrollStop}
          renderTrackHorizontal={properties => <div {...properties} className="track-horizontal" style={{ display: 'none' }} />}
          renderThumbHorizontal={properties => <div {...properties} className="thumb-horizontal" style={{ display: 'none' }} />}
        >
          {
            this.props.services.length > 0 &&
            this.props.services.map(service => (
              <ReminderHistoryItem
                key={service.id}
                name={service.name}
                icon={service.icon}
                date={service.date}
                mileage={service.mileage}
              />
            ))
          }
          {
            this.props.services.length === 0 &&
            <div className="empty-list">
              <h4> No hay servicios completados. </h4>
            </div>
          }
        </Scrollbars>
        {
          this.props.loading &&
          <WorkingIcon
            message="Cargando..."
            width="100%"
            textSize="14pt"
            spinnerSize="36pt"
            textSeparation="12px"
          />
        }
      </div>
    );
  }
}

HistoryTab.propTypes = {
  services: PropTypes.array,
  loading: PropTypes.bool,
  noMorePages: PropTypes.bool,
  thingId: PropTypes.string,
  getMoreItems: PropTypes.func,
};

HistoryTab.defaultProps = {
  services: [],
};

export default HistoryTab;
