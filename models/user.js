import mongoose from 'mongoose'
import Joi from 'joi';

const user = mongoose.Schema({
    username: {
        type:String,
        required: true,
    },
    email: {
        type:String,
        required: true,
    },
    phone: {
        type:Number,
        required: true,
    },
    password: {
        type:String,
        required: true,
    },
})

// RegistrationUser.methods.joiValidate = () => {
//     let schema = {
//         username: Joi.types.String().min(6).max(30).required(),
//         password: Joi.types.String().min(8).max(30).regex(/[a-zA-Z0-9]{3,30}/).required(),
//         phone: Joi.types.String().required().regex(/[0-9]/)
//     }
// }

const User = mongoose.model('User', user);

export default User;