import React, { useState } from "react";
import "components/Appointments/styles.scss";
import Button from '../Button';
import InterviewerList from '../InterviewerList'



export default function Form(props) {


  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  
    const reset = function() {

      setName('')
      setInterviewer(null)
    };

    const cancel = function() {
      reset();
      props.onCancel();
    };

  return (<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        onChange={event => setName(event.target.value)}
        value={name}
        /*
          This must be a controlled component
        */
      />
    </form>
    <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={event => cancel()}>Cancel</Button>
      <Button confirm onClick={props.save}>Save</Button>
    </section>
  </section>
</main>)
  
}