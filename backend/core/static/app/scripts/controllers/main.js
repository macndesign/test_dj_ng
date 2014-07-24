'use strict';

/**
 * @ngdoc function
 * @name staticApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the staticApp
 */
app.controller('MainCtrl', ['$rootScope', '$scope', '$http', '$log', '$cookies', function ($rootScope, $scope, $http, $log, $cookies) {
    $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
    
    var get_url = function(url) {
        $http.get(url).success(function (data) {
            // Data properties
            $rootScope.count = data.count;
            $rootScope.next = data.next;
            $rootScope.previous = data.previous;
            // Data
            $scope.data = data.results;
        }).error(function (response) {
            $log.log(response);
        });
    };
    
    var todos = '/api/todos/';
    get_url(todos);
    
    $scope.pass_button = function(pass){
        get_url(pass);
    };

}]);
