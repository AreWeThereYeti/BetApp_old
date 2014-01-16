var betApp = angular.module('betApp', []);

betApp.controller('AppCtrl',function($scope,$element,$attrs,$compile,Helpers) {

	$scope.SaveBet = function () {

    $scope.bets.push({
        bet: $scope.bet,
        name: $scope.name
    });

    // Clear input fields after push
    $scope.bet = "";
    $scope.name = "";

		};

});

