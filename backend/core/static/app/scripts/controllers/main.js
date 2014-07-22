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

    $http.get('/api/todos/').success(function (data) {
        $scope.data = data.results;
    }).error(function (response) {
            $log.log(response);
        });

}]);
