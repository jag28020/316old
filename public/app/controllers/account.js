var accountCtr = angular.module('AccountModule', []);

accountCtr.controller('AccountController', ['$scope', '$http', function($scope, $http){

	// $scope.currentUser = {email:'', name: '', password: ''}
	// $scope.currentUser.birthday = new Date()

	$scope.init = function(){
		console.log('Account Controller INIT');
		getCurrentUser();
	}


	function getCurrentUser(){
		$http({
			method:'GET',
			url: '/currentuser'
		}).then(function success(response){
			console.log(JSON.stringify(response.data));
			if (response.data.results.local.isBrand == "true")
				window.location.href = "/brand-profile"
			if (response.data.confirmation == 'success'){
				$scope.currentUser = response.data.results
				$scope.currentUser.local.password = ""
				$scope.currentUser.local.birthday = new Date(response.data.results.local.birthday)
				$scope.currentUser.local.tags.forEach(function (t){
					console.log("Preselect tag " + t)
					var btn = document.getElementById(t)
					if (btn)
						document.getElementById(t).className += " btn-selected"
				})
			}
		}, function error(response){
			console.log(JSON.stringify(response.data));
		});
	}

	$scope.toggleTag = function(event, tag){
		console.log(event)
		console.log(tag)
		if (event.currentTarget.className.includes("btn-selected")){
			console.log("already selected. Removing class")
			event.currentTarget.className = event.currentTarget.className.replace("btn-selected", "")
			$scope.currentUser.local.tags.splice($scope.currentUser.local.tags.indexOf(tag),1)
		}
		else{
			console.log("not selected. Adding class")
			event.currentTarget.className += " btn-selected"
			$scope.currentUser.local.tags.push(tag)
		}
		$scope.updateProfile()
		console.log(JSON.stringify($scope.currentUser))
	}

	$scope.updateProfile = function(){
		console.log(JSON.stringify($scope.currentUser))
		$http({
			method:'PUT',
			url: '/api/profile' + ($scope.currentUser.local.password.length >0 ? "?pass=true" : ""),
			data: $scope.currentUser
		}).then(function success(response){
			console.log(JSON.stringify(response.data));
			$scope.currentUser = response.data.result
			$scope.currentUser.local.birthday = new Date(response.data.result.local.birthday)
			$scope.currentUser.local.password = ""
		}, function error(response){
			console.log(JSON.stringify(response.data));
		});
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