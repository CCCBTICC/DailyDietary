/**
 * Created by Chenghuijin on 2015/7/6.
 */
var ingredientsFactory = angular.module('ingredientsFactory', []);

ingredientsFactory.factory('ingredientsManager', function ($http) {
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