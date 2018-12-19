const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();
const checkForSession = require('./middlewares/checkForSession');
const sc = require('./controllers/swag_controller');
const ac = require('./controllers/auth_controller');
const cc = require('./controllers/cart_controller');
const searchItems = require('./controllers/search_controller');

let { SERVER_PORT, SESSION_SECRET } = process.env;


const app = express();
app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(checkForSession);
app.use(express.static(`${__dirname}/../build`))

app.get(`/api/swag`, sc.read);

app.post(`/api/login`, ac.login);
app.post(`/api/register`, ac.register);
app.post(`/api/signout`, ac.signout);
app.get(`/api/user`, ac.getUser);

app.post(`/api/cart`, cc.add);
app.post(`/api/cart/checkout`, cc.checkout);
app.delete(`/api/cart`, cc.delete);

app.get(`/api/search`, searchItems.search)







app.listen(SERVER_PORT, () => { console.log(`The ${SERVER_PORT} tacos were too many to eat!`) })