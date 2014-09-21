'use strict';

angular.module('myApp.controllers').controller('SignupCtrl',
    function($http, $scope, $location, $log, userProfileService) {

        $scope.email = "";

        $scope.userProfile = {
            "questId": "",
            "name": "",
            "password": ""
        };

        $scope.icalFile = {
            "data": ""
        };

        $scope.goToLogin = function() {
            $location.path('/login');
        };

        $scope.register = function() {
            if ($scope.email.slice(-13).toLowerCase() == "@uwaterloo.ca") {
                var rawIcal = window.atob($scope.icalFile.data.slice(13));
                $scope.userProfile.questId = $scope.email.slice(0, -13);
                userProfileService.createUser($scope.userProfile, rawIcal);
            } else {
                $log.debug("Not a valid waterloo email!");
            }
        };
    });