import mongoose from 'mongoose'
import Joi from 'joi';

const registrationUser = mongoose.Schema({
    username: String,
    email: String,
    phone: String,
    password: String,
})

// RegistrationUser.methods.joiValidate = () => {
//     let schema = {
//         username: Joi.types.String().min(6).max(30).required(),
//         password: Joi.types.String().min(8).max(30).regex(/[a-zA-Z0-9]{3,30}/).required(),
//         phone: Joi.types.String().required().regex(/[0-9]/)
//     }
// }

const RegistrationUser = mongoose.model('RegistrationUser', registrationUser);

export default RegistrationUser;