var express = require('express');
var router = express.Router();
const mariadb = require('mariadb');
var db = mariadb.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'seq_db'
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/ver', function(req, res, next) {
  console.log('hola');

 res.render('lista1')
});

router.post('/datos', function(request, response){
  
  console.log(request.body.user.name);
  console.log(request.body.user.email);
  response.render('listapost',{title: request.body.user});
});


router.post('/listado', function(req, res, next) {
  var busqueda = req.body.busqueda;
    busqueda = '%' + busqueda + '%';
  db.then(conn => {
    conn.query("select * from Usuarios where nombre like ?", [busqueda])
        .then(rows => {
            res.render('listado', {rows});

        })
})
});

router.get('/prueba', function(req, res, next) {
  console.log('hola');

 res.render('prueba')
});
module.exports = router;
