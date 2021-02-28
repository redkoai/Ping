import * as yup from 'yup';

export const EVENT_SCHEMA = yup.object().shape({
  event: yup
    .string()
    .min(2, "Event name should be greater than 2 characters")
    .required('Please enter event name'),
});

export const STARTDATE_SCHEMA = yup.object().shape({
  startdate: yup
    .date()
    .required('Please select start date'),
});

export const ENDDATE_SCHEMA = yup.object().shape({
  enddate: yup
    .date()
    .when(
      'startdate',
      (startdate, schema) => (startdate && schema.min(startdate)),
    )
    .required('Please select end date'),
});


// export const DRESSCODE_SCHEMA = yup.object().shape({
//     dresscode: yup
//       .string()
//       .required('Please select any dress code')
      
//   });

export const DRESSCODECOLOR_SCHEMA = yup.object().shape({
    dresscode: yup
      .string()
      .min(2, "Dress color should be greater than 2 characters")
      .required('Please write any color on your mind')
      
  });

export const FAQQUESTION_SCHEMA = yup.object().shape({
    faqquestion: yup
      .string()
      .min(2, "Question should be greater than 2 characters")
      .required('Please type your question')
      
  });

const INVITE_SCHEMA = yup.object().shape({
  ...EVENT_SCHEMA.fields,
  //...STARTDATE_SCHEMA.fields,
  //...ENDDATE_SCHEMA.fields,
  // ...DRESSCODE_SCHEMA.fields,
  ...DRESSCODECOLOR_SCHEMA.fields,
  ...FAQQUESTION_SCHEMA.fields,
});

export default INVITE_SCHEMA;
