const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Il nome utente è obbligatorio'],
        unique: true,
        minlength: 3,
        maxlength: 30,
        trim: true,
    },
    name: {
        type: String,
        required: [true, 'Il nome è obbligatorio'],
        trim: true,
        maxlength: 50,
    },
    surname: {
        type: String,
        required: [true, 'Il cognome è obbligatorio'],
        trim: true,
        maxlength: 50,
    },
    email: {
        type: String,
        required: [true, "L'email è obbligatoria"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+\@.+\..+/, 'Inserisci un indirizzo email valido'],
    },
    password: {
        type: String,
        required: [true, 'La password è obbligatoria'],
        minlength: 8,
    },
    token: {
        type: String,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('User', UserSchema);
