const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// DB Import _________________________________________________________
const dbConnection = require('./utilities/dbConnect');
// All Routes__________________________________________________________
const userRoute = require('./routes/v1/users.route');
const artistRoute = require('./routes/v1/artist.route');



// middleware Start_________________________________
app.use(cors());
app.use(express.json());
// middleware End___________________________________

// MongoDB Connected________________________________
dbConnection.connectToServer();

// USERS API________________________/////
app.use('/api/v1/users', userRoute);
app.use('/api/v1/artist', artistRoute);


















// Backend Bottom Part ____________________
app.get('/', (req, res) => {
    res.send('Backend Running');
});
app.all('*', (req, res) => {
    res.send('No Routes Found')
})
app.listen(port, () => {
    console.log('Backend Console', port);
});
