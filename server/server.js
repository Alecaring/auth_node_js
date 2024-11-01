const express       = require('express');
const connectDB     = require('./Database/database');
const usersRoutes   = require('./Routers/usersRoutes');
const port          = 3000;
const app           = express();

connectDB();

app.use(express.json());
app.use('/', usersRoutes);

app.listen(port, () => {
    console.log(`server is listening at ${port} port`);
})