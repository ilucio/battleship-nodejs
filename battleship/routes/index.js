var express = require('express');
var router = express.Router();

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});



router.get('/viewsolutions', function (req, res) {
	res.send(db.get('defense').value());
});

router.get('/viewattack', function (req, res) {
	res.send(db.get('attack').value());
});

router.get('/reset', function (req, res) {
	res.send(db.set('attack', []).write());
});

router.post('/givehit', function (req, res) {
	let defense = db.get('defense').value();
	let result = "fail";

	defense.forEach(function(val,index){
		let elements = val.value;
			elements.forEach(function(v,i){
				if(v === req.body.id) {
					result = "shot";
				}
			});
	});

	res.send(
		db.get('attack')
  		.push({ value: req.body.id, result: result})
  		.write()
  	)
});

module.exports = router;
