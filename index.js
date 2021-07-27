// express.js
var express = require('express')
var app = express()

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
var cors = require('cors');

app.use(
    cors({
      origin: "*",
    })
  );

// controllers
const {getMovies, getMovie, getURLImages, getSearch, deleteMovie, addMovie, getGenres, getProducers, editMovie} = require('./controllers/moviesController.js');
const {connectUser} = require('./controllers/usersController.js');

// routes
app.get('/', function (req, res) {
  res.render('index.html');
});

app.get('/login', function (req, res) {
  res.render('login.html');
});

app.get('/admin', function (req, res) {
  res.render('admin.html');
});

app.get('/addmovie', function (req, res) {
  res.render('addMovie.html');
});



// api movie

app.get('/api/movies', getMovies);

app.get('/api/movies/search/:search/:limit/:offset', getSearch);

app.get('/api/movies/:limit/:offset', getMovies);

app.get('/api/movies/:id', getMovie);

app.get('/api/URL_images', getURLImages);

// api login

app.post('api/users/:email/:password', connectUser)

// api admin

app.get('/api/admin/movies/getProducers', getProducers)
app.get('/api/admin/movies/getGenres', getGenres)

app.post('/api/admin/movies/addmovie/:title/:duration/:genre/:date/:producer/:summary', addMovie)
app.put('/api/admin/movies/editmovie/:title/:duration/:genre/:date/:producer/:summary/:id', editMovie)

app.delete('/api/admin/movies/:id', deleteMovie)

app.listen(8000);



