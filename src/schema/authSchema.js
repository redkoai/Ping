import * as yup from 'yup';

const AUTH_SCHEMA = yup.object().shape({
  email: yup.string().required('required').email('must be email'),
  password: yup.string().required('required').min(6, 'must be 6 or more chars'),
});

export default AUTH_SCHEMA;
