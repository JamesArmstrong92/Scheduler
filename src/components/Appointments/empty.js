import React from "react";
import "components/Appointments/styles.scss";


export default function Empty(props) {



  return (<main className="appointment__add">
  <img
    className="appointment__add-button"
    src="images/add.png"
    alt="Add"
    onclick={props.onAdd}
  />
</main>)
  
};