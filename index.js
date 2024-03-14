const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// DB Import _________________________________________________________
const dbConnection = require('./utilities/dbConnect');
// Admin Dashboard All Routes_________________________________________________________
const adminLabelsRoutes = require('./routes/v1/AdminRoutes/AdminLabels.route');



// User Dashboard All Routes__________________________________________________________
const userRoutes = require('./routes/v1/users.route');
const releaseRoutes = require('./routes/v1/release.route');
const artistRoutes = require('./routes/v1/artist.route');
const labelsRoutes = require('./routes/v1/labels.route');



// middleware Start_________________________________
app.use(cors());
app.use(express.json());
// middleware End___________________________________

// MongoDB Connected________________________________
dbConnection.connectToServer();

// USERS API________________________/////
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/release', releaseRoutes);
app.use('/api/v1/artist', artistRoutes);
app.use('/api/v1/labels', labelsRoutes);


// ADMIN API________________________/////
app.use('/admin/api/v1/labels', adminLabelsRoutes);



















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
