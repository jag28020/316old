var modules = [
	'HomeModule',
	'LoginModule',
	'AccountModule',
	'ProfileModule',
	'ComingSoonModule'
];

var app = angular.module('316Beauty', modules, function($interpolateProvider){
	$interpolateProvider.startSymbol('<%');
	$interpolateProvider.endSymbol('%>');
});

