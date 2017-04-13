var brandCtr = angular.module('BrandModule', ['ngFileUpload']);

brandCtr.controller('BrandController', ['$scope', '$http', 'Upload', 'cloudinary', 
	function($scope, $http, $upload, cloudinary){

	$scope.currentUser = {}
	$scope.products = []
	$scope.newProduct = {}


	$scope.init = function(){
		console.log('Brand Controller INIT');
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
				$scope.currentUser.local.password = ""
				$scope.currentUser.local.birthday = new Date(response.data.results.local.birthday)
				getProducts()
			}
		}, function error(response){
			console.log(JSON.stringify(response.data));
		});
	}

	function getProducts(){
		$http({
			method:'GET',
			url: '/api/product?brandId=' + $scope.currentUser.id
		}).then(function success(response){
			console.log(JSON.stringify(response.data));
			if (response.data.confirmation == 'success'){
				$scope.products = response.data.result
			}
		}, function error(response){
			console.log(JSON.stringify(response.data));
		});
	}

	$scope.addProduct = function(){
		$scope.newProduct.brandId = $scope.currentUser.id
		console.log("Add product " + JSON.stringify($scope.newProduct))
		$http({
			method:'POST',
			url: '/api/product',
			data: $scope.newProduct
		}).then(function success(response){
			console.log(JSON.stringify(response.data));
			$scope.products.push(response.data.result)
			$scope.newProduct = {}
			$scope.newProduct.image = ""
		}, function error(response){
			console.log(JSON.stringify(response.data));
		});
	}

	$scope.editProduct = function(index){
		$http({
			method:'PUT',
			url: '/api/product',
			data: $scope.products[index]
		}).then(function success(response){
			console.log(JSON.stringify(response.data));
		}, function error(response){
			console.log(JSON.stringify(response.data));
		});
	}

	$scope.deleteProduct = function(index){
		$http({
			method:'DELETE',
			url: '/api/product/' + $scope.products[index].id
		}).then(function success(response){
			console.log(JSON.stringify(response.data));
			$scope.products.splice(index, 1)
		}, function error(response){
			console.log(JSON.stringify(response.data));
		});
	}

	$scope.updateProfile = function(){
		console.log(JSON.stringify($scope.currentUser))
		$http({
			method:'PUT',
			url: '/api/profile' + ($scope.currentUser.local.password.length>0 ? "?pass=true" : ""),
			data: $scope.currentUser
		}).then(function success(response){
			console.log(JSON.stringify(response.data));
			$scope.currentUser = response.data.result
			$scope.currentUser.local.birthday = new Date(response.data.result.local.birthday)
		}, function error(response){
			console.log(JSON.stringify(response.data));
		});
	}


	$scope.uploadFiles = function(files, index){
		var d = new Date();
      	$scope.title = "Image (" + d.getDate() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")";
      	$scope.files = files;
      	if (!$scope.files) return;
      	angular.forEach(files, function(file){
        	if (file && !file.$error) {
          	file.upload = $upload.upload({
            	url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
            	data: {
              	upload_preset: cloudinary.config().upload_preset,
              	context: 'photo=' + $scope.title,
              	file: file
            	}
          	}).progress(function (e) {
            	file.progress = Math.round((e.loaded * 100.0) / e.total);
            	file.status = "Uploading... " + file.progress + "%";
            	console.log(file.status)
          	}).success(function (data, status, headers, config) {
          		console.log("data: " + JSON.stringify(data))
          		if (index == 'newProduct')
   					$scope.newProduct.image = data.public_id
   				else
   					$scope.products[index].image = data.public_id
            	data.context = {custom: {photo: $scope.title}};
            	file.result = data;
          	}).error(function (data, status, headers, config) {
            	file.result = data;
          	});
        	}
      	});
    };

    $scope.dragOverClass = function($event) {
    	var items = $event.dataTransfer.items;
      	var hasFile = false;
      	if (items != null) {
        	for (var i = 0 ; i < items.length; i++) {
          		if (items[i].kind == 'file') {
            		hasFile = true;
            		break;
          		}
        	}
      	} else {
        	hasFile = true;
      	}
      	return hasFile ? "dragover" : "dragover-err";
    };
















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