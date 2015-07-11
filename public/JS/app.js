/**
 * Created by Chenghuijin on 2015/7/6.
 */
var app = angular.module('menuApp', ['ngRoute', 'menuFactories', 'menuControllers']);
app.config(function ($routeProvider) {
    $routeProvider.
        when('/menu', {
            templateUrl: '../templates/menu.html',
            controller: 'menuCtrl'
        }).
        when('/ingredient', {
            templateUrl: '../templates/ingredient.html',
            controller: 'ingredientCtrl'
        }).
        when('/recipe', {
            templateUrl: '../templates/recipe.html',
            controller: 'recipeCtrl'
        }).otherwise({
            redirectTo: '/'
        });
});