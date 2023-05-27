import React from 'react';
import PropTypes from 'prop-types';
import Scrollbars from 'react-custom-scrollbars';
import { Draggable, Droppable } from 'react-drag-and-drop';
import SolidMationLogo from 'images/solidmation-logo.png';
import StrixLogo from 'images/strix-logo.png';
import LabelledIcon from '../../../LabelledIcon';
import './HomeList.scss';

const HomeList = ({ firstList, secondList, onDrop }) => {
  const scrollbarsStyle = { height: '85%', width: '100%' };
  return (
    <div className="home-list-container">
      <div className="home-list">
        <img src={StrixLogo} alt="Strix" />
        <Scrollbars style={scrollbarsStyle} className="division-line">
          {
            secondList != null &&
            secondList.map(home => (
              <Droppable
                key={home.id}
                types={['home']}
                onDrop={draggable => onDrop(JSON.parse(draggable.home), home)}
                className="home-item"
              >
                <Draggable
                  key={home.id}
                  type="home"
                  data={JSON.stringify(home)}
                  className="home-item draggable-item"
                >
                  <LabelledIcon
                    label={home.label}
                    icon="icon-service-home"
                    colorClass="color-primary-color"
                  />
                </Draggable>
              </Droppable>
            ))
          }
        </Scrollbars>
      </div>

      <div className="home-list">
        <img src={SolidMationLogo} alt="Strix" />
        <Scrollbars style={scrollbarsStyle}>
          {
            firstList != null &&
            firstList.map(home => (
              <Droppable
                key={home.id}
                types={['home']}
                onDrop={draggable => onDrop(home, JSON.parse(draggable.home))}
                className="home-item"
              >
                <Draggable
                  key={home.id}
                  type="home"
                  data={JSON.stringify(home)}
                  className="home-item draggable-item"
                >
                  <LabelledIcon
                    label={home.label}
                    icon="icon-service-home"
                  />
                </Draggable>
              </Droppable>
            ))
          }
        </Scrollbars>
      </div>
    </div>
  );
};

HomeList.propTypes = {
  onDrop: PropTypes.func,
  firstList: PropTypes.array,
  secondList: PropTypes.array,
};

export default HomeList;
