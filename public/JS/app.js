/**
 * Created by Chenghuijin on 2015/7/6.
 */
var app = angular.module('menuApp', ['ui.bootstrap','ngRoute', 'menuFactories', 'menuControllers']);
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
app.filter('filterForHash',function(){
    return function(items,searchText){
        if(searchText===undefined)searchText = "";
        var filtered=[];
        angular.forEach(items, function(item) {
            if(item.data.select.indexOf(searchText)!==-1) filtered.push(item);
        });
        return filtered;
    }
});
app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});