import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import AdvertisingBanner from '../../components/AdvertisingBanner';
import ThingCard from '../ThingCard';
import './CardList.scss';

function CardsList(props) {
  const { things, sharedLocationCard, loyalityViewEvent, selectedCard } = props;
  const thereAreThings = things.length > 0;
  let elements = [];
  if (sharedLocationCard.list.length > 0) {
    elements.push(sharedLocationCard);
  }
  if (thereAreThings) {
    elements = elements.concat(things);
  }
  return (
    <div className="card-list">
      <Scrollbars
        style={{ height: '100%', width: '100%', backgroundColor: '#e4e4e4' }}
        renderTrackHorizontal={v => <div {...v} className="track-horizontal" style={{ display: 'none' }} />}
        renderThumbHorizontal={v => <div {...v} className="thumb-horizontal" style={{ display: 'none' }} />}
      >
        {
          elements.map(thing => (
            <ThingCard
              id={thing.id}
              key={thing.id}
              cardProps={thing}
              expanded={false}
              selected={selectedCard === thing.id}
              selectCard={() => props.selectCard(thing.id)}
              expandCard={() => props.expandCard(thing.id)}
            />))
        }
      </Scrollbars>
      <AdvertisingBanner
        className="bottom-banner"
        onClick={loyalityViewEvent}
      />
    </div>
  );
}

CardsList.propTypes = {
  things: PropTypes.array,
  selectedCard: PropTypes.string,
  sharedLocationCard: PropTypes.object,
  loyalityViewEvent: PropTypes.func,
};

export default CardsList;
