var comingSoonCtr = angular.module('ComingSoonModule', []);

comingSoonCtr.controller('ComingSoonController', ['$scope', '$http', function($scope, $http){
	$scope.init = function(){
		console.log('Coming Soon!');
	}
}]);