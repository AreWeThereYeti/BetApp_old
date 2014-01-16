/* var betApp = angular.module('betApp', []); */
 
betApp.controller('BetListCtrl', function ($scope) {
  
  $scope.bets = [
    {'bet': 'Jeg er hurtigere',
     'name': 'Jonas'},
    {'bet': 'Jeg er hurtigere. Jeg er hurtigere.',
     'name': 'Søren'}
  ];

});
