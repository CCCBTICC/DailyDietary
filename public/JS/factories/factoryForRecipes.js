/**
 * Created by Chenghuijin on 2015/7/6.
 */
var recipesFactory = angular.module('recipesFactory', []);

recipesFactory.factory('recipesManager', function ($http) {
    var recipesUrl = "http://localhost:8080/recipes";
    var recipes = [],
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
        updateRecipe: function () {
        },
        modifyRecipe: function () {
        },
        getTempRecipe: function (callback) {
            callback(tempRecipe);
        }
    }
});