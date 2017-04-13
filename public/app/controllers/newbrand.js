var newBrandCtr = angular.module('NewBrandModule', []);

newBrandCtr.controller('NewBrandController', ['$scope', '$http', function($scope, $http){
	

	$scope.brand = {}


	$scope.init = function(){
		console.log('NewBrand Controller INIT');
	}

	$scope.register = function(){
		console.log('signup: ' + JSON.stringify($scope.brand))
		$http({
			method:'POST',
			url: '/signup-brand',
			data: $scope.brand
		}).then(function success(response){
			console.log(JSON.stringify(response.data));
			if (response.data.confirmation == 'success')
				window.location.href = '/brand-profile'
		}, function error(response){
			console.log(JSON.stringify(response.data));
		});
	}

	$scope.login = function(){
		console.log('login: ' + JSON.stringify($scope.brand))
		$http({
			method:'POST',
			url: '/login',
			data: $scope.brand
		}).then(function success(response){
			console.log(JSON.stringify(response.data))
			if (response.data.confirmation == 'success')
				window.location.href = '/brand-profile'
		}, function error(response){
			console.log(JSON.stringify(response.data));
		});
	}
	// function validateRegistration(){
	// 	if($scope.profile.email.indexOf('@')==-1){
	// 		alert('Please enter a valid email address.')
	// 		return false;
	// 	}
	// 	if ($scope.profile.password.length<6){
	// 		alert('Please enter a valid password (minimum 6 characters).')
	// 		return false
	// 	}
	// 	$scope.profile.email = $scope.profile.email.toLowerCase().trim();
	// 	return true;
	// }

	
	// $scope.logout = function(){
	// 	console.log("logout : " + JSON.stringify($scope.profile))
	// 	$http({
	// 	method:'GET',
	// 		url: '/account/logout'
	// 	}).then(function success(response){
	// 		console.log(JSON.stringify(response.data));
	// 		$scope.currentUser = null
	// 	}, function error(response){
	// 		console.log(JSON.stringify(response.data));
	// 	});
	// }

}]);