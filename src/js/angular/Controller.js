var betApp = angular.module('betApp', []);

/* User controller with angularjs */
function AppCtrl($scope) {

	console.log($scope.bets)

  $scope.bets = [
    {'bet': 'Jeg er hurtigere',
     'name': 'Jonas'},
    {'bet': 'Jeg er hurtigere. Jeg er hurtigere.',
     'name': 'Søren'}
  ];


	$scope.SaveBet = function () {

    $scope.bets.push({
        bet: $scope.bets.bet,
        name: $scope.bets.name
    });
    
    console.log($scope.bets)

    // Clear input fields after push
    $scope.bet = "";
    $scope.name = "";

		};

};

