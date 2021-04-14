
export function getAppointmentsForDay (state, day) {
  
  const newDay = state.days
  
  if (newDay === undefined) {

    return [];
  }
  
  const whichDay = newDay.filter(x => 
          x.name === day)[0];

  if (whichDay === undefined) {
    return [];
  };

  

  const selectedAppointments = whichDay.appointments.map(x => 
            state.appointments[x]);
  
    return selectedAppointments;

};
