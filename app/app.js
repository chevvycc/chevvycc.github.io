    var express = require('express');
    var bodyparser = require('body-parser');
    var app = express();
    app.use(bodyparser.json());

    app.get('/', function(req, res) {
        res.send("Hello World!");
    });

    app.get('/movies', function(req, res) {
        res.send(movies);
    });

    app.get('/movies/:id', function(req, res) {
        for (var i=0; i<movies.length; i++) {
            if (movies[i].id == req.params.id) {
                res.send(movies[i]);
                return;
            }
        }
        res.send("aucun film trouvé");
    });

    app.post('/movies', function(req, res) {
        //req.body contient l'object json envoyé avec la requête POST
        var newMovie = req.body;
        //générer un id
        newMovie.id = Date.now();
        //ajouter le nouveau film à la BD
        movies.push(newMovie);
        //retourner le nouveau film ajouté au client
        res.send(newMovie);
    });

    app.listen(5000, function() {
        console.log("Rotten Vegetables app running at localhost:" + 5000);
    });

    var movies = [
        {"id" : 1, "title": "The Shining", "genre": "horror"},
        {"id" : 2, "title": "Fargo", "genre": "drama"},
        {"id" : 3, "title": "TED", "genre": "comedy"},
        {"id" : 4, "title": "Armageddon", "genre": "action"},
        {"id" : 1, "title": "Harry Potter", "genre": "fantasy"}
    ];