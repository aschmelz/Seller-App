myApp.controller("editController", function($scope, $routeParams, $http) {
  $scope.phoneType = [{
    "selection": 1,
    "name": "Cell"
  }, {
    "selection": 2,
    "name": "Home"
  }, {
    "selection": 3,
    "name": "Work"
  }]

  // Function to update the item
  $scope.updateItem = function() { // function that takes in an id (id from our routes)
    let newItem = { // from the model
      itemName: $scope.itemName,
      sellerName: $scope.name,
      address: $scope.address, // not added
      phone: { number: $scope.phoneNumber, location: $scope.dropdownMenuButton },// not added
      //phone: $scope.phoneNumber,
      email: $scope.email,
      itemDescription: $scope.itemDescription,
      sellerCity: $scope.city,
      price: $scope.price
    }
    
    // "AJAX" call for POST request
    $http.put("/api/items/"+$routeParams.id, newItem).then(function(result) {
      alert("Saved!");
      //$scope.items.push(result.data); // items is things already in mongo
      window.location="#!/displayItems";
      }).catch(function(error) {
        alert(error.data.message);
        })
    };

  // Function to make sure that the price is greater than 0
  $scope.validPrice = function(num) { 
    while (num <= 0) {
      if(num == 0) { 
        alert("Please enter a positive price!");
      } else { 
        num *= -1;
      }
    }
  }
});