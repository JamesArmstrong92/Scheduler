import React from "react";
import './DayListItem.scss'
import classNames from "classnames";

export default function DayListItem(props) {

  const formatSpots = function(props) {

      if (props.spots > 1)
        return `${props.spots} remaining`;
      
      if (props.spots === 0) 
        return `${props.spots} remaining`;

        return `0 spots remaining`;
    
  };

  const dayClassNames = classNames({

    'day-list__item': true,
    'day-list__item--selected': props.selected,
    'day-list__item--full': !props.spots

  });

  return (
    <li className={dayClassNames} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props)}</h3>
    </li>
  );
}