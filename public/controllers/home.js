myApp.controller("homeController", function($scope) {
  $scope.loadItems = function() {
    $http.get("/api/items").then(function(result) {
      $scope.items = result.data;
    }).catch(function(error) {
      alert(error.data.message);
    });
  }
});