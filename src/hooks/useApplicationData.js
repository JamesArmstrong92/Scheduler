import axios from 'axios';
import { useEffect, useState } from "react";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
  }, [])


  
  function getZero(day, appointments) {
    const output = 0;

    for (const val of day.appointments) {
      const newAppointment = appointments[val];
      if (!newAppointment.interview) {
        output++
      }
    }
    return output;
  };

  
  function updateSpots(dayName, days, appointments) {
    const spread = [...days];
    const nulls = getZero(day, appointments);
    const day = spread.find(itmem => itmem.name === dayName);
    day.spots = nulls;

    return spread;
  };

  
  const setDay = day => setState({ ...state, day });

  
  function bookInterview(id, interview) {
    const appointment = {
      interview: { 
        ...interview 
      },
      ...state.appointments[id]
    };

    const appointments = {
      [id]: appointment,
      ...state.appointments
    };

    const days = updateSpots(state.day, state.days, appointments);

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({
          ...state,
          appointments,
          days
        });
      });
  };

  
  function cancelInterview(id) {
    const appointment = {
      interview: null,
      ...state.appointments[id]
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updateSpots(state.day, state.days, appointments);

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({
        ...state,
        appointments,
        days
      })
    })
  };

  return { state, setDay, cancelInterview, bookInterview };
};