
import * as yup from 'yup';

export const FAQ_SCHEMA = yup.object().shape({
    // faqpeoplepark: yup
    //     .string() ,
    // faqsecretcode: yup
    //     .number() ,
    // faqguests: yup
    //     .string()   ,
    // faqquestion: yup
    //     .string()
    //     .min(2, "Question should be greater than 2 characters")
    //     .required('Please type your question')  ,    
    });
         
export default FAQ_SCHEMA;