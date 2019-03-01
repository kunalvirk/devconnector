const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

// Mongo key
const key = require('./config/keys').mongoURI;
mongoose.connect(key, {
        useNewUrlParser: true
    })
    .then(() => console.log('Connected successfully to database'))
    .catch((err) => console.log('Error occured while connecting to DB', err))


// Init passport
app.use(passport.initialize())
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Get all routes
const userRoutes = require('./routes/api/user');
const profileRoutes = require('./routes/api/profile');
const postRoutes = require('./routes/api/post');

app.use('/api/user/', userRoutes);
app.use('/api/post/', postRoutes);
app.use('/api/profile', profileRoutes);

// Static assets to be consumed by server in PRODUCTION mode
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req,res) => {
        res.sendFile(__dirname, 'client','build','index.html');
    })
}

const port = process.env.PORT || '3001';
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`)
})
