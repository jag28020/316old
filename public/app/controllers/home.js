var homeCtr = angular.module('HomeModule', []);

homeCtr.controller('HomeController', ['$scope', '$http', function($scope, $http){
	
	$scope.profile = null;
	$scope.currentUser = null;
	$scope.showLogin = false;

	$scope.init = function(){
		console.log('Home Controller INIT');
		getCurrentUser();
	}

	$scope.toggleLogin = function(){
		$scope.showLogin = $scope.showLogin ? false : true
	}

	$scope.login = function(){
		console.log('login: ' + JSON.stringify($scope.profile))
		$http({
			method:'POST',
			url: '/login',
			data: $scope.profile
		}).then(function success(response){
			console.log(JSON.stringify(response.data));
			if (response.data.confirmation == 'success'){
				$scope.currentUser = response.data.results
			}
			else{
				alert(response.data.message)
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

	function validateRegistration(){
		if($scope.profile.email.indexOf('@')==-1){
			alert('Please enter a valid email address.')
			return false;
		}
		if ($scope.profile.password.length<6){
			alert('Please enter a valid password (minimum 6 characters).')
			return false
		}
		$scope.profile.email = $scope.profile.email.toLowerCase().trim();
		return true;
	}

	$scope.isUserLoggedIn = function(){
		return ($scope.currentUser ? true : false)
	}

	$scope.register = function(){
		console.log("register : " + JSON.stringify($scope.profile))
		if (validateRegistration()){
			console.log('validate successful')
			$http({
				method:'POST',
				url: '/signup',
				data: $scope.profile
			}).then(function success(response){
				console.log(JSON.stringify(response.data));
				$scope.currentUser = response.data.results
			}, function error(response){
				console.log(JSON.stringify(response.data));
			});
		}
	}

	$scope.logout = function(){
		console.log("logout : " + JSON.stringify($scope.profile))
		$http({
		method:'GET',
			url: '/logout'
		}).then(function success(response){
			console.log(JSON.stringify(response.data));
			$scope.currentUser = null
		}, function error(response){
			console.log(JSON.stringify(response.data));
		});
	}

}]);