var feedCtr = angular.module('FeedModule', []);

feedCtr.controller('FeedController', ['$scope', '$http', function($scope, $http){
	
	$scope.currentUser = null
	$scope.feed = []

	$scope.init = function(){
		console.log('Feed Controller INIT')
		getCurrentUser()
		getFeed()
	}

	function getFeed(){
		$http({
			method:'GET',
			url: '/api/post'
		}).then(function success(response){
			console.log(JSON.stringify(response.data));
			if (response.data.confirmation == 'success'){
				$scope.feed = response.data.result
			}
		}, function error(response){
			console.log(JSON.stringify(response.data));
		});
	}

	function getCurrentUser(){
		$http({
			method:'GET',
			url: '/currentuser'
		}).then(function success(response){
			console.log(JSON.stringify(response.data));
			if (response.data.confirmation == 'success'){
				$scope.currentUser = response.data.results
			}
		}, function error(response){
			console.log(JSON.stringify(response.data));
		});
	}

	// $scope.login = function(){
	// 	console.log('login: ' + JSON.stringify($scope.profile))
	// 	$http({
	// 		method:'POST',
	// 		url: '/login',
	// 		data: $scope.profile
	// 	}).then(function success(response){
	// 		console.log(JSON.stringify(response.data));
	// 		if (response.data.confirmation == 'success'){
	// 			$scope.currentUser = response.data.results
	// 		}
	// 		else{
	// 			alert(response.data.message)
	// 		}
	// 	}, function error(response){
	// 		console.log(JSON.stringify(response.data));
	// 	});
	// }

	// $scope.logout = function(){
	// 	console.log("logout : " + JSON.stringify($scope.profile))
	// 	$http({
	// 	method:'GET',
	// 		url: '/logout'
	// 	}).then(function success(response){
	// 		console.log(JSON.stringify(response.data));
	// 		$scope.currentUser = null
	// 	}, function error(response){
	// 		console.log(JSON.stringify(response.data));
	// 	});
	// }

}]);