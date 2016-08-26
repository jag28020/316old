var modules = [
	'HomeModule',
	'LoginModule',
	'AccountModule'
];

var app = angular.module('316Beauty', modules, function($interpolateProvider){
	$interpolateProvider.startSymbol('<%');
	$interpolateProvider.endSymbol('%>');
});

