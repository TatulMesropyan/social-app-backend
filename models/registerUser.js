import mongoose from 'mongoose'

const registrationUser = mongoose.Schema({
    username: String,
    email: String,
    phone: String,
    password: String,
})

const RegistrationUser = mongoose.model('RegistrationUser', registrationUser);

export default RegistrationUser;