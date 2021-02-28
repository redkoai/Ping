import * as yup from 'yup';

export const EVENT_SCHEMA = yup.object().shape({
  event: yup
    .string()
    .required('Please enter event name'),
});

export const DRESSCODE_SCHEMA = yup.object().shape({
    dresscode: yup
      .string()
      .required('Please select any dress code')
      
  });

export const DRESSCODECOLOR_SCHEMA = yup.object().shape({
    dresscode: yup
      .string()
      .required('Please write any color on your mind')
      
  });

export const FAQQUESTION_SCHEMA = yup.object().shape({
    faqquestion: yup
      .string()
      .required('Please type your question')
      
  });

const INVITE_SCHEMA = yup.object().shape({
  ...EVENT_SCHEMA.fields,
  ...DRESSCODE_SCHEMA.fields,
  ...DRESSCODECOLOR_SCHEMA.fields,
  ...FAQQUESTION_SCHEMA.fields,
});

export default INVITE_SCHEMA;
