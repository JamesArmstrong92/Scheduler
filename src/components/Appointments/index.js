import React from "react";
import Header from './header'
import Show from './show'
import Empty from './empty'
import Form from "./form";
import Status from "./status"
import Confirm from "./confirm";
import Error from "./error";
import useVisualMode from 'hooks/useVisualMode'
import "./styles.scss";



export default function Appointment(props) {
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE ="CREATE";
  const SAVING ="SAVING";
  const CONFIRM="CONFIRM";
  const DELETE = "DELETE";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE  = "ERROR_DELETE ";

  const { mode, transition, back } = useVisualMode(
    props.interview ? Show  : Empty 
    );


    function save(name, interviewer) {
      const interview = {
        student: name,
        interviewer
      };
  
      transition(SAVING);
      props.bookInterview(props.id, interview)
        .then(() => {
          transition(SHOW)
        })
        .catch(err => {
          transition(ERROR_SAVE, true)
        })
    };
  
    
    function destroy(id) {
      transition(DELETE, true)
      props.cancelInterview(props.id)
        .then(() => {
          transition(EMPTY);
        })
        .catch(err => {
          transition(ERROR_DELETE, true);
        })
    };
  
  
  return <article className="appointment">
        <Header 
        time={props.time} />
        {mode === EMPTY  &&  
        <Empty 
        onAdd={event => transition(CREATE)} />}
        {mode === SHOW   && 
        (<Show 
               student      ={props.interview.student} 
               interviewer  ={props.interview.interviewer}
               onDelete={() => transition(CONFIRM)}
               onEdit={()   => transition(EDIT)}
               />)}

        {mode === CREATE && 
        (<Form 
          interviewers={props.interviewers} 
          onSave      = {save} 
          onCancel    = {back}
          />)}
        {mode === SAVING && 
        <Status
                message={`Saving...`} 
          />}
         {mode === CONFIRM && 
         <Confirm
            message={`Please confirm?`}
            onCancel={back}
            onConfirm={destroy} 
            />}
        {mode === DELETE && 
        <Status
        message={`Deleting...`} 
        />}
        {mode === EDIT && 
        <Form
          onCancel={back}
          onSave={save}
          interviewers={props.interviewers}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />}
         {mode === ERROR_SAVE && (
         < Error
            onClose={back}
            message={`Cannot SAVE - Cannot connect to server...`}
    />)}
    {mode === ERROR_DELETE && 
    (< Error
      onClose={back}
      message={`Cannot DELETE - Cannot connect to server... `}
    />)}




  </article>
  
}