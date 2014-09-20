'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngCookies'])
    .factory('sportsDataService', function() {
        var SportsDataService = function() {

            var sportsList = [{
                "id": 0,
                "name": "Soccer"
            }, {
                "id": 1,
                "name": "Basketball"
            }, {
                "id": 2,
                "name": "Ultimate Frisbee"
            }, {
                "id": 3,
                "name": "Rugby"
            }, {
                "id": 4,
                "name": "American Football"
            }, {
                "id": 5,
                "name": "Volleyball"
            }, {
                "id": 6,
                "name": "Baseball"
            }, {
                "id": 7,
                "name": "Running"
            }, {
                "id": 8,
                "name": "Badminton"
            }, {
                "id": 9,
                "name": "Tennis"
            }, {
                "id": 10,
                "name": "Other..."
            }];

            this.getSportsList = function() {
                return sportsList;
            };

        };

        return new SportsDataService();
    })
    .factory('userProfileService', function($http, $cookieStore, $location, $log) {
        var UserProfileService = function() {
            var userProfile = {
                "questID": "",
                "name": "",
                "password": ""
            }

            this.setUserProfile = function(newUserProfile) {
                userProfile = newUserProfile;
            };

            this.getUserProfile = function() {
                return userProfile;
            };

            this.createUser = function(newUserProfile) {
                this.setUserProfile(newUserProfile);
                $http.post('/api/createUser', userProfile).success(function(data) {
                    $log.debug(data);
                });
            };


            this.userSignIn = function(profileJSON) {
                $http.post('/api/createUser', profileJSON).success(function(data) {
                    $cookieStore.put('userID', data.userId);
                    userId = data.userId;
                    $location.path('/menu');
                });
            };

            this.updateNearest = function(maxNum, callback) {
                $http.post('/api/getUser', {
                    userId: userId
                }).success(function(data) {
                    $http.post('/api/getNearestEvents', {
                        lat: data.lat,
                        lon: data.lon,
                        max: maxNum || 10
                    }).success(function(data) {
                        callback(data);
                    });
                });
            };

            this.loadUserMeetup = function(callback) {
                var userId = $cookieStore.get('userID')
                $http.post('/api/getSubscriptions', {
                    userId: userId,
                }).success(function(data) {
                    callback(data);
                });
            };
        };

        return new UserProfileService();
    })

    .factory('eventService', function() {
        var EventService = function() {
            var currentEvent = {};

            this.setCurrentEvent = function(eventData) {
                currentEvent = eventData;
            };

            this.getCurrentEvent = function() {
                return currentEvent;
            }
        };
        return new EventService();
    })
    .factory('mySocket', function(socketFactory) {
        return socketFactory();
    });