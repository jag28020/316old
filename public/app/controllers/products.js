var productCtr = angular.module('ProductsModule', []);

productCtr.controller('ProductsController', ['$scope', '$http', '$window', function($scope, $http, $window){


	$scope.init = function(){
		console.log('Products Controller INIT');
		getCurrentUser();
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

	function getBrands(){
		$http({
			method:'GET',
			url: '/api/profile?local.isFeatured=true&local.isBrand=true'
		}).then(function success(response){
			console.log(JSON.stringify(response.data));
			if (response.data.confirmation == 'success'){
				$scope.brands = response.data.result
			}
		}, function error(response){
			console.log(JSON.stringify(response.data));
		});
	}

	function getProducts(){
		$http({
			method:'GET',
			url: '/api/product?local.isFeatured=true&'
		}).then(function success(response){
			console.log(JSON.stringify(response.data));
			if (response.data.confirmation == 'success'){
				$scope.products = response.data.result
			}
		}, function error(response){
			console.log(JSON.stringify(response.data));
		});
	}

	$scope.clickProduct = function(index){
		$window.open($scope.products[index].link, '_blank')
	}


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