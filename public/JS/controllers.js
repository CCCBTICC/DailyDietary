/**
 * Created by Chenghuijin on 2015/7/6.
 */
var menuCtrl = angular.module('menuControllers', []);

menuCtrl.controller('ingredientCtrl', function ($scope, ingredientsManager) {
    $scope.compare = [];
    ingredientsManager.getIngredients(function (ref) {
        $scope.ingredients = ref;
        for (var x in $scope.ingredients) {
            $scope.compare.push($scope.ingredients[x].name);
        }
    });
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

menuCtrl.controller('recipeCtrl', function ($scope, recipesManager, ingredientsManager) {
    ingredientsManager.getIngredients(function (ref) {
        $scope.ingredients = ref;
    });
    recipesManager.getDictionary(function (data) {
        $scope.dictionary = data;
    });
    console.log("in recipe:");
    console.log($scope.dictionary);
    recipesManager.getTempRecipe(function (ref) {
        $scope.temprecipe = ref;
    });
    recipesManager.getRecipes(function (ref) {
        $scope.recipes = ref;
    });
    $scope.select = function (id) {
        $scope.temprecipe.push(id);
        $("button#" + id).addClass("btn-danger");
    };
    $scope.release = function (id) {
        var i = $scope.temprecipe.indexOf(id);
        $scope.temprecipe.splice(i, 1);
        $("button#" + id).removeClass("btn-danger");
    };
    $scope.onclick = function (id) {
        if ($scope.temprecipe.indexOf(id) < 0) {
            $scope.select(id);
        } else {
            $scope.release(id);
        }
    };
    $scope.save = function (name) {
        $scope.recipe = [];
        while ($scope.temprecipe[0]) {
            $scope.recipe.push($scope.temprecipe.shift());
        }
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
    };
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
        var x, y;
        $scope.list = [];
        for (x in array) {
            for (y in array[x].ingredients) {
                add(array[x].ingredients[y], $scope.list);
            }
        }
    };
    recipesManager.getTempMenu(function (ref) {
        $scope.mSelected = ref;
        detail($scope.mSelected);
    })
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