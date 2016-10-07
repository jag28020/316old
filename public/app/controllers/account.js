var accountCtr = angular.module('AccountModule', []);

accountCtr.controller('AccountController', ['$scope', '$http', function($scope, $http){

	var sizeLimit = 10585760; // 10MB in Bytes
	$scope.credentials = {};

	$scope.upload = function(){
		//Configure with our credentials
		AWS.config.update({ 
			accessKeyId: $scope.credentials.access_key, 
			secretAccessKey: $scope.credentials.secret_key 
		});
		//Set the region
	    AWS.config.region = 'us-east-1';
	    //Define the bucket
	    var bucket = new AWS.S3({ 
	    	params: { Bucket: $scope.credentials.bucket } 
	    });
	    //Check for file
	    if($scope.file) {
	        // Check file size
	        var fileSize = Math.round(parseInt($scope.file.size));
	        if (fileSize > sizeLimit) {
	          console.log('File Too Large');
	          return;
	        }

	     	// Unique String To Prevent Overwrites
	        var fileName = uniqueString() + '-' + $scope.file.name;
	        //Set upload params
	        var params = { Key: fileName, ContentType: $scope.file.type, Body: $scope.file, ServerSideEncryption: 'AES256', ACL: 'public-read' };
	        //Use putObject to upload to S3
	        bucket.putObject(params, function(err, data) {
	        	//if error
	        	if(err) {
	            	console.log(err.message);
	            	return;
	          	}
	        	else {
		            // Upload successful
		            console.log('File Uploaded Successfully');
	          	}
	        })
	    }
	    else {
	    	// No File Selected
	        console.log('Please select a file to upload');
	    }
	}

	function uniqueString(){
		var string     = "";
	    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	    for( var i=0; i < 8; i++ ) {
	      string += characters.charAt(Math.floor(Math.random() * characters.length));
	    }
	    return string;
	}
	
	$scope.profile = {email:'', password:''}
	$scope.currentUser = null;
	$scope.showLogin = false;

	$scope.init = function(){
		console.log('Account Controller INIT');
		getCurrentUser();
	}

	$scope.toggleLogin = function(){
		$scope.showLogin = $scope.showLogin ? false : true
	}

	$scope.login = function(){
		console.log('login: ' + JSON.stringify($scope.profile))
		$http({
			method:'POST',
			url: '/account/login',
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
				$scope.currentUser = response.data.results
			}, function error(response){
				console.log(JSON.stringify(response.data));
			});
		}
	}

	$scope.updateProfile = function(){
		console.log(JSON.stringify($scope.profile))
		$http({
			method:'PUT',
			url: '/account/'+$scope.currentUser.id,
			data: $scope.profile
		}).then(function success(response){
			console.log(JSON.stringify(response.data));
			$scope.currentUser = response.data.results
		}, function error(response){
			console.log(JSON.stringify(response.data));
		});
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