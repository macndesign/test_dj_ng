'use strict';

/**
 * @ngdoc function
 * @name staticApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the staticApp
 */
app.controller('MainCtrl', ['$scope', '$http', '$log', '$cookies', function ($scope, $http, $log, $cookies) {
    $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
    
    var get_url = function(url) {
        $http.get(url).success(function (data) {
            // Data properties
            $scope.count = data.count;
            $scope.next = data.next;
            $scope.previous = data.previous;
            // Data
            $scope.data = data.results;
        }).error(function (xhr) {
            $log.log(xhr);
        });
    };
    
    $scope.curr = 1;
    $scope.todos = '/api/todos/';
    get_url($scope.todos);
    
    $scope.pass_button = function(url){
        var last_url = url.split('/').slice(-1).pop();
        var last_page = last_url.split('=').slice(-1).pop();
        $scope.curr = last_page || 1;
        get_url(url);
    };

}]);
