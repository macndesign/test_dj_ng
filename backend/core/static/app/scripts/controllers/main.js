'use strict';

/**
 * @ngdoc function
 * @name staticApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the staticApp
 */
app.controller('MainCtrl', ['$scope', '$http', '$window', '$cookies', function ($scope, $http, $window, $cookies) {
    $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
    
    var get_url = function(url) {
        $http.get(url).success(function(data) {
            // Data properties
            $scope.count = data.count;

            // 2 is in PAGINATE_BY (settings.py)
            $scope.page = Math.round(parseInt($scope.count)/2);

            $scope.next = data.next;
            $scope.previous = data.previous;

            // Data
            $scope.data = data.results;

        }).error(function (data, status, headers, config) {
            $window.alert(status);
        });
    };

    $scope.curr = 1;
    $scope.todos = '/api/todos/';

    get_url($scope.todos);

    $scope.setPage = function(curr){
        var url = $scope.todos + '?page=' + curr;
        get_url(url);
        $scope.curr = curr;
    };
    
    $scope.pass_button = function(url){
        var query = url.split('/').slice(-1).pop();
        var page = query.split('=').slice(-1).pop();
        $scope.curr = page || 1;
        get_url(url);
    };

}]);
