const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
// DB Import ______________
const dbConnection = require('./utilities/dbConnect');
// USERS Routs_____________
const userRoute = require('./routes/v1/users.route')


// middleware Start_________________________________
app.use(cors());
app.use(express.json());
// middleware End___________________________________

// MongoDB Connected_______________________________
dbConnection.connectToServer();

// USERS API________________________/////
app.use('/api/v1/users', userRoute)







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
