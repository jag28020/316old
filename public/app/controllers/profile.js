var profileCtr = angular.module('ProfileModule', []);

profileCtr.controller('ProfileController', ['$scope', '$http', function($scope, $http){
	
	$scope.profile = {email:'', password:''}
	$scope.currentUser = null;
	$scope.showLogin = false;

	$scope.init = function(){
		console.log('Profile Controller INIT');
		getCurrentUser();
		getPublicProfile();
	}

	$scope.toggleLogin = function(){
		$scope.showLogin = $scope.showLogin ? false : true
	}

	function getPublicProfile(){
		console.log(window.location)
		if (window.location.search.length <5){
			alert('What are you doing here?? Up to no good!')
			return
		}
		var query = window.location.search
		var profileId = query.slice(query.indexOf('=')+1, query.length)
		console.log(profileId)
		$http({
			method:'GET',
			url: '/api/profile/'+profileId
		}).then(function success(response){
			console.log(JSON.stringify(response.data))
			if (response.data.confirmation == 'success'){
				$scope.profile = response.data.results
			}
		}, function error(response){
			console.log(JSON.stringify(response.data))
		})

	}

	function getCurrentUser(){
		$http({
			method:'GET',
			url: '/account/currentuser'
		}).then(function success(response){
			console.log(JSON.stringify(response.data));
			if (response.data.confirmation == 'success'){
				$scope.currentUser = response.data.results
				$scope.profile = response.data.results
			}
		}, function error(response){
			console.log(JSON.stringify(response.data));
		});
	}

	$scope.isUserLoggedIn = function(){
		return ($scope.currentUser ? true : false)
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