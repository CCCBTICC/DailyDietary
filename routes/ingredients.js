/**
 * Created by ypling on 2/16/15.
 */
var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.sendfile("./views/ingredients.html");
});

router.get('/list', function (req, res, next) {
    req.db.collection("ingredients").find().toArray(function (err, result) {
        res.send(result);
    });
});

router.post('/', function (req, res) {
    console.log(req.body);
    switch (req.body.action) {
        case "add":
            req.db.collection("ingredients").insertOne({name: req.body.name}, function (err, result) {
                res.send(result.ops[0]);
            });
            break;
        case "remove":
            req.db.collection("ingredients").findAndRemove({_id: new ObjectId(req.body.id)}, [['b', 1]], function (err, result) {
                if (result) {
                    console.log(result);
                    res.end();
                }
            });
            break;
    }
});

module.exports = router;
