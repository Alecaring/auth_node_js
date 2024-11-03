const User = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { use } = require('../Routers/usersRoutes');
const { query } = require('express');

class RegisterController {

    static async createUser(request, response) {
        try {
            const {
                username,
                name,
                surname,
                email,
                password
            } = request.body;

            if (!username || !name || !surname || !email || !password) {
                return response.status(400).json({ message: 'Tutti i campi sono obbligatori' });
            }

            if (username.length < 3 || username.length > 30) {
                return response.status(400).json({ message: 'Il nome utente deve avere tra 3 e 30 caratteri.' });
            }

            if (password.length < 8) {
                return response.status(400).json({ message: 'La password deve avere almeno 8 caratteri.' });
            }

            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                return response.status(400).json({ message: "L'email è già in uso." });
            }

            const existingUsername = await User.findOne({ username });
            if (existingUsername) {
                return response.status(400).json({ message: 'Il nome utente è già in uso.' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                username,
                name,
                surname,
                email,
                password: hashedPassword // Salva la password crittografata
            });

            await newUser.save();

            return response.status(201).json({ message: 'Utente creato con successo', user: newUser });

        } catch (error) {
            return response.status(400).json({ message: 'Errore nella creazione dell\'utente', error: error.message });
        }
    }

    static async getAllUsers(request, response) {
        try {
            const users = await User.find();
            response.send(users);
        } catch (error) {
            return response.status(400).json({ message: 'errore' })
        }

    }

    static async request(request, response) {
        response.json({
            method: request.method,
            url: request.url,
            path: request.path,
            query: request.query,
            params: request.params,
            body: request.body,
            headers: request.headers,
            cookies: request.cookies,   // Richiede il middleware 'cookie-parser'
            ip: request.ip,
            protocol: request.protocol,
            secure: request.secure,
            hostname: request.hostname,
            xhr: request.xhr,
            baseUrl: request.baseUrl,
            originalUrl: request.originalUrl
        });
    }

};

module.exports = RegisterController;
