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
    ])
    .config(function($routeProvider) {
        $routeProvider
        .when('/home', {
            templateUrl: 'pages/home.html',
            controller: 'HomeCtrl'
        })
        .when('/register', {
            templateUrl: 'pages/register.html'.
            controller: 'RegCtrl'
        })
        .otherwise({
            redirectTo: '/home'
        });
    });