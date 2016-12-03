'use strict';

angular
    .module('myApp.teams', ['ui.router'])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('league', {
                url: '/:leagueId',
                templateUrl: '/teams/teams.html',
                controller: 'leagueCtrl as lCtrl',
                resolve: {
                    league: ["$http","$stateParams", function($http,$stateParams){
                        return $http
                            .get("http://api.football-data.org/v1/competitions/" + $stateParams.leagueId +"/leagueTable")
                            .then(function(res){
                                return res.data;
                            });
                    }]
                }
            });
    }])
    .controller('leagueCtrl', leagueCtrl);

leagueCtrl.$inject = ["$http", "$rootScope","league","$state"];
function leagueCtrl($http, $rootScope,league,$state){
    var vm = this;
    vm.league = league;
    console.log(vm.league);

    vm.groupCheck = function(){
        var arr = Object.keys(vm.league);
        console.log(arr)
        if(arr.indexOf("standings")  >= 0){
            vm.group= true;
        }
        else{
           vm.group = false;
        }

    };
    vm.getId = function(obj){
        return obj._links.team.href.split("/").pop();

    };

    vm.groupCheck();
}