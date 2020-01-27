var app = NgModule ('quiz', []);
app.controller('myCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.clickButton = function() {
    $http.get('quizdata.json').success(function(data) {
        $scope.q = data.question;
      });
  }

}]);