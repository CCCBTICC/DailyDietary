/**
 * Created by Chenghuijin on 2015/7/6.
 */
var menuCtrl = angular.module('menuControllers', []);

menuCtrl.controller('headCtrl',function($scope,$location){
    $scope.isCollapsed = false;
    $scope.isActive = function(viewlocation){
        return $location.path().indexOf(viewlocation) == 0;
    };
    $scope.closeCurtain = function(){
        return /[mri]/.test($location.path());
    };

});

menuCtrl.controller('ingredientCtrl', function ($scope, ingredientsManager) {
    $scope.compare = [];
    ingredientsManager.getIngredients(function (ref) {
        $scope.ingredients = ref;
        $scope.ingredients.forEach(function (ingredient) {
            $scope.compare.push(ingredient.name);
        });
    });

    $scope.currentPage = 0;
    $scope.pageSize = 8;
    $scope.numberOfPages=function(){
        return Math.ceil($scope.ingredients.length/$scope.pageSize);
    };
    $scope.add = function (name) {
        if ($scope.compare.indexOf(name) < 0) {
            ingredientsManager.addIngredient(name, function (data) {
                $scope.compare.push(data.name);
                $scope.entered = '';
                $scope.ingredients.push(data);
            });
        }
    };
    $scope.remove = function (item) {
        ingredientsManager.removeIngredient(item._id, function () {
            var i = $scope.ingredients.indexOf(item);
            $scope.ingredients.splice(i, 1);
            i = $scope.compare.indexOf(item.name);
            $scope.compare.splice(i, 1);
        });
    };
});

menuCtrl.controller('recipeCtrl', function ($scope, recipesManager) {
    recipesManager.getDictionary(function (data) {
        $scope.dictionary = data;
    });
    recipesManager.getRecipes(function (ref) {
        $scope.recipes = ref;
    });
    $scope.currentPage = 0;
    $scope.pageSize = 8;
    $scope.numberOfPages=function(){
        return Math.ceil($scope.recipes.length/$scope.pageSize);
    };

    $scope.select = function (id) {
        $scope.dictionary[id].select = true;
    };
    $scope.release = function (id) {
        $scope.dictionary[id].select = false;
    };
    $scope.onclick = function (id) {
        if ($scope.dictionary[id].select) {
            $scope.release(id);
        } else {
            $scope.select(id);
        }
    };
    $scope.save = function (name) {
        $scope.recipe = [];
        Object.keys($scope.dictionary).forEach(function (id) {
            if ($scope.dictionary[id].select) {
                $scope.recipe.push(id);
                $scope.dictionary[id].select = false;
            }
        });
        recipesManager.addRecipe(name, $scope.recipe, function (data) {
            $scope.entered = '';
            $scope.recipes.push(data);
        });
    };
    $scope.remove = function (item) {
        recipesManager.removeRecipe(item._id, function () {
            var i = $scope.recipes.indexOf(item);
            $scope.recipes.splice(i, 1);
        });
    };

    $scope.modify = function (item) {
    };
    $scope.update = function (db) {
    }
});

menuCtrl.controller('menuCtrl', function ($scope, recipesManager) {
    recipesManager.getRecipes(function (ref) {
        $scope.recipes = ref;
    });
    recipesManager.getDictionary(function (data) {
        $scope.dictionary = data;
    });
    var add = function (name, array) {
        if (array.indexOf(name) < 0) {
            array.push(name);
        }
    };
    var detail = function (array) {
        $scope.list = [];
        array.forEach(function (recipe) {
            recipe.ingredients.forEach(function (ingredient) {
                add(ingredient, $scope.list);
            });
        });
    };
    recipesManager.getTempMenu(function (ref) {
        $scope.mSelected = ref;
        detail($scope.mSelected);
    });
    $scope.select = function (recipe) {
        $scope.mSelected.push(recipe);
        detail($scope.mSelected);
    };
    $scope.release = function (recipe) {
        var i = $scope.mSelected.indexOf(recipe);
        $scope.mSelected.splice(i, 1);
        detail($scope.mSelected);
    };
});