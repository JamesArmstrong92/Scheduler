import React from "react";
import Button from '../Button'
import "components/Appointments/styles.scss";


export default function Confirm(props) {



  return (<main className="appointment__card appointment__card--confirm">
  <h1 className="text--semi-bold">Delete the appointment?</h1>
  <section className="appointment__actions">
    <Button danger onclick={props.onCancel}>Cancel</Button>
    <Button danger onclick={props.onConfirm}>Confirm</Button>
  </section>
</main>)
}