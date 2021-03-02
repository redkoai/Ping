import * as yup from 'yup';

export const DETAILS_SCHEMA = yup.object().shape({
  event: yup
    .string()
    .min(2, "Event name should be greater than 2 characters")
    .required('Please enter event name'),

  'co-host-0': yup
    .string()
    .required('Please enter co host name'),

  description: yup
    .string()
    .required('Please enter description'),
  
});

// export const STARTDATE_SCHEMA = yup.object().shape({
//   startdate: yup
//     .date()
//     .required('Please select start date'),
// });

// export const ENDDATE_SCHEMA = yup.object().shape({
//   enddate: yup
//     .date()
//     .when(
//       'startdate',
//       (startdate, schema) => (startdate && schema.min(startdate)),
//     )
//     .required('Please select end date'),
// });

// export const LOCATION_SCHEMA = yup.object().shape({
//   location: yup
//     .string()
//     .required('Please select any location'),
// });

export default DETAILS_SCHEMA;


