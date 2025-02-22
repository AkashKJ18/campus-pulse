var express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const studentsRoute = require('./routes/student.js');
const candidatesRoute = require('./routes/candidate.js');
const eventsRoute = require('./routes/event.js');
const usersRoute = require('./routes/user.js');
const authRoute = require('./routes/auth.js');
const rolesRoute = require('./routes/role.js');
const permissionsRoute = require('./routes/permission.js');
const votesRoute = require('./routes/vote.js');
const { router } = require('./routes/gemini.js');
var app = express();

const uri = process.env.DB_URL;
mongoose.connect(uri, {}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
});

app.use(cors());
app.use(express.json());
app.use('/students', studentsRoute);
app.use('/candidates', candidatesRoute);
app.use('/events', eventsRoute);
app.use('/users', usersRoute);
app.use('/roles', rolesRoute);
app.use('/permissions', permissionsRoute);
app.use('/vote', votesRoute);
app.use('/gemini', router);
app.use('/auth', authRoute);

app.listen(8000, '0.0.0.0', () => { console.log('server listening on 8000') })