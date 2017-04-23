var modules = [
	'HomeModule',
	'JoinModule',
	'LoginModule',
	'AccountModule',
	'ProfileModule',
	'ComingSoonModule',
	'NewBrandModule',
	'BrandModule',
	'cloudinary',
	'FeedModule',
	'PostModule',
	'NewPostModule',
	'ProductsModule'
];

var app = angular.module('316Beauty', modules, function($interpolateProvider){
	$interpolateProvider.startSymbol('<%');
	$interpolateProvider.endSymbol('%>');
});

app.config(['cloudinaryProvider', function (cloudinaryProvider) {
	cloudinaryProvider
    	.set("cloud_name", "dfkblnvet")
    	.set("upload_preset", "wkxfkjv3");
}]);

