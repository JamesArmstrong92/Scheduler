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

export function getInterviewersForDay (state, day) {
  
  const newDay = state.days
  
  if (newDay === undefined) {
    
    return [];
  }
  
  const whichDay = newDay.filter(x => 
    x.name === day)[0];
    
    if (whichDay === undefined) {
      return [];
    };

    const selectedInterviews = whichDay.interviewers.map(x => 
      state.interviewers[x]);

  return selectedInterviews;
    
};


  export function getInterview (state, interview) {
  
    let output          = {};
    const whoInterviews = state.interviewers;
    
  
    if (whoInterviews && interview) {
      output = { 
        interviewer: state.interviewers[interview.interviewer], 
        student: interview.student
      }
    } else { 
      output = null;
    }
    return output;
  
  }