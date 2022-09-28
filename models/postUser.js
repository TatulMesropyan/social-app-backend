import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    phone: String,
    password: String,
    confirmPassword: String,
})

const PostUser = mongoose.model('PostUser', userSchema);

export default PostUser;