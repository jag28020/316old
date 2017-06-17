var joinCtr = angular.module('JoinModule', []);

joinCtr.controller('JoinController', ['$scope', '$http', function($scope, $http){
	
	$scope.currentUser = null;
	$scope.profile = {email: "", password: ""}

	$scope.init = function(){
		console.log('Join Controller INIT')
		getCurrentUser()
	}

	function getCurrentUser(){
		$http.get('/currentuser')
			.then(function success(response){
				console.log(response.data)
				if (response.data.confirmation == 'success')
					$scope.currentUser = response.data.results
			}, function error(response){
				console.log(response.data)
			})
	}

	$scope.login = function(){
		console.log('login: ' + JSON.stringify($scope.profile))
		if (validateRegistration()){
			$http({
				method:'POST',
				url: '/login',
				data: $scope.profile
			}).then(function success(response){
				if (response.data.confirmation == "success"){
					console.log(JSON.stringify(response.data));
					window.location.href = '/'
				}
				else
					alert(JSON.stringify(response.data.message))
			}, function error(response){
				alert(JSON.stringify(response.data.message))
			});
		}
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

	$scope.register = function(){
		console.log("register : " + JSON.stringify($scope.profile))
		if (validateRegistration()){
			console.log('validate successful')
			$http({
				method:'POST',
				url: '/signup',
				data: $scope.profile
			}).then(function success(response){
				if (response.data.confirmation == "success"){
					console.log(JSON.stringify(response.data));
					window.location.href = '/'
				}
				else
					alert(JSON.stringify(response.data.message))
			}, function error(response){
				console.log(JSON.stringify(response.data));
			});
		}
	}

}]);