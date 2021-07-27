var db = require('./databaseController.js');

db.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = {
    getMovies: function (req, res) {
        limit = req.params['limit'];
        offset = req.params['offset']
        if (typeof limit == 'undefined' && typeof offset == 'undefined') {
            db.query(`SELECT A.id, A.title, A.summary, A.release_date, A.min_duration, A.prod_year, B.name AS 'genre_name' , C.name AS 'producer_name' FROM movies A, genres B, producers C WHERE A.genre_id = B.id AND A.producer_id = C.id ORDER BY A.id DESC`, function (err, result) {
                if (err) throw err;
                res.status(200).json(result);
            });
        } else {
            db.query(`SELECT A.id, A.title, A.summary, A.release_date, A.min_duration, A.prod_year, B.name AS 'genre_name' , C.name AS 'producer_name' FROM movies A, genres B, producers C WHERE A.genre_id = B.id AND A.producer_id = C.id ORDER BY A.id DESC LIMIT ${limit} OFFSET ${offset}`, function (err, result) {
                if (err) throw err;
                res.status(200).json(result);
            });
        }

    },

    getMovie: function (req, res) {
        let id = req.params['id'];
        db.query(`SELECT A.id, A.title, A.summary, A.release_date, A.min_duration, A.prod_year, B.id AS 'genre_id', B.name AS 'genre_name', C.id AS 'producer_id', C.name AS 'producer_name' FROM movies A, genres B, producers C WHERE A.genre_id = B.id AND A.producer_id = C.id AND A.id = ${id}`, function (err, result) {
            if (err) throw err;
            res.status(200).json(result);
        });

    },
    getURLImages: function (req, res) {
        db.query(`SELECT URL_image FROM URL_images`, function (err, result) {
            if (err) throw err;
            res.status(200).json(result);
        });

    },

    getSearch: function (req, res) {

        let search = req.params['search'];
        let limit = req.params['limit'];
        let offset = req.params['offset'];

        if (limit == 'false' && offset == 'false') {
            db.query(`SELECT A.id, A.title, A.summary, A.release_date, A.min_duration, A.prod_year, B.name AS 'genre_name' , C.name AS 'producer_name' FROM movies A, genres B, producers C WHERE A.genre_id = B.id AND A.producer_id = C.id AND (UPPER(A.title) LIKE '%${search}%' OR UPPER(A.summary) LIKE '%${search}%' OR UPPER(B.name) LIKE '%${search}%' OR UPPER(C.name) LIKE '%${search}%') ORDER BY A.id DESC`, function (err, result) {
                if (err) throw err;
                res.status(200).json(result);
            });
        } else {
            db.query(`SELECT A.id, A.title, A.summary, A.release_date, A.min_duration, A.prod_year, B.name AS 'genre_name' , C.name AS 'producer_name' FROM movies A, genres B, producers C WHERE A.genre_id = B.id AND A.producer_id = C.id AND (UPPER(A.title) LIKE '%${search}%' OR UPPER(A.summary) LIKE '%${search}%' OR UPPER(B.name) LIKE '%${search}%' OR UPPER(C.name) LIKE '%${search}%') ORDER BY A.id DESC LIMIT ${limit} OFFSET ${offset}`, function (err, result) {
                if (err) throw err;
                res.status(200).json(result);
            });
        }

    },

    deleteMovie: function (req, res) {
        db.query(`DELETE FROM movies WHERE id = ${req.params['id']};`, function (err, result) {
            if (err) throw err;
            res.status(200).json(result);
        });
    },

    addMovie: function (req, res) {
        min_duration = parseInt(req.params['duration']);
        genre_id = parseInt(req.params['genre']);
        producer_id = parseInt(req.params['producer']);

        let query = 'INSERT INTO movies(`genre_id`, `producer_id`, `title`, `summary`, `release_date`, `end_release_date`, `min_duration`, `prod_year`) VALUES ' + `(${genre_id},${producer_id},'${req.params['title']}',"${req.params['summary']}",'${req.params['date']}', '1998-08-24', ${min_duration}, 1995)`

        db.query(`${query}`, function (err, result) {
            if (err) throw err;
            res.status(200).json(result);
        });
    },
    getGenres: function (req, res) {
        db.query(`SELECT id, name FROM genres ORDER BY name`, function (err, result) {
            if (err) throw err;
            res.status(200).json(result);
        });
    },
    getProducers: function (req, res) {
        db.query(`SELECT id, name FROM producers ORDER BY name`, function (err, result) {
            if (err) throw err;
            res.status(200).json(result);
        });
    },

    editMovie: function (req, res) {
        min_duration = parseInt(req.params['duration']);
        genre_id = parseInt(req.params['genre']);
        producer_id = parseInt(req.params['producer']);

        // console.log(req.params['date']);
        let query = `UPDATE movies SET genre_id = ${genre_id}, producer_id = ${producer_id}, min_duration = ${min_duration}, title = '${req.params['title']}', summary = "${req.params['summary']}" WHERE id = ${req.params['id']}`;

        db.query(`${query}`, function (err, result) {
            if (err) throw err;
            res.status(200).json(result);
        });
    }
}



