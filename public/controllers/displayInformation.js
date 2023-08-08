myApp.controller("displayInformationController", function($scope, $routeParams, $http) {
  $scope.loadItem = function() {
    $http.get("/api/items/"+$routeParams.id).then(function(result) {
      $scope.title = result.data.itemName;
      $scope.seller = result.data.sellerName;
      $scope.address = result.data.address;
      $scope.phone = result.data.phone;
      $scope.location = result.data.phone.location;
      $scope.email = result.data.email;
      $scope.description = result.data.itemDescription;
      $scope.city = result.data.sellerCity;
      $scope.price = result.data.price;
      }).catch(function(error) {
        alert(error.data.message);
        });
  }
})