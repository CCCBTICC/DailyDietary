/**
 * Created by ypling on 2/16/15.
 */
var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.sendfile("./views/ingredients.html");
});
router.get('/init', function(req, res, next) {
    req.db.get("ingredients").find({},{},function(e,docs){
        res.write(JSON.stringify(docs));
        res.end();
    });
});

router.post('/', function(req, res) {
    console.log(req.body);
    switch (req.body.action) {
        case "add":
            req.db.get("ingredients").insert({name:req.body.name}, {w: 1}, function (err, records) {
                console.log("Record added as " + records._id);
                res.write(JSON.stringify(records));
                res.end();
            });
            break;
        case "remove":
            var record="";
            req.db.get("ingredients").findById(req.body.id,function(err,docs){
                record = docs;
                req.db.get("ingredients").remove(record, function () {
                    res.end();
                });
            });
            break;
    }
});

module.exports = router;
