
const express = require('express');
const cors = require('cors');
const connect = require('./db/connect');
const authRouter = require('./router/auth.router');
const contactRouter = require('./router/contact.router');
const app = express()
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use('/', contactRouter)
app.use('/', authRouter)

connect()
    .then(() => {
        app.listen(4000, () => {
            console.log('Server listening at http://localhost:4000')
        });
    })