import React, { useState, useEffect } from "react";
import axios from 'axios';
import DayList from "components/DayList"
import Appointment from "components/Application"
import "components/Application.scss";



export default function Application(props) {

  // const days = [
  //   {
  //     id: 1,
  //     name: "Monday",
  //     spots: 2,
  //   },
  //   {
  //     id: 2,
  //     name: "Tuesday",
  //     spots: 5,
  //   },
  //   {
  //     id: 3,
  //     name: "Wednesday",
  //     spots: 0,
  //   },
  // ];

  const appointments = [
    {
      id: 1,
      time: "12pm",
    },
    {
      id: 2,
      time: "1pm",
      interview: {
        student: "Lydia Miller-Jones",
        interviewer: {
          id: 1,
          name: "Sylvia Palmer",
          avatar: "https://i.imgur.com/LpaY82x.png",
        }
      }
    }
  ];

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });
  console.log(day)


  useEffect(() => {
      axios.get('/api/days')
        .then(response => {
          console.log(response.data);
          setDays([...response.data])
          
      });
}, [])


  return (
    <main className="layout">
      <section className="sidebar">
        <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered"/>
<nav className="sidebar__menu"><DayList
  days={days}
  day={day}
  setDay={setDay}
/></nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
       {appointments.map(appointment => (
          <Appointment 
          key={appointment.id}
          {...appointment}
            />
       ))}
       <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

