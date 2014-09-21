'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
    'ngRoute',
    'ngAnimate',
    'ngCookies',
    'btford.socket-io',
    'myApp.services',
    'myApp.controllers',
    'myApp.directives',
    'ui.bootstrap'
    ])
    .config(function($routeProvider) {
        $routeProvider
        .when('/home', {
            templateUrl: 'pages/home.html',
            controller: 'HomeCtrl'
        })
        .when('/signup', {
            templateUrl: 'pages/signup.html',
            controller: 'SignupCtrl'
        })
        .when('/login', {
            templateUrl: 'pages/login.html',
            controller: 'LoginCtrl'
        })
        .otherwise({
            redirectTo: '/signup'
        });
    })
    .directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);