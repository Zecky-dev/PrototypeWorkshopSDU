import * as yup from 'yup';

const Error = {
    email: "Geçersiz e-posta adresi.",
    string: "Geçersiz dize formatı.",
    numeric:"Bu alana sayısal bir ifade girmelisiniz.",
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

const materialValidations = {
    materialName: yup.string(Error['string']).required(Error['required']),
    materialDescription: yup.string(Error['string']).required(Error['required']),
    materialUnit:yup.number(Error['numeric']).min(0,({min}) => Error['minCharacter'](min)).required(Error['required'])
}





const authValidationSchema = yup.object().shape(authValidations);
const materialValidationSchema = yup.object().shape(materialValidations);

export {authValidationSchema,materialValidationSchema};