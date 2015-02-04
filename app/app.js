var bodyparser = require('body-parser');
var express = require('express');
var app = express();
app.use(bodyparser.json());

app.get('/', function(req, res) {
    res.send("Hello World!");
});

app.get('/movies', function(req, res) {
    res.send(movies);
});

app.get('/movies/:id', function(req, res) {
    for (var i = 0; i < movies.length; i++) {
        if (movies[i].id == req.params.id) {
            res.send(movies[i]);
            return;
        }
    }
    res.send("Aucun film trouvé");
});

app.post('/movies', function(req, res) {
    //req.body contient l'object json envoyé avec la requête POST
    //dans l'exemple ci-bas, req.body contient: {"title":"The Godfather","genre":"drama"}
    var newMovie = req.body;

    //générer un id
    newMovie.id = Date.now();

    //ajouter le nouveau film à la BD
    movies.push(newMovie);

    //retourner le nouveau film ajouté au client
    res.send(newMovie);
});

app.put('/movies/:id', function(req, res) {
    var editedMovie = req.body;
    editedMovie.id = req.params.id;

    for (var i = 0; i < movies.length; i++) {
        if (movies[i].id === editedMovie.id) {
            movies[i] = editedMovie;
            res.send("Film avec l'id " + editedMovie.id + " modifié");
            return;
        }
    }
    res.send("Film avec l'id " + editedMovie.id + " introuvable")
});

app.get('*', function(req, res) {
    res.redirect('/');
    //res.sendFile(__dirname + '/redirect.html');
});

app.listen(5000, function() {
    console.log("Rotten Vegetables app running at localhost:" + 5000);
});

var movies = [
    {"id" : "1423027070731", "title": "The Shining", "genre": "horror"},
    {"id" : "1423027078981", "title": "Fargo", "genre": "drama"},
    {"id" : "1423027089022", "title": "TED", "genre": "comedy"},
    {"id" : "1423027096474", "title": "Armageddon", "genre": "action"},
    {"id" : "1423027107513", "title": "Harry Potter", "genre": "fantasy"}
];