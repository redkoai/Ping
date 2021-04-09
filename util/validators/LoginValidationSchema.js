import * as yup from 'yup'

export default LoginValidationSchema = yup.object().shape({
    // Email validation, 
  email: yup
    .string()
    .email("Please enter valid email")
    .required('Email Address is Required'),
    // Password validation
  password: yup
    .string()
    .min(5, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
    // Confirmation of password
})



