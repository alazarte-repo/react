import React from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-bootstrap';
import CardExpandedInfo from '../shared/CardExpandedInfo';
import Segment from './Segment';
import './Location.scss';

class Location extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: true,
    };
  }

  getName = (memberId) => {
    const member = this.props.familyUsers.find(m => m.id === memberId);
    return member ? member.first_name : '';
  }

  expandCard = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  }

  renderBasicInfo = () => (
    <CardExpandedInfo
      name="Compartiendo ubicación"
      icon="shared-location"
      expandCard={this.expandCard}
      expanded={this.state.expanded}
    />
  )

  render() {
    return (
      <div>
        {this.renderBasicInfo()}
        <Collapse in={this.state.expanded}>
          <div>
            {this.props.cardProps.list.map(item => (
              <Segment
                key={item.user_id}
                user_id={item.user_id}
                parsedTime={item.parsedTime}
                parsedAddress={item.location}
                name={this.getName(item.user_id)}
                selectMember={() => { this.props.selectMember(item.user_id); }}
                selected={this.props.selectedMember === item.user_id}
              />
            ))}
          </div>
        </Collapse>
      </div>
    );
  }
}

Location.propTypes = {
  cardProps: PropTypes.shape({
    id: PropTypes.string,
    list: PropTypes.array,
  }),
  selectMember: PropTypes.func,
  selectedMember: PropTypes.string,
  familyUsers: PropTypes.array,
};

export default Location;
