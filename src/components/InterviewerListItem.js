import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";



export default function InterviewListItem(props) {

  const className = classNames({
    'interviewer-list__item': true,
    'interviewer-list__item--selected': props.selected

  })

  

  return (<li className={className} onClick={props.setInterviewer}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  
  {props.selected && props.name} 
</li>)
};