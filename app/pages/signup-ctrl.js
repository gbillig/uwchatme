'use strict';

angular.module('myApp.controllers').controller('SignupCtrl',
    function($http, $scope, $location, $log, userProfileService) {

        $scope.email = "";

        $scope.userProfile = {
            "questId": "",
            "name": "",
            "password": ""
        };

        $scope.register = function() {
            if ($scope.email.slice(-13).toLowerCase() == "@uwaterloo.ca") {
                $scope.userProfile.questId = $scope.email.slice(0, -13);
                userProfileService.createUser($scope.userProfile);
            } else {
                $log.debug("Not a valid waterloo email!");
            }
        };
    });