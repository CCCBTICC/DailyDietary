/**
 * Created by Chenghuijin on 2015/7/10.
 */
var menuFactory = angular.module('menuFactories', []);

menuFactory.factory('ingredientsManager', function ($http) {
    var ingredientsUrl = "http://localhost:8080/ingredients";
    var ingredients = [];

    var get = function (callback) {
        if (!ingredients[0]) {
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
    var dictionary = {};
    var updateDictionary = function () {
        ingredientsManager.getIngredients(function (data) {
            dictionary = {};
            for (var i in data) {
                dictionary[data[i]._id] = data[i];
            }
        })
    };
    var recipesUrl = "http://localhost:8080/recipes";
    var recipes = [],
        tempMenu = [],
        tempRecipe = [];

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
            updateDictionary();
            console.log(dictionary1);
            callback(dictionary);
        },
        getTempMenu: function (callback) {
            callback(tempMenu);
        },
        updateRecipe: function () {
        },
        modifyRecipe: function () {
        },
        getTempRecipe: function (callback) {
            callback(tempRecipe);
        }
    }
});