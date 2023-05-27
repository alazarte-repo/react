/* eslint-disable react/no-string-refs */
import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import CardType from '../../constants/cardType';
import WorkingIcon from '../../components/WorkingIcon';
import ThingCard from '../ThingCard';
import './SingleCard.scss';

class SingleCard extends React.Component {
  constructor(props) {
    super(props);
    this.pageCount = 0;
    this.ref = 'scrollbars';
    this.type = this.props.thing ? this.props.thing.type : null;
  }

  componentWillMount() {
    if (this.props.match.params.thingId) this.props.selectCard(this.props.match.params.thingId);
  }

  componentDidMount() {
    this.paginationHandler();
  }

  componentWillUnmount() {
    this.pageCount = 0;
  }

  handleScrollStop = () => {
    const { scrollbars } = this.refs;
    const distanceFromTop = scrollbars.getValues().top;
    if (distanceFromTop >= 0.9 && !this.props.loading) {
      this.paginationHandler();
    }
  }

  paginationHandler = () => {
    this.pageCount += 1;

    switch (this.type) {
      case CardType.Vehicle:
        this.props.showTripList(
          this.props.match.params.thingId,
          this.pageCount,
        );
        break;
      case CardType.Flex:
        this.props.getLocalHistory(
          this.props.match.params.thingId,
          this.pageCount,
        );
        break;
      default:
        break;
    }
  }

  render() {
    const { thing } = this.props;
    return (
      <div className="single-card">
        <Scrollbars
          style={{ height: '100%', width: '100%' }}
          ref={this.ref}
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          onScrollStop={this.handleScrollStop}
          renderTrackHorizontal={props => <div {...props} className="track-horizontal" style={{ display: 'none' }} />}
          renderThumbHorizontal={props => <div {...props} className="thumb-horizontal" style={{ display: 'none' }} />}
        >
          {
            thing &&
            <ThingCard
              id={thing.id}
              key={thing.id}
              cardProps={thing}
              expanded
              selected
              selectCard={() => this.props.selectCard(thing.id)}
              expandCard={() => this.props.expandCard(thing.id)}
            />
          }
        </Scrollbars>
        {
          this.props.loading &&
          <WorkingIcon
            message={this.props.loadingMessage}
            width="100%"
            height="200px"
            textSize="16pt"
            spinnerSize="40pt"
            textSeparation="12px"
          />
        }
      </div>
    );
  }
}

SingleCard.propTypes = {
  loading: PropTypes.bool,
  loadingMessage: PropTypes.string,
  match: PropTypes.object,
  selectCard: PropTypes.func,
  expandCard: PropTypes.func,
  thing: PropTypes.object,
  showTripList: PropTypes.func,
  getLocalHistory: PropTypes.func,
};


export default SingleCard;
