'use strict';

angular.module('myApp.controllers').controller('HomeCtrl',
    function($http, $scope, $location, messagesService, questionsService, userProfileService) {

        $scope.userProfile = userProfileService.getUserProfile();
        $scope.messages = messagesService.getMessages();
        $scope.questions = questionsService.getQuestions();

        $scope.newMessage = {
            "text": "",
            "author": $scope.userProfile,
        };

        $scope.newQuestion = {
            "text": "",
            "author": $scope.userProfile,
        };

        $scope.sendNewMessage = function() {
            $scope.newMessage.timestamp = Date.now();
            messagesService.sendNewMessage(angular.copy($scope.newMessage));
            $scope.newMessage.text = "";
        };

        $scope.sendQuestion = function() {
            $scope.newQuestion.text = $scope.newMessage.text;
            $scope.newQuestion.timestamp = Date.now();
            questionsService.sendNewQuestion(angular.copy($scope.newQuestion));
            $scope.newMessage.text = "";
        };

        $scope.submitAnswer = function(question) {
            var answer = {
                "text": question.tempAnswer,
                "author": $scope.userProfile,
                "timestamp": Date.now(),
                "questionId": question.id || 0
            };

            questionsService.submitAnswer(angular.copy(answer));
        };



        $scope.isCreate = true;
        $scope.opened = false;
        $scope.startTime = new Date().setHours(13, 0);
        $scope.endTime = new Date().setHours(16, 0);
        $scope.td = new Date();
       

        $scope.selectMenu = function(bool) {
            $scope.isCreate = (bool == 'true') ? true : false;
        };

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.checkIfUserExist = function() {
            cookieService.checkIfUserExist(function(data) {
                console.log(data);
                if (!data) {
                    $location.path('/home');
                } else {
                    $scope.loadUserMeetup();
                }
            });
        };

        $scope.createNewEvent = function() {
            // validateForm();

            $scope.geocoder = new google.maps.Geocoder();

            gMapServices.getPlace($scope, function(results, status) {
                $scope.gps = results[0].geometry.location;
                $scope.eventSettings.lat = $scope.gps.k;
                $scope.eventSettings.lon = $scope.gps.B;
                //TEMP USER ID
                // $scope.eventSettings.userId = 2;

                if ($scope.selectedSport.id === 10) {
                    $scope.eventSettings.sport = $scope.customSportName;
                } else {
                    $scope.eventSettings.sport = $scope.selectedSport.name;
                }
                if ($scope.capacity) {
                    $scope.eventSettings.capacity = $scope.capacity;
                }
                if ($scope.price) {
                    $scope.eventSettings.price = $scope.price;
                }
                var myStartTime = new Date($scope.startTime);
                var myEndTime = new Date($scope.endTime);
                $scope.eventSettings.startDate = $scope.date.setHours(myStartTime.getHours(), myEndTime.getMinutes());
                $scope.eventSettings.endDate = $scope.date.setHours(myEndTime.getHours(), myEndTime.getMinutes());

                $http.post('/api/createEvent', $scope.eventSettings).success(function(data, status, headers, config) {
                    console.log("success");

                    $scope.joinRoom(data);

                }).
                error(function(data, status, headers, config) {
                    console.log("failure");
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });

            }, $scope.eventSettings.address);
        };
    }
);