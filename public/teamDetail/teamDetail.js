'use strict';

angular
    .module('myApp.teamDetail', ['ui.router'])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('teamDetail', {
                url: '/teams/:teamId/:teamName',
                templateUrl: '/teamDetail/teamDetail.html',
                controller: 'teamDetailCtrl as tdCtrl',
                resolve: {
                    fixture: ["$http","$stateParams", function($http,$stateParams){
                        return $http
                            .get("http://api.football-data.org/v1/teams/"+ $stateParams.teamId +"/fixtures")
                            .then(function(res){
                                console.log(res.data);
                                return res.data;
                            });
                    }],
                    players: ["$http","$stateParams", function($http,$stateParams){
                        return $http
                            .get("http://api.football-data.org/v1/teams/"+ $stateParams.teamId +"/players")
                            .then(function(res){
                                console.log(res.data);
                                return res.data;
                            });
                    }]

                }
            });
    }])
    .controller('teamDetailCtrl', teamDetailCtrl);

teamDetailCtrl.$inject = ["$http", "$rootScope","fixture","players","$stateParams"];
function teamDetailCtrl($http, $rootScope,fixture,players,$stateParams){
    var vm = this;
    vm.fixture = fixture;
    vm.players = players;
    vm.name = $stateParams.teamName;

    vm.filterFinished = function(fixture){
      return (fixture.status != "FINISHED");
    };

    console.log($stateParams.teamName)
        //console.log(vm.league);
}