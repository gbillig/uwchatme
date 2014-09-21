'use strict';

angular.module('myApp.controllers').controller('LoginCtrl',
    function($http, $scope, $location, $log, userProfileService) {

        $scope.email = "";

        $scope.userProfile = {
            "questId": "",
            "password": ""
        };

        $scope.login = function() {
            if ($scope.email.slice(-13).toLowerCase() == "@uwaterloo.ca") {
                $scope.userProfile.questId = $scope.email.slice(0, -13);
                userProfileService.login($scope.userProfile);
            } else {
                $log.debug("Not a valid waterloo email!");
            }
        };
    });