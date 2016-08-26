var loginCtr = angular.module('LoginModule', []);

loginCtr.controller('LoginController', ['$scope', '$http', function($scope, $http){
	
	$scope.profile = {email:'', password:''}
	$scope.currentUser = null
	$scope.showLogin = true;

	$scope.init = function(){
		console.log('Login Controller INIT');
	}

	$scope.login = function(){
		console.log('login: ' + JSON.stringify($scope.profile))
		$http({
			method:'POST',
			url: '/account/login',
			data: $scope.profile
		}).then(function success(response){
			console.log(JSON.stringify(response.data));
			window.location.href = '/'
		}, function error(response){
			console.log(JSON.stringify(response.data));
		});
	}

	$scope.toggleLogin = function(){
		$scope.showLogin = $scope.showLogin ? false : true
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
				url: '/account/register',
				data: $scope.profile
			}).then(function success(response){
				console.log(JSON.stringify(response.data));
				window.location.href = '/'
			}, function error(response){
				console.log(JSON.stringify(response.data));
			});
		}
	}

	$scope.logout = function(){
		console.log("logout : " + JSON.stringify($scope.profile))
		$http({
		method:'GET',
			url: '/account/logout'
		}).then(function success(response){
			console.log(JSON.stringify(response.data));
			$scope.currentUser = null
		}, function error(response){
			console.log(JSON.stringify(response.data));
		});
	}

}]);