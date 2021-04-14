
export function getAppointmentsForDay (state, day) {
  
  const newDay = state.days
  
  !newDay ? [] : null 
  
  const whichDay = newDay.filter(x => 
          x.name === day)[0];

  if (!whichDay) {
    return [];
  };

  !whichDay ? [] : null;

  const selectedAppointments = whichDay.appointments.map(x => 
            state.appointments[x]);
  
    return selectedAppointments;

};
