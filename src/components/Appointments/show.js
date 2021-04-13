import React from "react";
import "components/Appointments/styles.scss";



export default function Show(props) {



  return (<main className="appointment__card appointment__card--show">
  <section className="appointment__card-left">
    <h2 className="text--regular">Lydia Miller-Jones</h2>
    <section className="interviewer">
      <h4 className="text--light">Interviewer</h4>
      <h3 className="text--regular">{props.interview.name}</h3>
    </section>
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <img
        className="appointment__actions-button"
        src="images/edit.png"
        alt="Edit"
        onclick={props.onEdit}
      />
      <img
        className="appointment__actions-button"
        src="images/trash.png"
        alt="Delete"
        onclick={props.onDelete}
      />
    </section>
  </section>
</main>)
  
}