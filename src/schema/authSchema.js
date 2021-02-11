import * as yup from 'yup';

export const EMAIL_SCHEMA = yup.object().shape({
  email: yup
    .string()
    .required('You must enter an email.')
    .email('Please enter a valid email address.'),
});

export const PASSWORD_SCHEMA = yup.object().shape({
  password: yup
    .string()
    .required('You must enter a password.')
    .min(6, 'Password is too short.'),
});

const AUTH_SCHEMA = yup.object().shape({
  ...EMAIL_SCHEMA.fields,
  ...PASSWORD_SCHEMA.fields,
});

export default AUTH_SCHEMA;
