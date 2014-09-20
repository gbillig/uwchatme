'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['btford.socket-io'])
    .factory('messagesService', function($rootScope, mySocket) {
        var MessagesService = function() {
            mySocket.forward('message');

            var messages = [{
                "text": "Hello I'm in ECE!!!",
                "author": {
                    "name": "Gleb",
                    "questId": "gabillig"
                }
            }, {
                "text": "Hi",
                "author": {
                    "name": "Acer",
                    "questId": "c327wang"
                }
            },{
                "text": "Sup",
                "author": {
                    "name": "Zack",
                    "questId": "zwaterfield"
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
            mySocket.forward('question');
            mySocket.forward('answer');


            var questions = [{
                "text": "Why am I still in ECE??!??!",
                "author": {
                    "name": "Gleb",
                    "questId": "gabillig"
                },
                "answers": [{
                    "text": "Quit crying",
                    "author": {
                        "name": "Acer",
                        "questId": "c327wang"
                    },
                }, {
                    "text": "Plz dont go",
                    "author": {
                        "name": "Sam Simpson",
                        "questId": "ssimpsons"
                    }
                }]
            }, {
                "text": "What is Lin Alg?",
                "author": {
                    "name": "Acer",
                    "questId": "c327wang"
                },
                "answers": []
            },{
                "text": "How do I even Assembly?",
                "author": {
                    "name": "Zack",
                    "questId": "zwaterfield"
                },
                "answers": [{
                    "text": "LOL DIDNT TAKE 222",
                    "author": {
                        "name": "Acer",
                        "questId": "c327wang"
                    },
                }]
            }];

            this.getQuestions = function() {
                return questions;
            };

            this.sendNewQuestion = function(newQuestion) {
                mySocket.emit('question', newQuestion);
            };

            $rootScope.$on('socket:question', function(ev, data) {
                questions.push(data);
            });

            this.submitAnswer = function(newAnswer) {
                mySocket.emit('answer', newAnswer);
            }

            $rootScope.$on('socket:answer', function(ev, data) {
                angular.forEach(questions, function(question) {
                    if (question.id === data.questionId) {
                        question.answers.push(data);
                    }
                });
            });

        };

        return new QuestionsService();
    })
    .factory('userProfileService', function($http, $cookieStore, $location, $log) {
        var UserProfileService = function() {
            var userProfile = {
                "questId": "",
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
        };

        return new UserProfileService();
    })
    .factory('mySocket', function(socketFactory) {
        return socketFactory();
    });