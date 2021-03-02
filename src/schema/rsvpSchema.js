
import * as yup from 'yup';

export const RSVP_SCHEMA = yup.object().shape({
    'collect-rsvp': yup
        .boolean()  ,
        // .required('Please switch'),
    'request-num-of-kids': yup
        .boolean() ,
    'total-invited': yup
        .number() ,
    'show-guest-list': yup
         .boolean()    
    });

    export default RSVP_SCHEMA;
  
