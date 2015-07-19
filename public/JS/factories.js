/**
 * Created by Chenghuijin on 2015/7/10.
 */
var menuFactory = angular.module('menuFactories', []);

menuFactory.factory('ingredientsManager', function ($http) {
    var ingredientsUrl = "http://localhost:8080/ingredients";
        var ingredients = [];
    var n=[{n:20}];
    var m={n:30};
    var change= function(){
       n[0]=m;
        console.log(n);
    };
    var get = function (callback) {
        if (!ingredients[0]) {
            console.log("1\n");
            $http.get(ingredientsUrl).success(function (data) {
                ingredients = data;
                ingredients.sort(function (a, b) {
                    return (a.name > b.name) - (a.name < b.name);
                });
                callback(ingredients);
            });
        } else {
            ingredients.sort(function (a, b) {
                return (a.name > b.name) - (a.name < b.name);
            });
            callback(ingredients);
        }
    };
    var post = function (data, callback) {
        $http({
            method: 'post',
            url: ingredientsUrl,
            data: data
        }).success(callback);
    };

    return {
        getN:function(cb){cb(n)},
        change:change,
        getIngredients: get,
        addIngredient: function (name, callback) {
            var data = {action: "add", name: name};
            post(data, callback);
        },
        removeIngredient: function (itemID, callback) {
            var data = {action: "remove", id: itemID};
            post(data, callback);
        }
    }
});

menuFactory.factory('recipesManager', function ($http, ingredientsManager) {
    var updateDictionary = function (callback) {
        ingredientsManager.getIngredients(function (data) {
            var dictionary = {};
            data.forEach(function (ingredient) {
                dictionary[ingredient._id] = ingredient;
            });
            callback(dictionary);
        });
    };
    var recipesUrl = "http://localhost:8080/recipes";
    var recipes = [],
        tempMenu = [];

    var get = function (callback) {
        if (!recipes[0]) {
            $http.get(recipesUrl).success(function (data) {
                recipes = data;
                callback(recipes);
            });
        } else {
            callback(recipes);
        }
    };
    var post = function (data, callback) {
        $http({
            method: 'post',
            url: recipesUrl,
            data: data
        }).success(callback);
    };
    return {
        getRecipes: get,
        addRecipe: function (name, ingredients, callback) {
            var data = {action: "add", name: name, ingredients: ingredients};
            post(data, callback);
        },
        removeRecipe: function (itemID, callback) {
            var data = {action: "remove", id: itemID};
            post(data, callback);
        },
        getDictionary: function (callback) {
            updateDictionary(callback);
        },
        getTempMenu: function (callback) {
            callback(tempMenu);
        },
        updateRecipe: function () {
        },
        modifyRecipe: function () {
        }
    }
});

menuFactory.factory('navManager',function(){
    var clicked={menu:false,recipe:false,ingredient:false};
    return{
        getClicked:function(callback){
            callback(clicked);
        }
    }
});