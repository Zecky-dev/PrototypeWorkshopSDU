import * as yup from 'yup';

const Error = {
    email: "Geçersiz e-posta adresi.",
    string: "Geçersiz dize formatı.",
    required: "Bu alanın girilmesi zorunludur."
}


const authValidations = {
        email: yup
        .string(Error['string'])
        .email(Error['email'])
        .required(Error['required']),

        password: yup
        .string(Error['string'])
        .required(Error['required']),

}

const authValidationSchema = yup.object().shape(authValidations);

export {authValidationSchema};