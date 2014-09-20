'use strict';

angular.module('myApp.controllers').controller('SignupCtrl',
    function($http, $scope, $location, userProfileService) {

        $scope.userProfile = {
            "questID": "",
            "name": "",
            "password": ""
        };

        $scope.submitName = function() {
            userProfileService.createUser($scope.userProfile);
        };
    });