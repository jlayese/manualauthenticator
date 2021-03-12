const express = require('express');
const morgan = require('morgan');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

app.get('/', (req, res)=>{
    /* res.json({
        message: 'Authenticate here'
    }) */
    res.redirect('/home');
})

app.get('/home', (req, res)=>{
    res.render('home', {title: 'Binx Auth Home'});
})
//middlewares
app.use('/auth/twitch', require('./controller/twitchauth'));


const PORT = 8888;
const server = app.listen(PORT,
        ()=> console.log('http://localhost:'+server.address().port)
    );