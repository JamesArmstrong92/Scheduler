import React from "react";
import "components/InterviewerList.scss";
import classNames from "classnames";
import InterviewerListItem from "components/InterviewerListItem";



export default function InterviewerList(props) {

  const interviewers = props.interviewers.map(interviewer => {
    return ( <InterviewerListItem 
      key             = {interviewer.id}
      id              = {interviewer.id}
      name            = {interviewer.name} 
      avatar          = {interviewer.avatar} 
      selected        = {interviewer.id === props.value}
      setinterviewer  = {event => props.setInterviewer(interviewer.id)} 
      />
    );
  });

  
  return (<section className='interviewers'onClick={props.setInterviewer}>
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{interviewers}</ul>
</section>)
};