import axios from 'axios';
import { useEffect, useState } from "react";

export default function useApplicationData() {

  
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
  }, [])


  //interview spot counter
  function getNullSpots(day, appointments) {
    let count = 0;

    for (const id of day.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        count++
      }
    }

    return count;
  };

  //State

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });




  //FUnction that will update the spots that are remaining (if any)
  function updateSpots(dayName, days, appointments) {
    const output = [...days];
    const day = output.find(x => x.name === dayName);
    const none = getNullSpots(day, appointments);
    day.spots = none;

    return output;
  };

  
  const setDay = day => setState({ ...state, day });

  
  function bookInterview(id, interview) {
    const newAppointment = {

      ...state.appointments[id],
      interview: { ...interview },

    };

    const appointments = {

      ...state.appointments,
      [id]: newAppointment
      
    };

    
    return axios.put(`/api/appointments/${id}`, { interview })
    .then(() => {
        const days = updateSpots(state.day, state.days, appointments);
        setState({
          ...state,
          appointments,
          days
        });
      });
  };

 
  function cancelInterview(id) {
    const newAppointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: newAppointment
    };

    
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      const days = updateSpots(state.day, state.days, appointments);
      setState({
        ...state,
        appointments,
        days
      })
    })
  };




  return { state, setDay, cancelInterview, bookInterview };
};