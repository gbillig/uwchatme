'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngCookies'])
    .factory('messagesService', function($rootScope, mySocket) {
        var MessagesService = function() {
            mySocket.forward('message');

            var messages = [{
                "text": "Hello I'm in ECE!!!",
                "author": {
                    "name": "Gleb",
                    "questID": "gabillig"
                }
            }, {
                "text": "Hi",
                "author": {
                    "name": "Acer",
                    "questID": "c327wang"
                }
            },{
                "text": "Sup",
                "author": {
                    "name": "Zack",
                    "questID": "zwaterfield"
                }
            }];

            this.getMessages = function() {
                return messages;
            };

            this.sendNewMessage = function(newMessage) {
                mySocket.emit('message', newMessage);
            };

            $rootScope.$on('socket:message', function(ev, data) {
                messages.push(data);
            });

        };

        return new MessagesService();
    })
    .factory('questionsService', function($rootScope, mySocket) {
        var QuestionsService = function() {
            mySocket.forward('message');

            var questions = [{
                "text": "Why am I still in ECE??!??!",
                "author": {
                    "name": "Gleb",
                    "questID": "gabillig"
                },
                "answers": [{
                    "text": "Quit crying",
                    "author": {
                        "name": "Acer",
                        "questID": "c327wang"
                    },
                }, {
                    "text": "Plz dont go",
                    "author": {
                        "name": "Sam Simpson",
                        "questID": "ssimpsons"
                    }
                }]
            }, {
                "text": "What is Lin Alg?",
                "author": {
                    "name": "Acer",
                    "questID": "c327wang"
                },
                "answers": []
            },{
                "text": "How do I even Assembly?",
                "author": {
                    "name": "Zack",
                    "questID": "zwaterfield"
                },
                "answers": [{
                    "text": "LOL DIDNT TAKE 222",
                    "author": {
                        "name": "Acer",
                        "questID": "c327wang"
                    },
                }]
            }];

            this.getQuestions = function() {
                return questions;
            };

            this.sendNewQuestion = function(newQuestion) {
                questions.push(newQuestion);
                mySocket.emit('question', newQuestion);
            };

            $rootScope.$on('socket:question', function(ev, data) {
                questions.push(data);
            });

        };

        return new QuestionsService();
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
                    $location.path('/home');
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