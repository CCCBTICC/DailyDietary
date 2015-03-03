/**
 * Created by ypling on 2/16/15.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.sendfile("./views/recipes.html");
});


router.get('/init', function(req, res, next) {
    req.db.get("recipes").find({},{},function(e,docs){
        res.write(JSON.stringify(docs));
        res.end();
    });
});

module.exports = router;
