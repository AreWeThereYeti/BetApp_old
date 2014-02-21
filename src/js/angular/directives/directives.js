var betApp = angular.module('betApp', [])	/* CORS cross domain fix */
	.config(function($httpProvider) {
		$httpProvider.defaults.useXDomain = true; 
		delete $httpProvider.defaults.headers
			.common['X-Requested-With'];
	})
	.directive('ngApp', function() {
	    return {
	    controller:AppCtrl,
	    link:function(scope,element,attrs){
			scope.init();
			}
		}
	})

