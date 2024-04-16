const express = require('express');
const { emit } = require('nodemon');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

//Connect to DB
const db = knex ({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      //port: 3306,
      user: 'byron',
      password: '', //Enter password if not blank
      database: 'facefinder',
    },
});

//DB Queries
db.select('*').from('users')

const app = express();

//Middleware to parse json data received from Front End for Sign In
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('success');
    //res.send(database.users);
})

//Sign In (Pos t used because of json)
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

//Register a new User
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

//Search DB for user
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

//Increment post count everytime an image is submitted
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleAPICall(req, res)})

//Specify Server Port to run on
app.listen(3001, ()=> {
    console.log('Server is Running on Port 3001');
})