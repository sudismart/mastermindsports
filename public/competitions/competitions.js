'use strict';

angular
	.module('myApp.competitions', ['ui.router'])
	.config(['$stateProvider', function($stateProvider) {
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: '/competitions/competitions.html',
				controller: 'CompetitionCtrl as cCtrl',
				resolve: {
					Competitions: ["$http", function($http){
						return $http.get("http://api.football-data.org/v1/competitions/").then(function(res){
							return res.data;

						});
					}]
				}
			});
	}])
	.controller('CompetitionCtrl', CompetitionCtrl);

CompetitionCtrl.$inject = ["$http", "$rootScope","Competitions"];
function CompetitionCtrl($http, $rootScope,Competitions){
	var vm = this;
	vm.Competitions = Competitions;
}