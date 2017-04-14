var postCtr = angular.module('PostModule', []);

postCtr.controller('PostController', ['$scope', '$http', function($scope, $http){
	
	$scope.currentUser = null;
	$scope.post = {}
	$scope.comments = []
	$scope.newComment = {}

	$scope.init = function(){
		console.log('Home Controller INIT');
		var postId = window.location.href
		postId = postId.slice(postId.indexOf("=")+1)
		console.log(JSON.stringify(postId))
		getPost(postId)
		getComments(postId)
		getCurrentUser();
	}

	$scope.addComment = function(){
		$scope.newComment.post = $scope.post.id
		$scope.newComment.authorId = $scope.currentUser.id
		$scope.newComment.authorName = $scope.currentUser.local.name
		$http({
			method:'POST',
			url: '/api/comment',
			data: $scope.newComment
		}).then(function success(response){
			console.log(JSON.stringify(response.data));
			if (response.data.confirmation == 'success'){
				$scope.comments.push(response.data.result)
				$scope.newComment = {}
			}
		}, function error(response){
			console.log(JSON.stringify(response.data));
		});

	}

	function getComments(id){
		$http({
			method:'GET',
			url: '/api/comment?post=' + id
		}).then(function success(response){
			console.log(JSON.stringify(response.data));
			if (response.data.confirmation == 'success'){
				$scope.comments = response.data.result
			}
		}, function error(response){
			console.log(JSON.stringify(response.data));
		});
	}


	function getAuthor(id){
		$http({
			method:'GET',
			url: '/api/profile/' + id
		}).then(function success(response){
			console.log(JSON.stringify(response.data));
			if (response.data.confirmation == 'success'){
				$scope.author = response.data.result
			}
		}, function error(response){
			console.log(JSON.stringify(response.data));
		});
	}

	function getPost(id){
		$http({
			method:'GET',
			url: '/api/post/'+id
		}).then(function success(response){
			console.log(JSON.stringify(response.data));
			if (response.data.confirmation == 'success'){
				$scope.post = response.data.result
				getAuthor($scope.post.author)
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