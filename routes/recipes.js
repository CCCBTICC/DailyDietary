/**
 * Created by Chenghuijin on 2015/7/7.
 */
var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;


router.get('/', function (req, res, next) {
    req.db.collection("recipes").find().toArray(function (err, result) {
        res.send(result);
    });
});

router.post('/', function (req, res) {
    switch (req.body.action) {
        case "add":
            req.db.collection("recipes").insertOne({
                name: req.body.name,
                ingredients: req.body.ingredients
            }, function (err, result) {
                res.send(result.ops[0]);
            });
            break;
        case "remove":
            req.db.collection("recipes").findAndRemove({_id: new ObjectId(req.body.id)}, [['b', 1]], function (err, result) {
                if (result) {
                    console.log(result);
                    res.end();
                }
            });
            break;
    }
});


module.exports = router;