var betApp = angular.module('betApp', []);
 
betApp.controller('BetListCtrl', function ($scope) {
  
  $scope.bets = [
    {'bet': 'Jeg er hurtigere',
     'name': 'Jonas'},
    {'bet': 'Jeg er hurtigere. Jeg er hurtigere.',
     'name': 'Søren'}
  ];

});

	$scope.SaveBet = function () {

    $scope.bets.push({
        bet: $scope.bet,
        name: $scope.name
    });

    // Clear input fields after push
    $scope.bet = "";
    $scope.name = "";

		};