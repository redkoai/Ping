import * as yup from 'yup'

export default SignUpValidationSchema = yup.object().shape({
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
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required')
})



