var betApp = angular.module('betApp', []);
 
betApp.controller('BetListCtrl', function ($scope) {
  $scope.bets = [
    {'bet': 'Jeg er hurtigere',
     'name': 'Jonas'},
    {'bet': 'Jeg er hurtigere. Jeg er hurtigere.',
     'name': 'Søren'}
  ];

	$scope.addItem = function () {

    $scope.bets.push({
        amount: $scope.bet,
        name: $scope.name
    });

    // Clear input fields after push
    $scope.bet = "";
    $scope.name = "";

};
});