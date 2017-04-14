var newPostCtr = angular.module('NewPostModule', ['ngFileUpload']);

newPostCtr.controller('NewPostController', ['$scope', '$http', 'Upload', 'cloudinary', 
	function($scope, $http, $upload, cloudinary){
	
	$scope.currentUser = null;
	$scope.post = {}

	$scope.init = function(){
		console.log('NewPost Controller INIT');
		getCurrentUser();
	}

	$scope.createPost = function(){
		$scope.post.author = $scope.currentUser.id
		$http({
			method:'POST',
			url: '/api/post',
			data: $scope.post
		}).then(function success(response){
			console.log(JSON.stringify(response.data));
			if (response.data.confirmation == 'success'){
				window.location.href = "/feed"
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
          		$scope.post.image = data.public_id
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