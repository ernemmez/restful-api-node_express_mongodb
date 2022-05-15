const mongoose = require('mongoose');


const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        min:3,
        max:20
    },
    password: {
        type: String,
        required: true,
        min:6,
        max:1024
    },
    account_created_at: {
        type: Date,
        default: Date.now
    },
    account_updated_at: {
        type: Date
    },
    admin_role: {
        type: String,
        required: true,
        default: 'developer'
    }
});

module.exports = mongoose.model('Admin', AdminSchema);