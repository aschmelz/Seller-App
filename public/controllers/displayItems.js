myApp.controller("displayItemsController", function($scope, $http) {
  // Function to load items to display
  $scope.loadItems = function() {
    $http.get("/api/items").then(function(result) {
      $scope.items = result.data;
      }).catch(function(error) {
        alert(error.data.message);
        });
  }

  // Function to delete items that are displayed
  $scope.deleteItems = function(id) { // function that takes in an id (id from our routes)
    $http.delete(`/api/items/${id}`).then(function(result) {
      for(var i = 0; i < $scope.items.length; i++) {
        if ($scope.items[i]._id == result.data._id) { // _id from mongodb
                // if the item in the list is equal to an item in the result (item in mongo)
          $scope.items.splice(i, 1); // remove the item
        }
      }
    }).catch(function(error) {
      alert(error.data);
    })
  }

  // Function to edit items that are displayed
  $scope.searchItems = function() {
    var filterObj = { 
        $or: [{ // $or as long as search term in itemName OR itemDescription
          itemName: {
            $regex: $scope.searchTerm, $options:'i' }}, { // 'i' ignores case sensitivity
          itemDescription: {
            $regex: $scope.searchTerm, $options: 'i' }} 
        ] 
      }
    $http.get(`/api/items/search?filter=`+JSON.stringify(filterObj)).then(function(result) {
      $scope.items = result.data;
      }).catch(function(error) {
      alert(error.data);
    })
  }
});