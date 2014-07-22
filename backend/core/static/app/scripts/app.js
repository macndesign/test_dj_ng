'use strict';

/**
 * @ngdoc overview
 * @name staticApp
 * @description
 * # staticApp
 *
 * Main module of the application.
 */

var app = angular.module('staticApp', ['ngResource', 'ngRoute', 'ngCookies']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/static/app/views/main.html',
            controller: 'MainCtrl'
        })
        .when('/about', {
            templateUrl: '/static/app/views/about.html',
            controller: 'AboutCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);
