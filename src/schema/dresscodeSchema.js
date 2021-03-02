
import * as yup from 'yup';

export const DRESSCODE_SCHEMA = yup.object().shape({
    // 'radio-buttons': yup
    //     .string()
    //     .required('Please select any dress code'),
    dresscode: yup
        .string()
        .min(2, "Dress color should be greater than 2 characters")
        .required('Please write any color on your mind'),
    
        
    });

export default DRESSCODE_SCHEMA;