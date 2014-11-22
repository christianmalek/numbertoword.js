(function() {
    var app = angular.module("numbertoword", []);
    var controller = function($scope) {
        $scope.number = 0;
        $scope.slider = 0;
        $scope.word;

        $scope.$watch("slider", function(newValue, oldValue) {
            $scope.word = ntw(newValue);
            $scope.number = parseInt(newValue, 10);
        });

        $scope.$watch("number", function(newValue, oldValue) {
            $scope.word = ntw(newValue);
            $scope.slider = newValue;
        });
    };
    app.controller("mainController", controller);
}());