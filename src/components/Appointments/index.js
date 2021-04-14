import React from "react";
import Header from './header'
import Show from './show'
import Empty from './empty'




export default function Appointment(props) {


 

  return <article className="appointment">
        <Header time={props.time} />
        {props.interview ? <Show /> : <Empty />}
  </article>
  
}