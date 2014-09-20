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
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
        .when('/home', {
            templateUrl: 'pages/home',
            controller: 'HomeCtrl'
        })
        .otherwise({
            redirectTo: '/home'
        });

        $locationProvider.html5Mode(true);
    });