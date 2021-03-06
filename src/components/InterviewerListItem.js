import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

//Renders individual interviewer items for interviewer list
export default function InterviewerListItem(props) {
  const className = classNames({
    "interviewers__item": true,
    "interviewers__item--selected": props.selected
  });

  return(
  <li className={className} onClick={props.setInterviewer}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {props.selected? props.name : ""} 
</li>
  );
};