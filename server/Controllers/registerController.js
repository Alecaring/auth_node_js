const User = require('../Models/UserModel');
const bcrypt = require('bcrypt');

class RegisterController {

    static async createUser(request, response) {
        try {
            const { username, name, surname, email, password } = request.body;

            // Controlli sui campi obbligatori
            if (!username || !name || !surname || !email || !password) {
                return response.status(400).json({ message: 'Tutti i campi sono obbligatori' });
            }

            // Controllo della lunghezza dell'username
            if (username.length < 3 || username.length > 30) {
                return response.status(400).json({ message: 'Il nome utente deve avere tra 3 e 30 caratteri.' });
            }

            // Controllo della lunghezza della password
            if (password.length < 8) {
                return response.status(400).json({ message: 'La password deve avere almeno 8 caratteri.' });
            }

            // Controllo dell'unicità dell'email
            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                return response.status(400).json({ message: 'L\'email è già in uso.' });
            }

            // Controllo dell'unicità dell'username
            const existingUsername = await User.findOne({ username });
            if (existingUsername) {
                return response.status(400).json({ message: 'Il nome utente è già in uso.' });
            }

            // Crittografia della password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Crea un nuovo utente
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

};

module.exports = RegisterController;
