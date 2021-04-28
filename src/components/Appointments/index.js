import React from "react";
import "./styles.scss";
import Header from "./header";
import Show from "./show";
import Empty from "./empty";
import Form from "./form";
import Status from "./status"
import Confirm from "./confirm";
import Error from "./error";
import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETE = "DELETE";
  const EDIT = "EDIT"
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function destroy(val) {
    transition(DELETE, true)
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(err => {
        transition(ERROR_DELETE, true);
      })
  };
  
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
  
  


  return (<article className="appointment" data-testid="appointment">

    <Header time={props.time} />
    {mode === EMPTY && 

    <Empty onAdd={() => transition(CREATE)} />}
    
    {mode === SHOW && (
      
      <Show
        student={props.interview.student}
        id={props.id}
        interviewer={props.interview.interviewer}
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)}
      />
    )}

    {mode === CREATE && 
    
    < Form
      onCancel={back}
      interviewers={props.interviewers}
      onSave={save}
    />}

    {mode === SAVING && 
    
    < Status
      message={`Saving... please wait`} />}

    {mode === CONFIRM && 
    
    < Confirm
      message={`Are you sure?`}
      onCancel={back}
      onConfirm={destroy} />}

    {mode === DELETE && 
    
    < Status
      message={`Deleting... please wait`} />}

    {mode === EDIT && 
    
    < Form
      onCancel={back}
      onSave={save}
      interviewers={props.interviewers}
      name={props.interview.student}
      interviewer={props.interview.interviewer.id}
    />}

    {mode === ERROR_SAVE && 
    
    (< Error
      onClose={back}
      message={`Cannot SAVE - Cannot connect to server...`}
    />)}

    {mode === ERROR_DELETE && 
    (< Error
      onClose={back}
      message={`Cannot DELETE - Cannot connect to server... `}
    />)}
  </article>);
};