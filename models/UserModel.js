const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: String, required: true, unique: true},
    country: {type: String, required: true},
    about: {type: String, required: false},
    account_created_at:{
        type: Date,
        default: Date.now
    },
    account_updated_at:{
        type: Date
    },
    account_last_login:{
        type: Date
    },
    user_avatar_url: {type: String, required: false},
    user_cover_url: {type: String, required: false},
    verification_question: {type: String, required: true},
    verification_answer: {type: String, required: true},
});

module.exports = mongoose.model('Users', UserSchema);
