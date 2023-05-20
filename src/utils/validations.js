import * as yup from 'yup';

const Error = {
    email: "Geçersiz e-posta adresi.",
    string: "Geçersiz dize formatı.",
    required: "Bu alanın girilmesi zorunludur.",
    minCharacter: (min) => `Bu alana en az ${min} karakter girmelisiniz.`,
    maxCharacter: (max) => `Bu alana en fazla ${max} karakter girmelisiniz.`
}


const authValidations = {
        email: yup
        .string(Error['string'])
        .email(Error['email'])
        .required(Error['required']),

        password: yup
        .string(Error['string'])
        .min(8,({min}) => Error['minCharacter'](min))
        .max(16,({max}) => Error['maxCharacter'](max))
        .required(Error['required']),

}

const authValidationSchema = yup.object().shape(authValidations);

export {authValidationSchema};